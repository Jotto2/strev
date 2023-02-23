"use client";
import Navbar from "components/Navbar";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import Image from "next/image";

export default function Profil() {
  return (
    <div className='pb-32'>
        <Navbar activeProp={4}/>


    </div>
  );
}
