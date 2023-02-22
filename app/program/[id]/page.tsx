import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";

async function getActivity(activityId: string){
const docRef = doc(firestoreDB, 'activity', activityId);
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



export default async function ActivityPage({ params }:any) {
const activity = await getActivity(params.id);

  return (
    <div>
        <h1>{activity.title}</h1>
    </div>
  )
}
