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
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebase_app, firestoreDB } from "lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import router from "next/router";
import Group from "../page";
import { useAuthContext } from "context/AuthContext";

export async function getGroup(id: string): Promise<Group> {
  const activityRef = doc(firestoreDB, "groups", id);
  const activityDoc = await getDoc(activityRef);
  return activityDoc.data() as Group;
}


interface Member {
  uid: string,
  displayName: string,
  photoURL: string,
  email: string
}

interface Group {
  title: string;
  description: string;
  followedBy: Member[];
  id: string;
  createdBy: string;
}


export default function Members({ params }: any) {
  //! any???

  const { user } = useAuthContext();

  const [group, setGroup] = useState<Group>({
    //! type GROUP funka ikke her
    title: "",
    description: "",
    followedBy: [] as Member[],
    id: "",
    createdBy: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchGroup() {
      const data = await getGroup(params.id);
      setGroup(data);
    }
    fetchGroup();
  }, [params.id, user.uid]);

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

        <div className="font-nunito font-bold text-xl">
          {group.title}
        </div>
        <div className="bg-white rounded-2xl p-5 mt-5 drop-shadow-box">
          <div className="font-nunito font-bold text-xl">Medlemmer</div>
          <div className="flex flex-col mt-3 gap-3">
            {group.followedBy.map((member, index) => {
              function handleRemoveMember(): void {

                // Remove member from group
                const updatedFollowedBy = [
                  ...group.followedBy.slice(0, index),
                  ...group.followedBy.slice(index + 1),
                ];

                // Update group client side
                setGroup({
                  ...group,
                  followedBy: updatedFollowedBy,
                });

                // Update group server side
                updateDoc(doc(firestoreDB, "groups", params.id), {
                  followedBy: updatedFollowedBy,
                });
              }

              return (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img className="rounded-full w-10 h-10" src={member.photoURL} />
                    <div className="font-nunito font-semibold">
                      <div>{member.displayName}</div>
                      <div className="text-lightgrey">{member.email}</div>
                    </div>
                  </div>

                  {group.createdBy == user.uid && member.uid != group.createdBy ? (
                    <div
                      className="bg-salmon h-max rounded-full text-white text-md py-0.5 px-4 hover:bg-darksalmon duration-200 cursor-pointer"
                      onClick={() => handleRemoveMember()}
                    >
                      Fjern bruker
                    </div>
                  ) : null}
                  {group.createdBy == member.uid ? (
                    <div className="bg-yellow h-max rounded-full text-black text-md py-0.5 px-4">
                      Gruppeeier
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
