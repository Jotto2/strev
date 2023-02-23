"use client";
import Link from "next/link";
import next from "next";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import "firebase/firestore";
import firebase from "firebase/app";
import getCollection from "firestore/getData";
import { collection, updateDoc } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import { doc } from "firebase/firestore";

export default function ActivityCard({ activity }: any) {
  const {
    id,
    title,
    category,
    followers,
    description,
    createdBy,
    imageURL,
    madeByName,
    followedBy,
    isPublic,
  } = activity;
  //Her må bilde også importeres

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = createdBy;
  const [photoURL, setPhotoURL] = useState("");

  const [isSubscribed, setIsSubscribed] = useState(false);

  const updateFollower = async () => {
    const follower = doc(firestoreDB, `activity/${activity.id}`);
    await updateDoc(follower, {
      //Her må det legges til en oppdatert array
      followedBy: ["test"],
    });
  };

  return (
    <div
      className={
        category === "styrke"
          ? "bg-purple rounded-2xl  max-w-md mx-auto"
          : category === "cardio"
          ? "bg-darkblue rounded-2xl  max-w-md mx-auto"
          : category === "bevegelse"
          ? "bg-blue rounded-2xl  max-w-md mx-auto"
          : "bg-darkgrey rounded-2xl  max-w-md mx-auto"
      }
    >
      {user.uid === activity.createdBy && isPublic === true ? (
        <div className="grid grid-cols-2 pt-3 pb-2 pl-5 pr-1">
          <h4 className="text-white text-sm">{followedBy.length} followers</h4>
          <div className="flex justify-end pr-2">
            <h3 className="bg-yellow-100 rounded-full px-5 text-sm text-right">
              Delt
            </h3>
          </div>
        </div>
      ) : isPublic === false ? (
        <div></div>
      ) : (
        <div className="grid grid-cols-2 pt-3 pb-2 pl-5 pr-1">
          <h4 className="text-white text-sm">{followedBy.length} followers</h4>
          <div className="flex justify-end">
            <h4 className="text-white text-sm truncate">
              {activity.madeByName}
            </h4>
            <div className="h-5 px-2">
              <img className="rounded-full h-5" src={activity.imageURL}></img>
            </div>
          </div>
        </div>
      )}

      <div className="">
        {/* <img className="" src="./placeholder.png"></img> */}
      </div>
      <div className="grid grid-cols-3 gap-4 pt-5 m-3">
        <div className="flex flex-col justify-center items-center">
          <img className="max-h-20" src="./Lifting-Icon.png"></img>
        </div>
        <div className="col-span-2 flex items-center">
          <div>
            <h3 className="text-white text-xl -mt-2 truncate">
              {activity.title}
            </h3>
            <p className="text-white text-md">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* //TODO Legg til sånn at farge og tekst endrer seg basert på status */}
        <button
          className="btn text-sm text-dark bg-white rounded-full"
          onClick={updateFollower}
        >
          {isSubscribed ? "Følger" : "Følg"}
        </button>

        <button
          onClick={() => {
            window.location.href = `program/${activity.id}`;
          }}
          className="py-2 btn text-sm text-dark bg-lightblue border border-lightblue rounded-full hover:bg-blue-700 focus:bg-blue-700 flex justify-center items-center"
        >
          <div className="flex flex-row justify-center items-center">
            <div>Se hele</div>
            <div className="ml-2">
              <img src="./arrow.png" className="h-1.5" alt="Arrow Icon" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
