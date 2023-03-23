'use client'
import React, { useEffect, useMemo} from 'react';
import { useRouter } from "next/navigation";
import { User as FirebaseUser } from "firebase/auth"
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import { firebase_app, firestoreDB } from 'lib/firebase';
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { InfinitySpin } from 'react-loader-spinner';


//const auth = getAuth(firebase_app);

type ContextProps = {
    user: FirebaseUser | null;
    loading: boolean;
}

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error(
          "useFirebaseAuth must be used within a FirebaseAuthProvider"
        );
    }

    return context;
}

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = React.useState(null as FirebaseUser | null);
    const [loadingAuth, setLoadingAuth] = React.useState(true);

    const userValue = useMemo(() => ({user, loadingAuth}), [user, loadingAuth]);

    //const router = useRouter();

    

    const auth = getAuth(firebase_app);

    //TODO Fix implementering av kommentert kode om nødvendig

    /*const isLoggedIn = !!auth.currentUser;

    React.useEffect(() => {
        if (isLoggedIn) {
            router.push("/logg-inn")
        }
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);*/

    async function storeUserData(user) {
      console.log("storeUserData");
      event.preventDefault(); // Stop page reload
      const userRef = doc(collection(firestoreDB, "users"), user.uid);
      // Check if the document already exists
      const userDoc = await getDoc(userRef);
      if (userDoc.exists() && userDoc.data().uid === user.uid) {
        console.log("Document already exists:", userDoc.data());
        return; // Stop execution if the document already exists
      }
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        posts: [],
        isInGroup: [],
        activity: [],
        follows: [],
        followedBy: [],
      });
    }  

    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            setUser(user);
            storeUserData(user);
            console.log(user);
            setLoadingAuth(false);
        });
    }, []);

    return (
      <AuthContext.Provider value={userValue}>
      {loadingAuth ?
        /*<div>
          <>{View}</>
          <p>Laster...</p>
        </div>*/
        <div className='w-full h-screen flex flex-col justify-center items-center'>
          <InfinitySpin
            width='200'
            color="#F1A095"
          />
          <div className='text-darkgrey text-center'>
            Vent litt...
          </div>
        </div>
        : children}
    </AuthContext.Provider>
    );
};