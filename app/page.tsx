"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import { getAuth, Auth } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthContext } from "context/AuthContext";
import { useRouter } from "next/navigation";
import firebase from "firebase/app";
import "firebase/auth";
import { firebase_app } from "lib/firebase";
import "styles/globals.css";
import Navbar from "components/Navbar";


export default function page() {


  
  return (
    <div className="pb-32">
      
      <div className="grid place-items-center pt-80">
        <h1 className="text-3xl">Velkommen til Strev</h1>
        <p>På denne siden vil du snart få opp innlegg fra de du følger</p>
      </div>
      {/* <button onClick={() => firebase_app.auth().signOut()}>Logout</button> */}
      <Navbar activeProp={0} />
    </div>
  );
}
