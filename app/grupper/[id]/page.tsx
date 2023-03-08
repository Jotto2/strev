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

async function getGroup(id: string) {
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

  //Oppdaterer "følge"knappen basert på om du følger eller ikke
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

  return (
    <div>
      {/* Her er det bare en knapp for å gå tilbake, og en navbar som er lik på alle sider */}
      <button
        className="flex p-1 pt-8"
        type="button"
        onClick={() => router.back()}
      >
        <div className="h-30">
          <img src="/backArrow.svg" alt="" />
        </div>
        <p className="text-md pl-2">Gå tilbake</p>
      </button>
      <Navbar activeProp={3} />

      {/* Her er all data til headeren*/}
      <h1>{group.title}</h1>
      <h1>{group.description}</h1>

      <h1>{group.followedBy.length} medlemmer</h1>

      {group.followedBy.map((member, index) => (
        <Link href={`/profil/${member}`}>
          <p>{member}</p>
        </Link>
      ))}

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

      {/* Her er alle postene i gruppen. De er hentet som poster*/}
      {posts.map((post) => {
        return (
          <div
            className="p-3
          "
          >
            <Post key={post.id} post={post} />
          </div>
        );
      })}
    </div>
  );
}

