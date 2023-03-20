"use client";
import React, { useEffect, useRef, useState } from "react";
import getCollection from "firestore/getData";
import { getDoc, getFirestore } from "firebase/firestore";
import { firebase_app, firestoreDB } from "lib/firebase";
import Link from "next/link";
import Navbar from "components/Navbar";
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "context/AuthContext";
import ProgressionCard from "./ProgressionCard";


async function getProgressionIds(user) {
  const progressionsCollection = collection(firestoreDB, "progressions");
  const querySnapshot = await getDocs(
    query(progressionsCollection, where("createdBy", "==", user.uid))
  )
  const myArray : string[] = [];

  querySnapshot.forEach((doc) => {
    myArray.push( doc.id );
  });

  return myArray;
}

export default function ProgressionPage() {
  const { user } = useAuthContext();

  const [progressionIds, setProgressionIds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data");
      const result = await getProgressionIds(user);
      setProgressionIds(result);
    }
    fetchData();
  }, []);

  return (
    <div className="pb-32">
      <div className="max-w-md mx-auto pt-5 px-4 pb-4 mt-10 bg-background">
        <button
          onClick={() => {
            window.location.href = "/opprett-progresjon";
          }}
          className="bg-salmon hover:bg-darksalmon duration-200 mb-4 text-white text-md text-left rounded-2xl w-full p-1 py-5 inline-flex items-center drop-shadow-box"
        >
          <span className=" pl-5 text-xl">Ny øvelse</span>
          <div className="ml-auto pr-3">
            <img src="./AddButton.png" className="h-8"></img>
          </div>
        </button>

        {
          progressionIds.length === 0 ? (
            <div className="text-center text-darkgrey font-lato text-lg mt-5">
              Du har ingen øvelser du kan måle progresjonen på enda. Trykk på knappen over for å opprette en ny.
            </div>
          ) : null
        }

        {
          progressionIds?.map((id, index) => {
            return (
              <ProgressionCard key={index} id={id} />
            )
          })
        }

      </div>
      <Navbar activeProp={4} />
    </div>
  );
}
