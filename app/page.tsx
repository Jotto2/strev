"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { getAuth, Auth } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext, useAuthContext } from "context/AuthContext";
import { useRouter } from "next/navigation";
import firebase from "firebase/app";
import "firebase/auth";
import { firebase_app, firestoreDB } from "lib/firebase";
import "styles/globals.css";
import Navbar from "components/Navbar";
import PostCard from "./PostCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Post } from "lib/types";
import StreakComponent from "./streak/StreakComponent";
import CreatePostActual from "./opprett-innlegg/page";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto";

// async function getPosts() {
//   const myCollection = collection(firestoreDB, "posts");
//   const querySnapshot = await getDocs(query(myCollection, where("createdByEmail", "!=", "") ));
//   const myArray = querySnapshot.docs.map((doc) => {
//     return { id: doc.id, ...doc.data() }; // Add ID to data object
//   });
//   return myArray;
// }

async function getFollowedUsersPosts(currentUserId) {
  // Get the current user's document from the user-collection
  const userDocRef = doc(firestoreDB, "user-collection", currentUserId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    console.log("User not found");
    return [];
  }

  // Get the 'follows' array from the user document
  const followedUsers = userDocSnapshot.data().follows;

  // Query the 'posts' collection to get posts where the 'likedBy' array contains at least one user from the 'follows' array
  const postsCollection = collection(firestoreDB, "posts");
  const querySnapshot = await getDocs(
    query(
      postsCollection,
      where("likedBy", "array-contains-any", followedUsers)
    )
  );

  // Convert querySnapshot to an array of post objects
  const postsArray: Post[] = querySnapshot.docs.map((doc): Post => {
    return {id: doc.id, activityID: doc.data().activityID, comments:doc.data().comments, createdByEmail: doc.data().createdByEmail, createdByImage: doc.data().createdByImage, createdByName: doc.data().createdByName, createdById: doc.data().createdById, date: doc.data().date, groupID: doc.data().groupID, likedBy: doc.data().likedBy, text: doc.data().text};
  });
  console.log(postsArray);
  return postsArray;
}

async function getFollowedGroupsPosts(currentUserId) {
  // Query the 'groups' collection to get documents where the 'followedBy' array contains the current user's ID
  const groupsCollection = collection(firestoreDB, "groups");
  const groupsQuerySnapshot = await getDocs(
    query(
      groupsCollection,
      where("followedBy", "array-contains", currentUserId)
    )
  );

  // Extract the post IDs from the 'posts' arrays in the fetched documents
  let postIdArray = [];
  groupsQuerySnapshot.docs.forEach((doc) => {
    const groupData = doc.data();
    if (Array.isArray(groupData.posts)) {
      postIdArray.push(...groupData.posts);
    }
  });

  // Remove duplicate post IDs
  let postIds = Array.from(new Set(postIdArray));

  // Fetch the posts from the 'posts' collection using the post IDs
  const postsCollection = collection(firestoreDB, "posts");
  const postsQuerySnapshot = await getDocs(
    query(postsCollection, where("id", "in", [postIds]))
  );

  // Convert querySnapshot to an array of post objects
  const postsArray: Post[] = postsQuerySnapshot.docs.map((doc): Post => {
    return {id: doc.id, activityID: doc.data().activityID, comments:doc.data().comments, createdByEmail: doc.data().createdByEmail, createdByImage: doc.data().createdByImage, createdByName: doc.data().createdByName, createdById: doc.data().createdById, date: doc.data().date, groupID: doc.data().groupID, likedBy: doc.data().likedBy, text: doc.data().text};
  });

  console.log(postsArray);
  return postsArray;
}

async function getFollowedActivitiesPosts(currentUserId) {
  // Query the 'activity' collection to get documents where the 'followedBy' array contains the current user's ID
  const activitiesCollection = collection(firestoreDB, "activity");
  const activitiesQuerySnapshot = await getDocs(
    query(
      activitiesCollection,
      where("followedBy", "array-contains", currentUserId)
    )
  );

  // Extract the activity IDs from the fetched documents
  const followedActivityIds = activitiesQuerySnapshot.docs.map((doc) => doc.id);

  // Fetch the posts from the 'posts' collection containing an 'activityID' from the followed activities
  const postsCollection = collection(firestoreDB, "posts");
  const postsQuerySnapshot = await getDocs(
    query(postsCollection, where("activityID", "in", [followedActivityIds]))
  );

  // Convert querySnapshot to an array of post objects
  const postsArray: Post[] = postsQuerySnapshot.docs.map((doc): Post => {
    return {id: doc.id, activityID: doc.data().activityID, comments:doc.data().comments, createdByEmail: doc.data().createdByEmail, createdByImage: doc.data().createdByImage, createdByName: doc.data().createdByName, createdById: doc.data().createdById, date: doc.data().date, groupID: doc.data().groupID, likedBy: doc.data().likedBy, text: doc.data().text};
  });

  console.log(postsArray);
  return postsArray;
}

async function getCombinedPosts(currentUserId) {
  const followedUsersPosts = await getFollowedUsersPosts(currentUserId);
  const followedGroupsPosts = await getFollowedGroupsPosts(currentUserId);
  const followedActivitiesPosts = await getFollowedActivitiesPosts(
    currentUserId
  );

  const combinedPosts = [
    ...followedUsersPosts,
    ...followedGroupsPosts,
    ...followedActivitiesPosts,
  ];

  // Remove duplicate posts
  const uniquePostsMap = new Map(combinedPosts.map((post) => [post.id, post]));
  const uniquePostsArray = Array.from(uniquePostsMap.values());

  /* Sort the posts by date (newest first)
  uniquePostsArray.sort((a, b) => b.date - a.date);

  console.log(uniquePostsArray);*/
  return uniquePostsArray;
}

export default function HomePage() {
  const { user, loading } = useAuthContext();

  const [posts, setPosts] = useState<Post[]>([]);

  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
    console.log("Handle Toggle!");
  }

  useEffect(() => {
    async function fetchData() {
      const result = await getCombinedPosts(user.uid);
      setPosts(result);
      setAllPosts(result);
      console.log("Resultat fra fetch av posts"+result);
    }
    fetchData();
  }, []); //Infinite loop (TODO ?)

  const [allPosts, setAllPosts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Alle");

  const filterPostsByActivityName = (activityName) => {
    console.log(activityName);
    setSelectedFilter(activityName);
    if (activityName === "Alle") {
      setPosts(allPosts);
    } else {
      const filteredPosts = allPosts.filter(
        (post) => post.activityName === activityName
      );
      setPosts(filteredPosts);
    }
  };

  const buttonStyle = (activityName) =>
    selectedFilter === activityName
      ? { backgroundColor: "salmon", color: "white" }
      : {};

  return (
    <div className="pb-32">
      <div className="w-full mx-auto flex justify-center pt-5">
        <div>
          <StreakComponent />
        </div>
        <button
          type="button"
          className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => filterPostsByActivityName("Alle")}
          style={buttonStyle("Alle")}
        >
          Alle
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => filterPostsByActivityName("Styrke")}
          style={buttonStyle("Styrke")}
        >
          Styrke
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => filterPostsByActivityName("Cardio")}
          style={buttonStyle("Cardio")}
        >
          Cardio
        </button>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={() => filterPostsByActivityName("Bevegelse")}
          style={buttonStyle("Bevegelse")}
        >
          Bevegelse
        </button>
      </div>
      {posts.map((post) => (
        <PostCard props={post}/>
      ))}
      <Navbar activeProp={0} />
      <div className="w-full max-w-md mx-auto fixed bottom-24">
          <div
            className="bg-salmon rounded-full w-max h-max p-4 hover:bg-darksalmon duration-200 cursor-pointer absolute right-4 bottom-4"
            onClick={() => {handleToggle(); //egentlig å sende IDen til gruppa med opprett-innlegg kallet 
            }}
          >
            <img className="w-10" src="/plus-icon.svg" alt="" />
            
          </div>
          <div>
  {toggle && <CreatePostActual id={""} />}
    </div>

        </div>
    </div>
  );
}
