import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";

async function getActivity(activityId: string) {
  const docRef = doc(firestoreDB, "activity", activityId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log(data);
    return data;
  } else {
    console.log(`No document with ID ${activityId} found`);
    return null;
  }
}

const auth = getAuth();
const user = auth.currentUser;

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

export default async function ActivityPage({ params }: any) {
  const activity = await getActivity(params.id);


  return (
    <div>
      <button>Go Back</button>
        <div>
      <div className="w-full max-w-md mx-auto bg-white rounded-xl p-5 my-8 drop-shadow-box">
        <img
          className="w-full rounded-xl max-h-40 pb-4 object-cover"
          src="./inspect-placeholder.jpg"
          alt=""
        />
        <div className="flex gap-4 relative">
          <img className="rounded-full w-12 h-12" src="./avatar.png" alt="" />
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
          {activity.createdBy == user ? (
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
                  activity.days.includes(day) ? selectedDayStyling : dayStyling
                }
              >
                {day[0]}
              </div>
            ))}
          </div>
        </div>
       
          <div className={titleStyling}>Øvelser</div>
          <div className="flex flex-col gap-3">
            {activity.exerciseList.map((exercise) => (
              
              <div className="flex justify-between items-center w-full gap-4">
                <img
                  className="w-16 p-10 bg-purple rounded-xl"
                  src="./header.jpg"
                  alt=""
                />
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
function getProgram() {
  throw new Error("Function not implemented.");
}

