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

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto";

  const auth = getAuth();
  const user = auth.currentUser;

  async function getProgram() {
    const myCollection = collection(firestoreDB, "activity");
    const querySnapshot = await getDocs(query(myCollection, where("createdBy", "==", user.uid)));
    const myArray = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }; // Add ID to data object
    });
    console.log(myArray);
    return myArray;
  }

export default function ProgramPage() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getProgram();
      setActivity(result);
    }
    fetchData();
  }, []);

  return (
    <div className="pb-32">
    <Navbar activeProp={1}/>
    <div className="max-w-md mx-auto">
      
      <Link href="/opprett-program" className="bg-salmon text-white text-md rounded-md p-2">Lag nytt program</Link>

      <h2 className="pt-5">Mine aktiviteter</h2>
      {activity.map((activity) => {
        return (
          <div
            className="p-3
          "
          >
            <ActivityCard key={activity.id} activity={activity} />
          </div>
        );
      })}

<h2 className="pt-5">Aktiviteter du følger</h2>
    </div>
   </div>
  );
}

