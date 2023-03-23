"use client";
import Navbar from "components/Navbar";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import Image from "next/image";

export default function Profil() {
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogOut = () => {
    window.location.href = "/logg-inn";
  };

  return (
    <div>
      <div className="pb-32 bg-background h-screen pt-32 px-5">
        <div className="rounded-2xl bg-white max-w-md mx-auto p-6 drop-shadow-box">
          <div>
            <img
              className="w-40 h-40 mx-auto relative rounded-full -mt-20"
              src={user.photoURL}
              height={160}
              width={160}
              alt={""}
              loading="lazy"
            />
            <div className="mb-5 mt-8">
              <span className="text-xl text-lightgrey  block">Navn</span>
              <span className="text-xl text-darkgrey">
                {user.displayName}
              </span>{" "}
              {/* TODO logikk */}
            </div>
            <div className="mb-5">
              <span className="text-xl text-lightgrey  block">Epost</span>
              <span className="text-xl text-darkgrey  max-w-xs">
                {user.email}
              </span>{" "}
              {/* TODO logikk */}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-salmon text-white text-base rounded-md w-full p-2 drop-shadow-box hover:bg-darksalmon duration-100 font-semibold"
                onClick={handleLogOut}
              >
                Logg ut
              </button>
            </div>
          </div>
        </div>
      </div>
      <Navbar activeProp={5} />
    </div>
  );
}
