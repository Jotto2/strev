"use client";
import Navbar from "components/Navbar";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateGroup() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const create = async () => {
    event.preventDefault();
    const docRef = await addDoc(collection(firestoreDB, "groups"), {
        title,
        createdBy: user.uid,
        createdDate: new Date(),
        imageURL: user.photoURL,
        madeByName: user.displayName,
        followedBy: [],
    });
    router.push("/grupper")
  };

  return (
    <div>
        <Navbar activeProp={3} />
        <h1>Opprett gruppe</h1>
        <form onSubmit={create}>
        <label className="w-10">
            <input
              className="mb-4 pl-4 h-8 w-full bg-background rounded-md"
              type="text"
              name="title"
              placeholder="Tittel"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <button
            className="bg-salmon text-white text-md rounded-md w-full p-2 "
            type="submit"
          >
            Opprett aktivitet
          </button>
        </form>
    </div>
  );
}
