import { async } from '@firebase/util'
import { useAuthContext } from 'context/AuthContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestoreDB } from 'lib/firebase'
import { useState, useEffect, use } from 'react'
import { GoFlame } from "react-icons/go"

export default function StreakComponent() {
  const [isVisible, setIsVisible] = useState(false)
  const [dateArray, setDateArray] = useState([])
  const [displayArray, setDisplayArray] = useState([])
  const {user} = useAuthContext()
  
  async function getDates() {
    const myCollection = collection(firestoreDB, "users", user.uid)
    const querySnapshot = await getDocs(query(myCollection, where ("uid","==",user.uid)));
    const myArray = querySnapshot.docs.map((doc) => {
      return doc.data().streakArray; // Add ID to data object
    });
    console.log(myArray);
    setDateArray(myArray);
  }

  const updateBackend = (arg: any[]) =>  {
    //TODO Send til backend
  }
   
  const runLogic = () => {
    let loginArray = dateArray;

    const lastLogin: Date = loginArray[loginArray.length - 1];
    const today = new Date();

      if (loginArray.length > 0) {
      if (lastLogin.getFullYear() == today.getFullYear() && lastLogin.getMonth() == today.getMonth()) {
        if (lastLogin.getDay() == today.getDay() -1) {
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
  }
  

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    const timer2 = setTimeout(() => {
      setIsVisible(false)
    }, 4000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    getDates();
  }, [])

  useEffect(() => {
    runLogic()
  },[dateArray])

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-16">
    {isVisible && (
      <div className="bg-salmon rounded-2xl max-w-md mx-auto grid grid-cols-2 gap-2 p-3 relative shadow-md ease-in-out">
        <div className="flex items-center justify-center w-10 h-10">
          <GoFlame size={24} color="white"/>
        </div>
        <span className="flex items-center justify-center text-white text-lg font-medium ml-1 absolute left-16 top-5">{displayArray.length}</span>
      </div>
    )}
  </div>
  )
}