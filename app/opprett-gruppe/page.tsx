"use client";
import Navbar from "components/Navbar";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firestoreDB, storage } from "lib/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateGroup() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const [imgUrl, setImgUrl] = useState('');
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
      const docRef = await addDoc(collection(firestoreDB, "groups"), {
        title: title,
        description: desc,
        imgUrl: imageAsFile,
        createdBy: user.uid,
        createdAt: new Date(),
        userImageURL: user.photoURL,
        madeByName: user.displayName,
        followedBy: [],
      });
      console.log("pusher");
      router.push("/grupper");
  };

  return (
    <div>
      <Navbar activeProp={3} />
      <h1>Opprett gruppe</h1>
      {loader ? (
        <div>Oppretter gruppen...</div>
      ) : (
        <form onSubmit={create}>
          <p>Tittel</p>
          <label className="w-10">
            <input
              className="mb-4 pl-4 h-8 w-full bg-background rounded-md"
              type="text"
              name="title"
              placeholder="Tittel"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <p>Beskrivelse</p>
          <label className="w-10">
            <input
              className="mb-4 pl-4 h-8 w-full bg-background rounded-md"
              type="text"
              name="desc"
              placeholder="Beskrivelse"
              onChange={(e) => setDesc(e.target.value)}
            />
          </label>
          <input
            // allows you to reach into your file directory and upload image to the browser
            type="file"
            onChange={handleFileInputChange}
          />
          <button
            className="bg-salmon text-white text-md rounded-md w-full p-2 "
            type="submit"
          >
            Opprett aktivitet
          </button>
        </form>
      )}
    </div>
  );
}