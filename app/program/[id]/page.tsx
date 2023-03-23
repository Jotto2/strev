"use client";
import Navbar from "components/Navbar";
import { useAuthContext } from "context/AuthContext";
import { each } from "cypress/types/jquery";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getActivity(id: string) {
  const activityRef = doc(firestoreDB, "activity", id);
  const activityDoc = await getDoc(activityRef);
  console.log(activityDoc.data());
  let exList = [];
  (activityDoc.data().exerciseList).forEach(item => {
    exList.push({
      title: item.title,
      description: item.description 
    });
  });
  let retVal: Activity = {
    title: activityDoc.data().title,
    imageURL: activityDoc.data().imageURL,
    madeByName: activityDoc.data().madeByName,
    createdBy: activityDoc.data().createdBy,
    exerciseList: exList,
    description: activityDoc.data().description,
    days: activityDoc.data().days,
    category: activityDoc.data().category
  };
  console.log(retVal);
  return retVal;
}

interface Activity {
  title: string;
  imageURL: string;
  madeByName: string;
  createdBy: string;
  exerciseList: {
    description: string,
    title: string;
  }[];
  description: string;
  days: string[];
  category: string;
}

export default function ActivityPage({ params }: any) {
  const { user } = useAuthContext();

  const [activity, setActivity] = useState<Activity>({
    title: "",
    imageURL: "",
    madeByName: "",
    createdBy: "",
    exerciseList: [{
      description: "",
      title: ""
    }],
    description: "",
    days: [],
    category: ""
  });
  useEffect(() => {
    async function fetchActivity() {
      const data = await getActivity(params.id);
      setActivity(data);
      console.log(data);
    }
    fetchActivity();
  }, []);

  const router = useRouter();
  
  const days = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag",
  ];
  const dayStyling =
    "bg-lightpurple rounded-full text-darkgrey text-xl w-10 h-10 flex justify-center items-center font-semibold";
  const selectedDayStyling =
    "bg-purple rounded-full text-white text-xl w-10 h-10 flex justify-center items-center font-semibold drop-shadow-box";
  const titleStyling = "font-bold font-nunito text-xl mb-5 mt-8";

  return (
    <div >
      <Navbar activeProp={5} />
      <div className="max-w-md mx-auto">
      <button className="flex p-1 pt-8" type="button" onClick={() => router.back()}>
        <div className="h-30">
        <img src="/backArrow.svg" alt="" />
        </div>
        <p className="text-md pl-2">Gå tilbake</p>
      </button>
      </div>
      <div>
        <div className="w-full max-w-md mx-auto bg-white rounded-xl p-5 my-8 drop-shadow-box">
          <img
            className="w-full rounded-xl max-h-40 pb-4 object-cover"
            src="./inspect-placeholder.jpg"
            alt=""
          />
          <div className="flex gap-4 relative">
            <img className="rounded-full w-12 h-12" src={activity.imageURL} alt="" />
            <div className="pr-4">
              <div className="text-purple text-sm uppercase tracking-wider font-bold font-nunito">
                {activity.category}
              </div>
              <div className="font-bold text-xl font-nunito">
                {activity.title}
              </div>
              <div className="text-md font-nunito text-darkgrey font-semibold">
                {activity.madeByName}
              </div>
              <div className="font-lato text-darkgrey">
                {activity.description}
              </div>
            </div>
            {activity.createdBy == user.toString() ? (
              <img
                className="absolute top-2 right-2 w-5 cursor-pointer"
                src="./trash.svg"
              />
            ) : null}
          </div>
          <div>
            <div className={titleStyling}>Dager</div>

            <div className="flex w-full justify-between px-2">
              {days.map((day) => (
                <div
                  key={day}
                  className={
                    activity.days.includes(day)
                      ? selectedDayStyling
                      : dayStyling
                  }
                >
                  {day[0]}
                </div>
              ))}
            </div>
          </div>

          <div className={titleStyling}>Øvelser</div>
          
          <div className="flex flex-col gap-3">
            {activity.exerciseList.map((exercise, index) => (
              <div key={index}
              className="flex justify-between items-center w-full gap-4">
                <img className="w-16 p-3 bg-purple rounded-xl" src="/Lifting-Icon-Transparent.png" alt="" />
            
                <div className="flex justify-between items-center flex-1">
                  <div>
                    <div className="font-bold font-nunito text-lg">
                      {exercise.title}
                    </div>
                    <div className="font-nunito">{exercise.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*
<div>
  <div className={titleStyling}>
    Progresjon
  </div>
  <div onClick={() => handleAddProgression()} className="bg-salmon hover:bg-darksalmon cursor-pointer duration-200 flex justify-between items-center text-white rounded-md py-3 px-4 font-semibold  drop-shadow-box hover:drop-shadow-none">
    <div>
      Legg til progresjon
    </div>
    <img src="./AddButton.png" className="h-8"></img>
  </div>
    </div>
  */}
      </div>
    </div>
  );
}
