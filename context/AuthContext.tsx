'use client'
import React, { useEffect, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { User as FirebaseUser } from "firebase/auth"
import {
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import { firebase_app } from 'lib/firebase';
import { InfinitySpin } from 'react-loader-spinner';
import Navbar from 'components/Navbar';

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

  const userValue = useMemo(() => ({ user, loadingAuth }), [user, loadingAuth]);

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

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setUser(user);
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

export default { AuthProvider, useAuthContext }
