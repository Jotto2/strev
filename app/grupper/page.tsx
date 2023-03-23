"use client";

import Navbar from "components/Navbar";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import getCollection from "firestore/getData";
import { getFirestore } from "firebase/firestore";
import { firebase_app, firestoreDB } from "lib/firebase";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import Groupcard from "./GroupCard";

const auth = getAuth();
const user = auth.currentUser;

async function getGruppe() {
  const myCollection = collection(firestoreDB, "groups");
  const querySnapshot = await getDocs(query(myCollection));
  const myArray = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log(myArray);
  return myArray;
}

export default function GruppeSide() {
  const [gruppe, setGruppe] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getGruppe();
      setGruppe(result);
    }
    fetchData();
  }, []);

  return (
    <div className="pb-32 mt-10">
      <Navbar activeProp={3} />
      <div className="max-w-md mx-auto pt-5 px-4 pb-4 bg-background">
        <button
          onClick={() => {
            window.location.href = "/opprett-gruppe";
          }}
          className="bg-salmon hover:bg-darksalmon duration-200 mb-4 text-white text-md text-left rounded-2xl w-full p-1 py-5 inline-flex items-center drop-shadow-box"
        >
          <span className=" pl-5 text-xl">Lag en ny gruppe</span>
          <div className="ml-auto pr-3">
            <img src="./AddButton.png" className="h-8"></img>
          </div>
        </button>

        {gruppe.map((gruppe) => {
          return (
            <Groupcard key={gruppe.id} group={gruppe} />
          );
        })}
      </div>
    </div>
  );
}
