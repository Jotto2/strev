"use client";
import React, { useEffect, useState } from "react";
import Navbar from "components/Navbar";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import { useRouter } from "next/navigation";

async function getGroup(id: string) {
  const activityRef = doc(firestoreDB, "groups", id);
  const activityDoc = await getDoc(activityRef);
  return activityDoc.data() as Group;
}

interface Group {
  title: string;
}

export default function Group({ params }: any) {
  const [group, setGroup] = useState<Group>({
    title: "",
  });

  useEffect(() => {
    async function fetchActivity() {
      const data = await getGroup(params.id);
      console.log(data);
      setGroup(data);
    }
    fetchActivity();
  }, []);

  const router = useRouter();

  return (
    <div>
      <button
        className="flex p-1 pt-8"
        type="button"
        onClick={() => router.back()}
      >
        <div className="h-30">
          <img src="/backArrow.svg" alt="" />
        </div>
        <p className="text-md pl-2">Gå tilbake</p>
      </button>
      <Navbar activeProp={3} />
      <h1>{group.title}</h1>
    </div>
  );
}
