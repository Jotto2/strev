import Link from "next/link";
import next from "next";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export default function ActivityCard({ activity }: any) {
  const { id, title, category, followers, description, createdBy, imageURL, madeByName} = activity;
  //Her må bilde også importeres

  const auth = getAuth();
  const uid = createdBy;
  const [photoURL, setPhotoURL] = useState("");

  return (
    <div className={
        category === "styrke" ? "bg-purple rounded-2xl  max-w-md mx-auto" :
        category === "cardio" ? "bg-darkblue rounded-2xl  max-w-md mx-auto" :
        category === "bevegelse" ? "bg-blue rounded-2xl  max-w-md mx-auto" :
        "bg-darkgrey rounded-2xl  max-w-md mx-auto"
    }>
   
      <div className="grid grid-cols-2 pt-3 pb-2 px-3">
        <h4 className="text-white text-sm">{activity.followers} followers</h4>
        <div className="flex justify-end">
          <h4 className="text-white text-sm truncate">{activity.madeByName}</h4>
          <img
            className="h-5 px-2"
            src={activity.imageURL}
          ></img>
        </div>
      </div>
      <div className="">
        <img className="" src="./placeholder.png"></img>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-5 m-3">
        <div className="flex flex-col justify-center items-center">
          <img className="max-h-20" src="./Lifting-Icon.png"></img>
        </div>
        <div className="col-span-2 flex items-center">
          <div>
            <h3 className="text-white text-xl -mt-2 truncate">
              {activity.title}
            </h3>
            <p className="text-white text-md truncate">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <button className="btn text-sm text-dark bg-lightblue rounded-full py-1.5">
          Følger
        </button>
        <Link href={`program/${activity.id}`} className="btn text-sm text-white bg-salmon rounded-full">
        <button className="btn text-sm text-white bg-salmon rounded-full" >
         Se hele
        </button>
        </Link>
      </div>

    </div>
  );
}
