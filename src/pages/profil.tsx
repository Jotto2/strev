import Navbar from '@/components/Navbar'
import MyProfileCard from '@/components/MyProfileCard'
import ExternalProfileCard from '@/components/ExternalProfileCard'
import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function profil() {
   const { user, username } = useContext(UserContext);
  return (
    <div>
      <MyProfileCard />
      {/* <ExternalProfileCard posts={posts}/> */}
      <Navbar activeProp={4} />
      
       {user && <SignOutButton />}
      
    </div>
  )
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}