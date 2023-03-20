"use client";
import Navbar from "components/Navbar";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import GroupCard from "@/grupper/GroupCard";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firestoreDB, storage } from "lib/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { group } from "console";

export default function CreatePost(id: string) {
  const router = useRouter();
  //const [title, setTitle] = useState("");


  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const handleChange = (e) => {
    const value = e.target.value;
    const count = value.length > 100 ? 100 : value.length; // Limit to max 100 characters
    setText(value.slice(0, 100)); // Limit to max 100 characters
    setCharCount(count);
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const [imgUrl, setImgUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [imageAsFile, setImageAsFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleFileInputChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function updateURL(url: any) {
    console.log(url.toString());
    setImageAsFile(url);
  }

  const create = async (e) => {
    e.preventDefault();
    setLoader(true);
    const file = selectedFile;

    console.log(file);

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      console.log("uploader");
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const downURL = await getDownloadURL(uploadTask.ref)
      await updateURL(downURL);

    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       const progress = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       );
    //       setProgresspercent(progress);
    //     },
    //     (error) => {
    //       alert(error);
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setImgUrl(downloadURL);
    //         console.log("File available at", downloadURL);
    //       });
    //     }
    //   );
      //const results = await Promise.all([uploadTask,downURL, updateURL]);
      await timeout(1000);
      
    } catch (error) {
      console.log(error);
    }

    console.log("lastet opp ferdig ", { imageAsFile });
      const docRef = await addDoc(collection(firestoreDB, "posts"), {
        comments:{},
        createdByEmail: user.email,
        createdByName: user.displayName,
        createdByImage: user.photoURL,
        date: new Date(),
        groupID:"",
        likedBy:[],
        text: "",
        
        
      });
      console.log("pusher");
      router.push("/grupper");
  };

  return (
    <div>
      <Navbar activeProp={3} />
      {loader ? (
        <div>Oppretter innlegget...</div>
      ) : (
        <div className="w-full max-w-md mx-auto mt-10 mb-10 bg-background px-4 pb-4">
          <button onClick={() => window.history.back()}>
          <div className="flex items-center btn mt-10 text-sm text-lightgrey bg-white rounded-full">
                <img src="./Vector.svg" className="h-4 "  alt="Vector"></img>
              </div>
              </button>
              <br></br>
              <br></br>    
          <div className="rounded-xl bg-white p-4 ">
          <h2 className="text-xl pt-4 mb-3">Legg ut innlegg</h2>
        <form onSubmit={create}>
          
          <div>
            {selectedImage && (
              <div className="">
                <img
                  className="w-full max-h-60 object-cover rounded-lg"
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                
                />
                <div className="flex justify-center">
                  <button
                    className="text-center text-salmon p-3"
                    onClick={() => setSelectedImage(null)}
                  >
                    Fjern bilde
                  </button>
                </div>
              </div>
            )}

            <label
              htmlFor="file-upload"
              className=" mb-4 py-3 relative cursor-pointer bg-salmon text-white text-md text-left rounded-md w-full inline-flex items-center"
            >
              <span className="pl-4">Last opp forsidebilde</span>

              <input
                id="file-upload"
                name="myImage"
                type="file"
                className="sr-only"
                onChange={(event) => {
                  if (!event.target.files) return;
                  setSelectedImage(event.target.files[0]);
                }}
              />
              <div className="ml-auto pr-5">
                <img src="./Upload.png" className="h-4"></img>
              </div>
            </label>
          </div>

        <div className="bg-salmon text-white  text-md text-center rounded-md w-full p-2 drop-shadow-box">
          <button
            className=""
            type="submit"
          >
            Velg treningsprogram
          </button>
          
          </div>
          <br></br>
          <label className="w-10 h-10">
      <textarea
        className="mb-4 pl-4 w-full resize-y bg-background rounded-md" 
        name="text"
        placeholder="Tekst"
        onChange={handleChange}
        value={text}
      />
      <div className="text-right  text-lightgrey text-xs">{charCount}/100</div>
    </label>

          {/* <textarea
            // allows you to reach into your file directory and upload image to the browser
            type="file"
            onChange={handleFileInputChange}
          /> */}
          <button
            className="bg-salmon text-white rounded-md w-full p-2 drop-shadow-box"
            type="submit"
          >
            Publiser
          </button>
        </form>
        </div>
        </div>
      )}
    </div>
  );
}