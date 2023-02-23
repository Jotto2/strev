"use client";
import React, { useEffect, useState } from "react";
import getCollection from "firestore/getData";
import { getFirestore } from "firebase/firestore";
import { firebase_app, firestoreDB } from "lib/firebase";
import Link from "next/link";
import ActivityCard from "@/program/ActivityCard";
import Navbar from "components/Navbar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { BiSearch } from "react-icons/bi";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto";

  const auth = getAuth();
  const user = auth.currentUser;

  async function getProgram() {
    const myCollection = collection(firestoreDB, "activity");
    const querySnapshot = await getDocs(query(myCollection, where("createdBy", "!=", user.uid), where("isPublic", "==", true)));
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
        <div className="max-w-md mx-auto">
            <h1 className="pt-5 pb-3 text-xl">Finn andre strevere og <br/>strevegrupper</h1>
            <div className="relative text-darkgrey pb-3">
                <input type="text" placeholder="Søk etter andre strevere eller grupper" className="text-lg font-normal bg-white rounded-md p-3 w-full outline drop-shadow-box pr-10"/>
                <BiSearch className="absolute right-0 top-0 mr-4 mt-3" size={20} />
            </div>
        </div>

    <Navbar activeProp={2}/>
    <div className="max-w-md mx-auto">

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


    </div>
   </div>
  );
}

