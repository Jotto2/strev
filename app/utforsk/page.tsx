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
import { useAuthContext } from "context/AuthContext";
import { Activity } from "lib/types";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto";

export default function ProgramPage() {
  const {user, loading} = useAuthContext();

  console.log(user)

  const [activity, setActivity] = useState<Activity[]>([]);

  async function getProgram() {
    const myCollection = collection(firestoreDB, "activity");
    const querySnapshot = await getDocs(
      query(myCollection, where("createdBy", "==", user.uid))
    );
    const myArray: Activity[] = querySnapshot.docs.map((doc): Activity => {
      console.log("Dette er doc: "+doc)
      return {id: doc.id, title: doc.data().title, category: doc.data().category, description: doc.data().description, createdBy: doc.data().createdBy, imageURL: doc.data().imageURL, madeByName: doc.data().madeByName, followedBy: doc.data().followedBy, isPublic: doc.data().isPublic}
    });
    console.log(myArray);
    return myArray;
  }

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


    </div>
   </div>
  );
}

