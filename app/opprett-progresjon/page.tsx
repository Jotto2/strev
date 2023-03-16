"use client";

import { getAuth, Auth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { AuthContext, useAuthContext } from "context/AuthContext";
import { useRouter } from "next/navigation";
import firebase from "firebase/app";
import "firebase/auth";
import { firebase_app, firestoreDB } from "lib/firebase";
import "styles/globals.css";
import Navbar from "components/Navbar";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import router from "next/router";

export default function CreateProgression() {
  const { user } = useAuthContext();
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const unitRef = useRef<HTMLInputElement>(null);

  async function handleCreateProgression() {
    event.preventDefault();
    if (titleRef.current.value == "" || descriptionRef.current.value == "" || unitRef.current.value == "") {
      return;
    }

    await addDoc(collection(firestoreDB, "progressions"), {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      unit: unitRef.current.value,
      createdBy: user.uid,
      progression: []
    });
    router.push("/progresjon");

  }

  return (
    <div className="pb-32">
      <div className="w-full max-w-md mx-auto mt-10 mb-10 bg-background px-4 pb-4">
        <button
          onClick={() => {
            window.location.href = "/progresjon";
          }}
        >
          <div className="flex items-center btn mt-10 text-sm text-lightgrey bg-white rounded-full">
            <img src="./Vector.svg" className="h-4 " alt="Vector"></img>
          </div>
        </button>
        <div className="rounded-xl bg-white p-4 drop-shadow-box mt-10">
          <h2 className="text-xl pt-4 mb-3">Ny øvelse</h2>
          <form onSubmit={handleCreateProgression}>
            <input
              className="bg-background rounded-xl outline-none p-3 font-lato font-normal border-[1px] border-darkgrey w-full mb-4"
              type="text"
              placeholder="Tittel"
              ref={titleRef}
            />
            <textarea
              className="bg-background rounded-xl outline-none p-3 font-lato font-normal border-[1px] border-darkgrey w-full resize-y mb-4"
              placeholder="Beskrivelse"
              ref={descriptionRef}
            />
            <input
              className="bg-background rounded-xl outline-none p-3 font-lato font-normal border-[1px] border-darkgrey w-full mb-4"
              type="text"
              placeholder="Måleenhet"
              ref={unitRef}
            />
            <button
              className="bg-salmon text-white text-base rounded-xl w-full p-3"
              type="submit"
            >
              Legg til øvelse
            </button>
          </form>
        </div>
      </div>

      <Navbar activeProp={4} />
    </div>
  );
}
