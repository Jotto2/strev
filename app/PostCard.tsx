"use client";

import React, { useEffect, useRef, useState } from "react";
import { firestoreDB } from "lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ActivityCard from "./program/ActivityCard";
import { TbHeartFilled, TbHeart } from "react-icons/tb";
import { FaRegComment, FaComment } from "react-icons/fa";
import { IoPaperPlaneOutline, IoPaperPlane } from "react-icons/io5";
import { useAuthContext } from "context/AuthContext";
import { Activity, Post } from "lib/types";

async function getProgram(id: string) {
  console.log("getProgram kjøres");

  const activityRef = doc(firestoreDB, "activity", id);
  const activityDoc = await getDoc(activityRef);

  console.log(activityDoc.data())
  return activityDoc.data();
}
type PostCardProps = {
  props: Post;
}

export default function PostCard({props} : PostCardProps) {
  const { user } = useAuthContext();

  getProgram(props.activityID);

  const [post, setPost] = useState<Post>();
  const [activity, setActivity] = useState<Activity>(); //TODO add when needed

  
  const [liked, setLiked] = useState(props.likedBy.includes(user.uid));  
  const [likedBy, setLikedBy] = useState(props.likedBy);                 
  const [amountOfLikes, setAmountOfLikes] = useState(props.likedBy.length);
  const [comments, setComments] = useState(props.comments);
  

  const commentInput = useRef(null);
  const docRef = doc(firestoreDB, "posts", props.activityID);

  const handleLike = async () => {
    const newLiked = (post.likedBy.includes(user.uid));
    if(newLiked) {
      const index = post.likedBy.findIndex((id) => id === user.uid);
      const tempArr = post.likedBy
      tempArr.slice(0, index);


    const updatedLikedBy = [...post.likedBy, ...post.likedBy.slice(index + 1)];
    
    await updateDoc(docRef, { likedBy: updatedLikedBy });


    } else {
      //TODO Like
    } //Fetch lengde av array
    

    await updateDoc(docRef, {
      likedBy: newLiked
        ? [...likedBy, user.uid]
        : likedBy.filter((id) => id !== user.uid),
    });
  };

  const handleComment = async () => {
    event.preventDefault();

    if (commentInput.current.value == "") { //! MÅ OGSÅ SJEKKE OM BARE INNEHOLDER WHITESPACE
      return;
    }

  let oldArr = comments;
  oldArr.push({commentedByName: user.displayName,
        commentedByImage: user.photoURL,
        text: commentInput.current.value });
  setComments(oldArr);

    commentInput.current.value == ""
      ? null
      : await updateDoc(docRef, {
          comments: [
            ...comments,
            {
              commentedByName: user.displayName,
              commentedByImage: user.photoURL,
              text: commentInput.current.value,
            },
          ],
        });
    commentInput.current.value = "";
  };

  return (
    <div className="bg-white rounded-xl p-4 max-w-md mx-auto drop-shadow-box mt-20">
      <div className="flex gap-5 items-center mb-5">
        <img className="rounded-full h-16" src={props.createdByImage} alt="" />
        <div>
          <div className="font-bold font-nunito text-xl">{props.createdByName}</div>
          <div className="font-nunito text-darkgrey">{props.createdByEmail}</div>
        </div>
      </div>
      <div className="mb-5 font-lato">{props.text}</div>

      <div className="mb-5">
        {
          /*
          <ActivityCard activity={activity} />
        */}
      </div>

      <div className="flex items-center gap-7 font-nunito font-semibold border-b-[1.5px] pb-5">
        <div
          className="group cursor-pointer flex items-center gap-1"
          onClick={() => handleLike()}
        >
          <div className="text-heartred">
            {liked ? (
              <TbHeartFilled className="block" size="30" />
            ) : (
              <div>
                <TbHeart
                  className="block group-hover:hidden duration-200"
                  size="30"
                />
                <TbHeartFilled
                  className="hidden group-hover:block duration-200"
                  size="30"
                />
              </div>
            )}
          </div>
          {amountOfLikes} liker
        </div>
        <div
          className="group flex items-center gap-1 cursor-pointer"
          onClick={() => commentInput.current.focus()}
        >
          <div className="text-commentblue">
            <FaRegComment className="block group-hover:hidden " size="25" />
            <FaComment className="hidden group-hover:block " size="25" />
          </div>
          {comments.length}{" "}
          {props.comments.length == 1 ? <div>kommentar</div> : <div>kommentarer</div>}
        </div>
      </div>
      {comments.length < 1 ? null : (
        <div className="border-b-[1.5px] pt-5 overflow-auto max-h-56">
          {props.comments.map((comment: any, index) => (
            <div key={index} className="flex items-center gap-5 mb-5">
              <img
                className="rounded-full h-10"
                src={comment.commentedByImage}
                alt=""
              />
              <div>
                <div className="font-semibold">{comment.commentedByName}</div>
                <div>{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <form
        className="flex items-center justify-between gap-5 mt-5"
        onSubmit={handleComment}
      >
        <img className="rounded-full h-12" src={user.photoURL} alt="" />
        <input
          className="bg-background rounded-full p-3 font-lato font-normal w-full outline-commentblue  border-[1px] border-darkgrey enabled:outline-4"
          ref={commentInput}
          type="text"
          placeholder="Skriv en kommentar..."
        />
        <button
          className="group hover:bg-commentblue hover:text-white cursor-pointer duration-200 border-commentblue border-[1.5px] rounded-full p-2 pb-1 pl-1 text-commentblue"
          type="submit"
        >
          <IoPaperPlaneOutline className="block group-hover:hidden" size="25" />
          <IoPaperPlane className="hidden group-hover:block" size="25" />
        </button>
      </form>
    </div>
  );
}
