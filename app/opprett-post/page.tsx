"use client";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreatePost() {
  //Her burde det legges inn props som en referanse til hvor posten (hvilken gruppe eller person) den tilhører
  //En referanse til hvem som har laget posten
  //En referanse til gruppen kalt partOf (om den finnes) posten ble lagt ut i

  const create = async () => {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const [activityRef, setActivityRef] = useState(""); //Hvilken aktivitet posten inneholder
    const [description, setDescription] = useState("");

    //Legger til en post i databasen
    const docRef = await addDoc(collection(firestoreDB, "posts"), {
      description,
      createdBy: user.uid,
      createdAt: new Date(),
      displayName: user.displayName,
      activityRef,
      partOf: [],
      comments: [],
      likedBy: [],
    });
    console.log("Document written with ID: ", docRef.id);

    //Burde være en delay etter den er postet som sier at den er postet før brukeren sendes tilbake

    //Gjør at brukeren blir sendt tilbake til siden han kom fra
    router.back();
  };

  return (
    <div>
      <form onSubmit={create}>
        <button type="submit">Trykk her for å sende inn skjemaet</button>
      </form>
    </div>
  );
}
