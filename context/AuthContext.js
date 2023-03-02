'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import {firebase_app} from 'lib/firebase';


const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const router = useRouter();

    const auth = getAuth();

    const isLoggedIn = !!auth.currentUser;

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
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

