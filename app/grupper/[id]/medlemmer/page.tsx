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
  createdBy: string;
}

export default function Members({ params }: any) {
  //! any???

  const { user } = useAuthContext();

  const [group, setGroup] = useState({
    //! type GROUP funka ikke her
    title: "",
    description: "",
    followedBy: [],
    id: "",
    createdBy: "",
  });

  const [members, setMembers] = useState();

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
          Vi som ikke klarer fjellturer
        </div>
        <div className="bg-white rounded-2xl p-5 mt-5">
          <div className="font-nunito font-bold text-xl">Medlemmer</div>
          <div className="flex flex-col mt-3 gap-3">
            {group.followedBy.map((id, index) => {
              function handleRemoveMember(): void {
                const updatedFollowedBy = [
                  ...group.followedBy.slice(0, index),
                  ...group.followedBy.slice(index + 1),
                ];
                setGroup({
                  ...group,
                  followedBy: updatedFollowedBy,
                });
                updateDoc(doc(firestoreDB, "groups", params.id), {
                  followedBy: updatedFollowedBy,
                });
              }

              return (
                <div key={index} className="flex justify-between items-center">
                  <div className="font-nunito font-semibold">
                    <div>{id}</div>
                    <div className="text-lightgrey">@{id}</div>
                  </div>

                  {group.createdBy == user.uid && id != group.createdBy ? (
                    <div
                      className="bg-salmon h-max rounded-full text-white text-md py-0.5 px-4 hover:bg-darksalmon duration-200 cursor-pointer"
                      onClick={() => handleRemoveMember()}
                    >
                      Fjern bruker
                    </div>
                  ) : null}
                  {group.createdBy == id ? (
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
