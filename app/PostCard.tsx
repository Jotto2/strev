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
import { getAuth } from "firebase/auth";
import ActivityCard from "./program/ActivityCard";
import { TbHeartFilled, TbHeart } from "react-icons/tb";
import { FaRegComment, FaComment } from "react-icons/fa";
import { IoPaperPlaneOutline, IoPaperPlane } from "react-icons/io5";

export default function PostCard({ post }: any) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [photoURL, setPhotoURL] = useState(post.createdByImage);
  const [displayName, setDisplayName] = useState(post.createdByName);
  const [email, setEmail] = useState(post.createdByEmail);
  const [text, setText] = useState(post.text);
  const [activity, setActivity] = useState({});
  const [liked, setLiked] = useState(post.likedBy.includes(user.uid));
  const [likedBy, setLikedBy] = useState(post.likedBy);
  const [amountOfLikes, setAmountOfLikes] = useState(post.likedBy.length);
  const [comments, setComments] = useState(post.comments);

  const commentInput = useRef(null);
  const docRef = doc(firestoreDB, "posts", post.id);

  async function getProgram(id: string) {
    const activityRef = doc(firestoreDB, "activity", id);
    const activityDoc = await getDoc(activityRef);
    return activityDoc.data();
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getProgram("OWOhnIIpGO3wAsiIdSXQ");
      setActivity(result);
    }
    fetchData();

    console.log(activity);
  }, []);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setAmountOfLikes(newLiked ? amountOfLikes + 1 : amountOfLikes - 1);

    await updateDoc(docRef, {
      likedBy: newLiked
        ? [...likedBy, user.uid]
        : likedBy.filter((id) => id !== user.uid),
    });
  };


  const handleComment = async () => {
    event.preventDefault();
    commentInput.current.value == "" ? null : (
      await updateDoc(docRef, {
        comments: [...comments,
          {
            commentedByName: user.displayName,
            commentedByImage: user.photoURL,
            text: commentInput.current.value,
          }
        ]
      })
    )
    commentInput.current.value = "";
  };

  return (
    <div className="bg-white rounded-xl p-4 max-w-md mx-auto drop-shadow-box">
      <div className="flex gap-5 items-center mb-5">
        <img className="rounded-full h-16" src={photoURL} alt="" />
        <div>
          <div className="font-bold font-nunito text-xl">{displayName}</div>
          <div className="font-nunito text-darkgrey">{email}</div>
        </div>
      </div>
      <div className="mb-5 font-lato">{text}</div>

      <div className="mb-5">
        {/*
          <ActivityCard key="" activity={activity} />
          */}
      </div>

      <div className="flex items-center gap-7 font-nunito font-semibold border-b-[1.5px] pb-5 mb-5">
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
          {comments.length} kommentarer
        </div>
      </div>
      <div className="border-b-[1.5px] mb-5">
        {comments.map((comment: any, index) => (
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
      <form
        className="flex items-center justify-between gap-5"
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
