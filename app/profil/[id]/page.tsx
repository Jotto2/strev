
"use client";
import ActivityCard from "@/program/ActivityCard";
import Navbar from "components/Navbar";
import { useAuthContext } from "context/AuthContext";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayContains,
} from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface User {
  name: string;
  photoURL: string;
  displayName: string;
  email: string;
  isInGroup: string[];
  posts: string[];
  activity: string[];
  following: string[];
  followedBy: string[];
}

async function getUser(id) {
  // Get a reference to the document using the document ID
  const docRef = doc(firestoreDB, "users", id);

  // Get the document
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Document exists
    const data = docSnap.data();
    return data;
    // console.log(data);
  } else {
    // Document does not exist
    console.log("No such document!");
  }
}


async function getActivitiesByUser(userId) {
  // Query the 'activity' collection to get documents where the 'createdBy' property matches the inputted userId
  const activitiesCollection = collection(firestoreDB, "activity");
  const activitiesQuerySnapshot = await getDocs(
    query(activitiesCollection, where("createdBy", "==", userId))
  );

  // Convert querySnapshot to an array of activity objects
  const activitiesArray = activitiesQuerySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  console.log(activitiesArray);
  return activitiesArray;
}

export default function ProfilePage({ params }: any) {

  const router = useRouter();
  //get a user id from the url and retrieve the firestore document with that id
  const [userProfile, setUser] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useAuthContext();
  const [activityList, setActivityList] = useState([]);


  useEffect(() => {
    async function getUserProfile() {
      const user = await getActivitiesByUser(params.id);
      setActivityList(user);
    }
    getUserProfile();
  }, []);

  async function followHandler() {
    setIsSubscribed(!isSubscribed);

    //Get the current users profile
    const followerRefUser = doc(firestoreDB, `users/${user.uid}`);
    const followerSnapUser = await getDoc(followerRefUser);

    //Get the profile of the users page
    const followerRef = doc(firestoreDB, `users/${params.id}`);
    const followerSnap = await getDoc(followerRef);

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
          await updateDoc(followerRefUser, {
            follows: [...followerData.follows, params.id],
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
          const updatedFollowedBy2 = [
            ...followerData.followedBy.slice(0, index),
            ...followerData.followedBy.slice(index + 1),
          ];

          await updateDoc(followerRefUser, {
            follows: updatedFollowedBy2,
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
  }

  async function getActivities() {

    

    // console.log("activityList", activityList);
    // const activityArray = [];
    // for (let i = 0; i < activityList.length; i++) {
    //   const activityRef = doc(firestoreDB, `activities/${activityList[i]}`);
    //   const activitySnap = await getDoc(activityRef);

    //   if (activitySnap.exists()) {
    //     const activityData = activitySnap.data();
    //     activityArray.push(activityData);
    //   }
    // }
    // console.log("activityArray", activityArray);
  }
  const [activity, setActivity] = useState([]);

  return (
    <div>
      <div className="pb-32 bg-background h-screen pt-32 px-5 max-w-md mx-auto">
      <button
          className="flex p-1 my-5 "
          type="button"
          onClick={() => router.back()}
        >
          <div className="h-30">
            <img src="/backArrow.svg" alt="" />
          </div>
          <p className="text-md pl-2 font-nunito">Gå tilbake</p>
        </button>
      
        <div className="rounded-2xl bg-white max-w-md mx-auto p-6 drop-shadow-box">
          
          <div>
            <img
              className="w-40 h-40 mx-auto relative rounded-full -mt-20"
              src={user.photoURL}
              height={160}
              width={160}
              alt={""}
              loading="lazy"
            />
            <div className="mb-5 mt-8">
              <span className="text-xl text-lightgrey  block">Navn</span>
              <span className="text-xl text-darkgrey">
                {user.displayName}
              </span>{" "}
              {/* TODO logikk */}
            </div>
            <div className="mb-5">
              <span className="text-xl text-lightgrey  block">Epost</span>
              <span className="text-xl text-darkgrey  max-w-xs">
                {user.email}
              </span>{" "}
              {/* TODO logikk */}
            </div>
            <div className="flex justify-center"></div>
          </div>
          <div className="">
            <button
              className={`btn text-md text-dark rounded-md w-full py-3 ${
                isSubscribed
                  ? "bg-lightgrey hover:bg-darkgrey"
                  : "bg-salmon hover:bg-darksalmon"
              }`}
              onClick={followHandler}
            >
              {isSubscribed ? "Følger" : "Følg"}
            </button>
          </div>
        </div>
        <h2 className="pt-5">Aktiviteter laget av {user.name}</h2>

        {// if activityList is not empty, map through it and display the activities}
        activityList.length > 0 ? (
          activityList.map((activity) => {
            return (
              <ActivityCard key={activity.id} props={activity} />
            );
          })
        ) : (
          <p className="text-center pt-4">Ingen aktiviteter å vise for denne brukeren</p>
        )
          }
        
      </div>

      <Navbar activeProp={4} />
    </div>
  );
}

