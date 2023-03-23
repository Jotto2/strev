
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
import { collection, getDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import { doc } from "firebase/firestore";
import { useAuthContext } from "context/AuthContext";

export type Activity = {
  id: string;
  title: string;
  category: string;
  description: string;
  createdBy: string;
  imageURL: string;
  madeByName: string;
  followedBy: string[];
  isPublic: boolean;
}

type ActivityProps = {
  id,
  title,
  category,
  description,
  createdBy,
  imageURL,
  madeByName,
  followedBy,
  isPublic,
}


export default function ActivityCard( props : Activity ) {
  //Her må bilde også importeres

  const { user } = useAuthContext();
  const [photoURL, setPhotoURL] = useState("");

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      const followerRef = doc(firestoreDB, `activity/${props.id}`);
      const followerSnap = await getDoc(followerRef);

      if (followerSnap.exists()) {
        const followerData = followerSnap.data();

        if (followerData?.followedBy) {
          setIsSubscribed(followerData.followedBy.includes(user.uid));
        }
      }
    };

    checkFollowStatus();
  }, [props.id, user.uid]);

  const updateFollower = async () => {
    const followerRef = doc(firestoreDB, `activity/${props.id}`);
    const followerSnap = await getDoc(followerRef);
    console.log("Updating followers");

    if (followerSnap.exists()) {
      const followerData = followerSnap.data();

      if (followerData?.followedBy) {
        // If followedBy array already exists, check if user ID is present in it
        const index = followerData.followedBy.indexOf(user.uid);

        if (index === -1) {
          // User ID not present in followedBy array, so add it
          await updateDoc(followerRef, {
            followedBy: [...followerData.followedBy, user.uid],
          });
          setIsSubscribed(true);
        } else {
          // User ID present in followedBy array, so remove it
          const updatedFollowedBy = [
            ...followerData.followedBy.slice(0, index),
            ...followerData.followedBy.slice(index + 1),
          ];

          await updateDoc(followerRef, {
            followedBy: updatedFollowedBy,
          });
          setIsSubscribed(false);
        }
      } else {
        // If followedBy array does not exist, create it and add user ID
        await updateDoc(followerRef, {
          followedBy: [user.uid],
        });
        setIsSubscribed(true);
      }
    }
  };

  return (
    <div
      className={
        props.category === "styrke"
          ? "bg-purple rounded-2xl  max-w-md mx-auto"
          : props.category === "cardio"
          ? "bg-darkblue rounded-2xl  max-w-md mx-auto"
          : props.category === "bevegelse"
          ? "bg-blue rounded-2xl  max-w-md mx-auto"
          : "bg-darkgrey rounded-2xl  max-w-md mx-auto"
      }
    >
      {user.uid === props.createdBy && props.isPublic === true ? (
        <div className="grid grid-cols-2 pt-3 pb-2 pl-5 pr-1">
          <h4 className="text-white text-sm">{props.followedBy.length} følgere</h4>
          <div className="flex justify-end pr-2">
            <h3 className="bg-yellow-100 rounded-full px-5 text-sm text-right">
              Delt
            </h3>
          </div>
        </div>
      ) : props.isPublic === false ? (
        <div></div>
      ) : (
        
        <div className="grid grid-cols-2 pt-3 pb-2 pl-5 pr-1">
          <Link href={`/profil/${props.createdBy}`}>
          <h4 className="text-white text-sm">{props.followedBy.length} følgere</h4>
          <div className="flex justify-end">
            <h4 className="text-white text-sm truncate">
              {props.madeByName}
            </h4>
            <div className="h-5 px-2">
              <img className="rounded-full h-5" src={props.imageURL}></img>
            </div>
          </div>
          </Link>
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
              {props.title}
            </h3>
            <p className="text-white text-md">{props.description}</p>
          </div>
        </div>
      </div>

      {/* //TODO Legg til sånn at farge og tekst endrer seg basert på status */}

      {user.uid == props.createdBy ? (
        <div className="grid grid-cols-1 gap-4 p-4">
          <button
            onClick={() => {
              window.location.href = `program/${props.id}`;
            }}
            className="py-2 btn text-sm text-white bg-salmon rounded-full hover:bg-darksalmon focus:bg-blue-700 flex justify-center items-center"
          >
            <div className="flex flex-row justify-center items-center">
              <div>Se hele</div>
              <div className="ml-2">
                <img src="./arrow.svg" className="h-1.5" alt="Arrow Icon" />
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4">
          <button
            className={`btn text-sm text-dark rounded-full ${
              isSubscribed
                ? "bg-white hover:bg-lightgrey"
                : "bg-lightblue hover:bg-hoverblue"
            }`}
            onClick={updateFollower}
          >
            {isSubscribed ? "Følger" : "Følg"}
          </button>
          <button
            onClick={() => {
              window.location.href = `program/${props.id}`;
            }}
            className="py-2 btn text-sm text-white bg-salmon rounded-full hover:bg-darksalmon focus:bg-blue-700 flex justify-center items-center"
          >
            <div className="flex flex-row justify-center items-center">
              <div>Se hele</div>
              <div className="ml-2">
                <img src="./arrow.svg" className="h-1.5" alt="Arrow Icon" />
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}


