'use client'
import Navbar from 'components/Navbar'
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";
import { useState } from "react";
import Image from "next/image";


export default function Profil() {

  const [profileGmail, setProfileGmail] = useState('andersro@gmail.com'); // TODO hent inn brukernavn fra backend
  const [profileFullName, setprofileFullName] = useState('Anders Rodem'); // TODO hent inn fullt navn fra backend

  const handleLogOut = () => {
    // TODO logikk for å logge ut
  }

  return (
    <div>
      <div className='pb-32 bg-background h-screen pt-32 px-5'>
        <div className="rounded-2xl bg-white max-w-md mx-auto p-6 drop-shadow-box">
          <div>
            <Image
              className='w-40 h-40 mx-auto relative rounded-full -mt-20'
              src={'/avatar.png'}
              height={160}
              width={160}
              alt={''}
              loading="lazy"
            />
            <div className="mb-5 mt-8">
              <span className="text-xl text-lightgrey font-semibold font-lato block">Fullt navn</span>
              <span className="text-xl text-darkgrey font-lato font-semibold">@{profileFullName}</span> {/* TODO logikk */}
            </div>
            <div className="mb-5">
              <span className="text-xl text-lightgrey font-lato font-semibold block">Gmail</span>
              <span className="text-xl text-darkgrey font-lato max-w-xs font-semibold">{profileGmail}</span> {/* TODO logikk */}
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
      <Navbar activeProp={4}/>
    </div>
  )
}
