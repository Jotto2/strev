'use client'

import Navbar from 'components/Navbar'
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import getCollection from "firestore/getData";
import { getFirestore } from "firebase/firestore";
import { firebase_app, firestoreDB } from "lib/firebase";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import Groupcard from './GroupCard';

const auth = getAuth();
const user = auth.currentUser;

async function getGruppe() {
  const myCollection = collection(firestoreDB, "groups");
  const querySnapshot = await getDocs(
    query(myCollection)
  );
  const myArray = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log(myArray);
  return myArray;
}

export default function GruppeSide() {

  const [gruppe, setGruppe] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getGruppe();
      setGruppe(result);
    }
    fetchData();
  }, []);

  return (
    <div>

    <button onClick={() => {window.location.href = '/opprett-gruppe'}}>Opprett en gruppe</button>

      <Navbar activeProp={3} />
      
      {gruppe.map((grup) => {
        return (
          <Groupcard key={grup.id} group={grup}/>
        )
      })}
    </div>
  )
}
