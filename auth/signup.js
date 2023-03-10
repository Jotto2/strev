import firebase_app from "lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();

export default async function signUp() {
  let result = null,
    error = null;
  const provider = new GoogleAuthProvider();
  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
