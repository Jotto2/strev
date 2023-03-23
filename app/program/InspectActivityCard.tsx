/* eslint-disable react/jsx-key */
import { useState } from "react";
import internal from "stream";

export default function InspectActivity() {

  type ExerciseObj = {
    name: string,
    sets: number,
    reps: number,
    weight: number
  }

  const [ownActivity, setOwnActivity] = useState<boolean>(true)
  const [activityUser, setActivityUser] = useState<string>("torgeirsmed");
  const [activityName, setActivityName] = useState<string>("Styrkeøkt med Torbis")
  const [activityDescription, setActivityDescription] = useState<string>("I denne overkroppsøkten får du utfordret kroppen din! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis vulputate lorem vel maximus. Sed sem lacus, dignissim quis posuere a...")
  const [activityType, setActivityType] = useState<string>("styrketrening")
  const [activityPublic, setActivityPublic] = useState<boolean>(false)
  const [activityDays, setActivityDays] = useState<boolean[]>([true, false, false, true, true, false, false])
  const [activityExercises, setActivityExercises] = useState<ExerciseObj[]>([
    {
      name: "Benkpress",
      sets: 70,
      reps: 12,
      weight: 69,
    },
    {
      name: "Knebøy",
      sets: 4,
      reps: 10,
      weight: 110,
    },
    {
      name: "Skråbenk",
      sets: 3,
      reps: 1,
      weight: 50,
    }
  ])

  const days = ["M", "T", "O", "T", "F", "L", "S"];
  const dayStyling = "bg-lightpurple rounded-full text-darkgrey text-xl w-10 h-10 flex justify-center items-center font-semibold"
  const selectedDayStyling = "bg-purple rounded-full text-white text-xl w-10 h-10 flex justify-center items-center font-semibold drop-shadow-box"
  const titleStyling = "font-bold font-nunito text-xl mb-5 mt-8"

  const handleAddProgression = () => {
    // TODO: Add progression
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl p-4 drop-shadow-box">
      <img className="w-full rounded-xl max-h-40 pb-4 object-cover" src="./inspect-placeholder.jpg" alt="" />
      <div className="flex gap-4 relative">
        <img className="rounded-full w-12 h-12" src="./avatar.png" alt="" />
        <div className="pr-4">
          <div className="text-purple text-sm uppercase tracking-wider font-bold font-nunito">
            {activityType}
          </div>
          <div className="font-bold text-xl font-nunito">
            {activityName}
          </div>
          <div className="text-md font-nunito text-darkgrey font-semibold">
            @{activityUser}
          </div>
          <div className="font-lato text-darkgrey">
            {activityDescription}
          </div>
        </div>
        {ownActivity ? <img className="absolute top-2 right-2 w-5 cursor-pointer" src="./trash.svg" /> : null}
      </div>
      <div>
        <div className={titleStyling}>
          Dager
        </div>
        <div className="flex w-full justify-between px-2">
          {activityDays.map((day, index) => (
            // eslint-disable-next-line react/jsx-key
            day ? <div className={selectedDayStyling + " bg-salmon"}>
              {days[index]}
            </div> : <div className={dayStyling}>
              {days[index]}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className={titleStyling}>
          Øvelser
        </div>
        <div className="flex flex-col gap-3">
          {activityExercises.map((exercise) => (
            <div className="flex justify-between items-center w-full gap-4">
              <img className="w-16 bg-purple p-2 rounded-xl" src="./Lifting-Icon-Transparent.png" alt="" />
              <div className="flex justify-between items-center flex-1">
                <div>
                  <div className="font-bold font-nunito text-lg">
                    {exercise.name}
                  </div>
                  <div className="font-nunito">
                    {exercise.sets} sett - {exercise.reps} {exercise.reps > 1 ? "reps" : "rep"}
                  </div>
                </div>
                <div className=" font-bold text-xl text-center w-max font-nunito font-bold">
                  {exercise.weight}kg
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
  )
}
