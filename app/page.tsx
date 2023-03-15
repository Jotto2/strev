"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import { getAuth, Auth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/navigation";
import firebase from "firebase/app";
import "firebase/auth";
import { firebase_app, firestoreDB } from "lib/firebase";
import "styles/globals.css";
import Navbar from "components/Navbar";
import PostCard from "./PostCard";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { Post } from "lib/types";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto";

async function getPosts() {
  const myCollection = collection(firestoreDB, "posts");
  const querySnapshot = await getDocs(query(myCollection, where("createdByEmail", "!=", "") ));
  const myArray: Post[] = querySnapshot.docs.map((doc) => {
    return {activityID: doc.data().activityID, comments: doc.data().comments, createdByEmail:doc.data().createdByEmail, createdByImage: doc.data().createdByImage, createdByName: doc.data().createdByName, date: doc.data().date, groupID: doc.data().groupID, likedBy: doc.data().likedBy, text:doc.data().text};
  });
  return myArray;
}

export default function HomePage() {

  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchData() {
    const result: Post[] = await getPosts();
    setPosts(result);
  }
  
  useEffect(() => {  
    fetchData();
  }, []);

  return (
    <div className="pb-32">
      {
      <div className="grid place-items-center pt-80">
        <h1 className="text-3xl">Velkommen til Strev</h1>
        <p>På denne siden vil du snart få opp innlegg fra de du følger</p>
      </div>
       }
      {
        posts.map((post, index) => (
          <PostCard key={index} props={post} />
        ))
      }

      <Navbar activeProp={0} />
    </div>
  );
}
