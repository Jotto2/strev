import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../lib/context';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import { useUserData } from '../lib/hooks';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '@/lib/firebase';
import 'firebase/compat/auth';
import { auth, firestore } from '../lib/firebase';
import Link from 'next/link';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({loggedIn: true});
    } else {
      callback({loggedIn: false});
    }
  });
}


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const userData = useUserData();
  //const {user, username} = useUserData();
  const [user, setUser] = useState( {loggedIn: false});
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    console.log('User is');
    console.log(!user.loggedIn);
    if(user.loggedIn){
      router.push("/enter");
      //router.pathname !== "/enter" && 
    }
  }, []);

  return (
    <UserContext.Provider value={userData}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
