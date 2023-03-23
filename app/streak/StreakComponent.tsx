import { async } from "@firebase/util";
import { useAuthContext } from "context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import { useState, useEffect, use } from "react";
import { GoFlame } from "react-icons/go";

export default function StreakComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const { user } = useAuthContext();

  async function getDates() {
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    // Define the collection reference for the user's "dates" subcollection
    const datesCollection = collection(
      firestoreDB,
      "users",
      user.uid,
      "streakArray"
    );

    // Query the "dates" subcollection to get documents where the "uid" property matches the user.uid
    const querySnapshot = await getDocs(
      query(datesCollection, where("uid", "==", user.uid))
    );

    // Convert querySnapshot to an array of streakArray objects
    const myArray = querySnapshot.docs.map((doc) => {
      return doc.data().streakArray;
    });

    console.log(myArray);
    setDateArray(myArray);
  }

  async function updateBackend(arg: any[]) {
    // Define the document reference for the user profile
    const userProfileRef = doc(firestoreDB, "users", user.uid);

    // Update the user profile with the new array
    await setDoc(userProfileRef, { streakArray: arg }, { merge: true });

    console.log(`User profile (${user.uid}) updated with the new array.`);
  }

  const runLogic = () => {
    let loginArray = dateArray;

    const lastLogin: Date = loginArray[loginArray.length - 1];
    const today = new Date();

    if (loginArray.length > 0) {
      if (
        lastLogin.getFullYear() == today.getFullYear() &&
        lastLogin.getMonth() == today.getMonth()
      ) {
        if (lastLogin.getDay() == today.getDay() - 1) {
          loginArray.push(today);
        } else if (lastLogin.getDay() !== today.getDay()) {
          loginArray.splice(0);
          loginArray.push(today);
        }
      } else {
        loginArray.splice(0);
        loginArray.push(today);
      }
    } else {
      loginArray.push(today);
    }
    setDisplayArray(loginArray);
    updateBackend(loginArray);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    const timer2 = setTimeout(() => {
      setIsVisible(false);
    }, 7000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    getDates();
  }, []);

  useEffect(() => {
    runLogic();
  }, [dateArray]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-16">
      {isVisible && (
        <div className="bg-salmon rounded-2xl max-w-md mx-auto grid gap-2 p-3 relative shadow-md ease-in-out">
          <div className="flex items-center justify-center w-42 h-10">
            <GoFlame size={24} color="white" />
            <div className="pl-3 text-white">
            {displayArray.length}
            </div>
            <h1 className="font-normal pl-3 text-white pr-3"> {displayArray.length == 1 ? 'dag' : 'dager'} på rad</h1>
          </div>
          <div className="flex items-center justify-center text-white text-lg font-medium ml-1 absolute left-16 top-5">
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
