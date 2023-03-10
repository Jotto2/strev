"use client";
import React, { useEffect, useState } from "react";
import getCollection from "firestore/getData";
import { getFirestore } from "firebase/firestore";
import { firebase_app, firestoreDB } from "lib/firebase";
import Link from "next/link";
import ActivityCard from "./ActivityCard";
import Navbar from "components/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "context/AuthContext";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto";



async function getProgram(user) {
  const myCollection = collection(firestoreDB, "activity");
  const querySnapshot = await getDocs(
    query(myCollection, where("createdBy", "==", user.uid))
  );
  const myArray = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log(myArray);
  return myArray;
}

async function getFollowedActivities(user) {
  const myCollection = collection(firestoreDB, "activity");
  //TODO her må det legges til en where som sjekker om brukeren er følger av aktiviteten
  const querySnapshot = await getDocs(
    query(myCollection, where("followedBy", "array-contains", user.uid))
  );
  const myArray = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log(myArray);
  return myArray;
}

export default function ProgramPage() {
  const [activity, setActivity] = useState([]);
  const [followedActivity, setFollowedActivity] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      const result = await getProgram(user);
      setActivity(result);
      const followedResult = await getFollowedActivities(user);
      setFollowedActivity(followedResult);
    }
    fetchData();
  }, []);

  return (
    <div className="pb-32">
      <Navbar activeProp={1} />
      <div className="">
      <div className="max-w-md mx-auto pt-5">
      <button
              onClick={() => { window.location.href="/opprett-program" }}
              className="bg-salmon mb-4 text-white text-md text-left rounded-2xl w-full p-1 py-5 inline-flex items-center"
            >
              <span className=" pl-5 text-xl">Lag nytt treningsprogram</span>
              <div className="ml-auto pr-3">
                <img src="./AddButton.png" className="h-8"></img>
              </div>
            </button>
            </div>
            </div>
      <div className="max-w-md mx-auto">
        <h2 className="pt-5">Mine aktiviteter</h2>
        {activity.map((activity, index) => {
          return (
            <div
              className="p-3"
              key={index}
            >
              <ActivityCard props={activity} />
            </div>
          );
        })}

        <h2 className="pt-5">Aktiviteter du følger</h2>
    
        {followedActivity.map((activity) => {
          return (
            <div
              className="p-3
          "
            >
              <ActivityCard key={activity.id} props={activity} />
            </div>
          );
        })}
      </div>
      {/* //TODO her må det legges til en liste med aktiviteter brukeren følger */}
    </div>
  );
}
