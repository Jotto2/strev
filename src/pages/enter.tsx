import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { useNavigate } from "react-router-dom";
import Router, { useRouter } from "next/router";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return <main>{user ? <SignOutButton /> : <SignInButton />}</main>;
}

// Sign in with Google button
function SignInButton() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
     router.push("/");
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={"/google.png"} width="30px" /> Sign in with Google
      </button>
      {/* <button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button> */}
    </>
  );
}

// Sign out button
export function SignOutButton() {

  const router = useRouter();

  const signOut = async () => {
    auth.signOut();
    router.push("/enter")
  }

  return (
  <button onClick={signOut}>Sign Out</button>
  )
  
}

function UsernameForm() {
  return null;
}
