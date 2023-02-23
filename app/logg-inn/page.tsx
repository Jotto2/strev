"use client";
import React from "react";
import { useRouter } from "next/navigation";
import signUp from "auth/signup";
import { FcGoogle } from "react-icons/fc";

function Page() {
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp();

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="h-screen mx-auto relative">
      <img
        src="./welcome.jpg"
        className="absolute w-full h-full object-cover"
      />
      <div className="max-w-md h-screen mx-auto relative pt-24">
        <div className="text-salmon text-9xl font-nunito font-bold italic text-center">
          Strev
        </div>
        
        <div className="absolute bottom-0 w-full mb-52 px-5">
          <div className="bg-salmon h-10 w-full flex text-white justify-center items-center rounded-md text-lato font-semibold mb-5 drop-shadow-box cursor-pointer hover:bg-darksalmon duration-200">
          <form onSubmit={handleForm} className="form">
  <button className="px-30 py-5" type="submit">Logg inn med Google</button>
</form>
            
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;


