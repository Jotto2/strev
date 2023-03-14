"use client";
import React, { useEffect, useState } from "react";
import Navbar from "components/Navbar";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebase_app, firestoreDB } from "lib/firebase";
import { useRouter } from "next/navigation";
import Post from "@/Post";
import Link from "next/link";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { FiUser } from "react-icons/fi";
import { IoInformationCircleSharp } from "react-icons/io5";

export async function getGroup(id: string) {
  const activityRef = doc(firestoreDB, "groups", id);
  const activityDoc = await getDoc(activityRef);
  return activityDoc.data() as Group;
}

interface Group {
  title: string;
  description: string;
  followedBy: string[];
  id: string;
}

export default function Group({ params }: any) {
  const [group, setGroup] = useState<Group>({
    title: "",
    description: "",
    followedBy: [],
    id: "",
  });

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  //Henter alle postene i en gruppe
  async function getPosts() {
    const myCollection = collection(firestoreDB, "posts");
    const querySnapshot = await getDocs(
      query(myCollection, where("partOf", "array-contains", params.id))
    );
    const myArray = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log(myArray);
    return myArray;
  }

  //Ordner følging
  useEffect(() => {
    async function fetchActivity() {
      const data = await getGroup(params.id);
      setGroup(data);
      const posts = await getPosts();
      setPosts(posts);
    }
    fetchActivity();
    const checkFollowStatus = async () => {
      const followerRef = doc(firestoreDB, `groups/${params.id}`);
      const followerSnap = await getDoc(followerRef);

      if (followerSnap.exists()) {
        const followerData = followerSnap.data();

        if (followerData?.followedBy) {
          setIsSubscribed(followerData.followedBy.includes(user.uid));
        }
      }
    };
    checkFollowStatus();
  }, [params.id, user.uid]);

  // Oppdaterer følge-knappen basert på om du følger eller ikke
  const updateFollower = async () => {
    const followerRef = doc(firestoreDB, `groups/${params.id}`);
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

  console.log(group.id)

  return (
    <div>
      <Navbar activeProp={3} />
      <div className="max-w-md mx-auto">
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

        <div className="rounded-t-xl w-full h-40 bg-[url('/inspect-placeholder.jpg')] bg-center bg-cover">
          test
        </div>
        {/* Her er all data til headeren*/}
        <div className="bg-white p-5 rounded-b-xl">
          <div className="text-xl font-nunito font-bold">{group.title}</div>
          <div className="font-lato">{group.description}</div>

          <div
            className="flex cursor-pointer w-max items-center py-3 gap-1 group duration-200"
            onClick={() => {
              window.location.href = `${params.id}/medlemmer`;
            }}
          >
            <FiUser className="text-lightgrey group-hover:text-darkgrey duration-200" size={20} />
            <div className="text-lightgrey group-hover:text-darkgrey duration-200">
              {group.followedBy.length}
              {group.followedBy.length === 1 ? " medlem" : " medlemmer"}
            </div>
            <IoInformationCircleSharp className="text-salmon group-hover:text-darksalmon duration-200" size={20} />
          </div>

          <button
            className={`btn text-sm text-dark rounded-full py-2 w-40 font-lato duration-200 ${
              isSubscribed
                ? "bg-background hover:bg-lightgrey"
                : "bg-lightblue hover:bg-hoverblue"
            }`}
            onClick={updateFollower}
          >
            {isSubscribed ? "Følger" : "Følg"}
          </button>
        </div>

        {/*
          group.followedBy.map((member, index) => (
            <Link key={member} href={`/profil/${member}`}>
              <p>{member}</p>
            </Link>
          ))
        */}

        {/* Her er alle postene i gruppen. De er hentet som poster*/}
        {posts.map((post) => {
          return (
            <div key={post.id} className="p-3">
              <Post post={post} />
            </div>
          );
        })}
      </div>
      {
        // POSTS
        <div>
          posts
        </div>
      }
    </div>
  );
}
