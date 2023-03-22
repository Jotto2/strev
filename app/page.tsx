
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
  const postsArray = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
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
  let postIds = [];
  groupsQuerySnapshot.docs.forEach((doc) => {
    const groupData = doc.data();
    if (Array.isArray(groupData.posts)) {
      postIds.push(...groupData.posts);
    }
  });

  // Remove duplicate post IDs
  postIds = Array.from(new Set(postIds));

  // Fetch the posts from the 'posts' collection using the post IDs
  const postsCollection = collection(firestoreDB, "posts");
  const postsQuerySnapshot = await getDocs(
    query(postsCollection, where("id", "in", postIds))
  );

  // Convert querySnapshot to an array of post objects
  const postsArray = postsQuerySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  console.log(postsArray);
  return postsArray;
}

async function getFollowedActivitiesPosts(currentUserId) {
  // Query the 'activity' collection to get documents where the 'followedBy' array contains the current user's ID
  const activitiesCollection = collection(firestoreDB, "activity");
  const activitiesQuerySnapshot = await getDocs(
    query(activitiesCollection, where("followedBy", "array-contains", currentUserId))
  );

  // Extract the activity IDs from the fetched documents
  const followedActivityIds = activitiesQuerySnapshot.docs.map((doc) => doc.id);

  // Fetch the posts from the 'posts' collection containing an 'activityID' from the followed activities
  const postsCollection = collection(firestoreDB, "posts");
  const postsQuerySnapshot = await getDocs(
    query(postsCollection, where("activityID", "in", followedActivityIds))
  );

  // Convert querySnapshot to an array of post objects
  const postsArray = postsQuerySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  console.log(postsArray);
  return postsArray;
}

async function getCombinedPosts(currentUserId) {
  const followedUsersPosts = await getFollowedUsersPosts(currentUserId);
  const followedGroupsPosts = await getFollowedGroupsPosts(currentUserId);
  const followedActivitiesPosts = await getFollowedActivitiesPosts(currentUserId);

  const combinedPosts = [...followedUsersPosts, ...followedGroupsPosts, ...followedActivitiesPosts];

  // Remove duplicate posts
  const uniquePostsMap = new Map(combinedPosts.map((post) => [post.id, post]));
  const uniquePostsArray = Array.from(uniquePostsMap.values());

  // Sort the posts by date (newest first)
  uniquePostsArray.sort((a, b) => b.date - a.date);

  console.log(uniquePostsArray);
  return uniquePostsArray;
}

export default function HomePage() {
  const { user, loading } = useAuthContext();

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await getCombinedPosts(user.uid);
      setPosts(result);
      console.log(result);
    }
    fetchData();
  });

  return (
    <div className="pb-32">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          description={post.description}
          date={post.date}
          createdBy={post.createdBy}
          createdByEmail={post.createdByEmail}
          createdByPhotoURL={post.createdByPhotoURL}
          likedBy={post.likedBy}
          activityID={post.activityID}
          activityName={post.activityName}
          activityPhotoURL={post.activityPhotoURL}
          groupID={post.groupID}
          groupName={post.groupName}
          groupPhotoURL={post.groupPhotoURL}
        />
      ))}
      <Navbar activeProp={0} />
    </div>
  );
}
