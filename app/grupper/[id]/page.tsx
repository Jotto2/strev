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
import CreatePostActual from "@/opprett-innlegg/page";
import PostCard from "@/PostCard";

export async function getGroup(id: string) {
  const activityRef = doc(firestoreDB, "groups", id);
  const activityDoc = await getDoc(activityRef);
  return activityDoc.data() as Group;
}

interface Member {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}

interface Group {
  title: string;
  description: string;
  followedBy: Member[];
  id: string;
  createdBy: string;
}

export default function Group({ params }: any) {
  const [group, setGroup] = useState<Group>({
    title: "",
    description: "",
    followedBy: [],
    id: "",
    createdBy: "",
  });

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
    console.log("Handle Toggle!");
  }

  //Henter alle postene i en gruppe
  async function getPosts() {
    const myCollection = collection(firestoreDB, "posts");
    const querySnapshot = await getDocs(
      query(myCollection, where("groupID", "==", params.id))
    );
    const myArray = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return myArray;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getPosts();
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  //Ordner følging
  useEffect(() => {
    const fetchGroupAndCheckFollowStatus = async () => {
      const groupData = await getGroup(params.id);
      setGroup(groupData);
      const followerRef = doc(firestoreDB, `groups/${params.id}`);
      const followerSnap = await getDoc(followerRef);

      if (followerSnap.exists()) {
        const followerData = followerSnap.data();

        if (followerData?.followedBy) {
          groupData.followedBy.forEach((member) => {
            if (member.uid === user.uid) {
              setIsSubscribed(true);
            }
          });
        }
      }
    };

    fetchGroupAndCheckFollowStatus();
  }, [params.id, user.uid, isSubscribed]);



  // Oppdaterer følge-knappen basert på om du følger eller ikke
  const updateFollower = async (member: Member) => {
    if (member.uid === group.createdBy) return;

    const followerRef = doc(firestoreDB, `groups/${params.id}`);
    const followerSnap = await getDoc(followerRef);

    if (followerSnap.exists()) {
      const followerData = followerSnap.data();

      if (followerData?.followedBy) {
        // If followedBy array already exists, check if member is present in it
        const index = followerData.followedBy.findIndex(
          (m) => m.uid === member.uid
        );

        if (index === -1) {
          // member not present in followedBy array, so add it
          await updateDoc(followerRef, {
            followedBy: [...followerData.followedBy, member],
          });
          setIsSubscribed(true);
        } else {
          // member present in followedBy array, so remove it
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
        // If followedBy array does not exist, create it and add member
        await updateDoc(followerRef, {
          followedBy: [member],
        });
        setIsSubscribed(true);
      }
    }
  };

  function handleCreatePost() {
    console.log("Creating post");
  }

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

        <div className="rounded-t-xl w-full h-40 bg-[url('/inspect-placeholder.jpg')] bg-center bg-cover"></div>
        {/* Her er all data til headeren*/}
        <div className="bg-white p-5 rounded-b-xl drop-shadow-box">
          <div className="text-xl font-nunito font-bold">{group.title}</div>
          <div className="font-lato">{group.description}</div>
          <div
            className="flex cursor-pointer w-max items-center py-3 gap-1 group duration-200"
            onClick={() => {
              window.location.href = `${params.id}/medlemmer`;
            }}
          >
            <FiUser
              className="text-lightgrey group-hover:text-darkgrey duration-200"
              size={20}
            />
            <div className="text-lightgrey group-hover:text-darkgrey duration-200">
              {group.followedBy.length}
              {group.followedBy.length === 1 ? " medlem" : " medlemmer"}
            </div>
            <IoInformationCircleSharp
              className="text-salmon group-hover:text-darksalmon duration-200"
              size={20}
            />
          </div>

          {group.createdBy === user.uid ? (
            <div className="bg-yellow py-2 w-40 rounded-full text-dark text-md font-lato text-center font-bold">
              Gruppeeier
            </div>
          ) : (
            <button
              className={`btn text-sm text-dark rounded-full py-2 w-40 font-lato duration-200 ${
                isSubscribed
                  ? "bg-background hover:bg-lightgrey"
                  : "bg-lightblue hover:bg-hoverblue"
              }`}
              onClick={() =>
                updateFollower({
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  email: user.email,
                })
              }
            >
              {isSubscribed ? "Følger" : "Følg"}
            </button>
          )}
        </div>

        {/*
          group.followedBy.map((member, index) => (
            <Link key={member} href={`/profil/${member}`}>
              <p>{member}</p>
            </Link>
          ))
        */}

        {/* Her er alle postene i gruppen. De er hentet som poster*/}
        {/* BYTT UT MED PostCard! */}
        {posts.map((post) => {
          return (
            <div key={post.id} className="p-3">
              <PostCard props={post}/>
            </div>
          );
        })}

        {/* Her er pluss-knappen for å lage en ny post*/}
        <div className="w-full max-w-md mx-auto fixed bottom-24">
          <div
            className="bg-salmon rounded-full w-max h-max p-4 hover:bg-darksalmon duration-200 cursor-pointer absolute right-4 bottom-4"
            onClick={() => {handleToggle(); //egentlig å sende IDen til gruppa med opprett-innlegg kallet 
            }}
          >
            <img className="w-10" src="/plus-icon.svg" alt="" />
            
          </div>
          <div>
  {toggle && <CreatePostActual id={params.id} />}
    </div>

        </div>
      </div>
    </div>
  );
}
