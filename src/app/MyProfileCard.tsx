import Cropper from 'react-easy-crop';
import { useState, useCallback, useContext } from "react";
import { UserContext } from "../lib/context";
import Image from "next/image";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfileCard = () => {
  const { user, username } = useContext(UserContext); // vet ikke hvordan dette funker enda

  const [editMode, setEditMode] = useState(false);
  const [profileUsername, setProfileUsername] = useState('andersro'); // TODO hent inn brukernavn fra backend
  const [profileFullName, setprofileFullName] = useState('Anders Rodem'); // TODO hent inn fullt navn fra backend

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // CROPPING FUNKSJON
  /*const [crop, setCrop] = useState({ x: 0, y: 0 });
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const [zoom, setZoom] = useState(1);
  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };*/

  const handleEditProfile = () => {
    setSelectedImage(null);
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    Math.random() < 0.5 ? toast.success('Endringer lagret', {}) : toast.error('Endringer ikke lagret', {});
    setEditMode(false);
    // TODO perform logic to save the edited profile data
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // TODO perform logic to reset the profile data to its original state
  };

  return (
    <div className="rounded-2xl bg-white max-w-md mx-auto p-6 mt-32 drop-shadow-box">
      {editMode ? (
        <div> {/* EDIT PROFILE */}
          <div>
            {selectedImage ? (
              <div>
                {/*
                CROP IMAGE
                <Cropper
                  image={URL.createObjectURL(selectedImage)}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  onCropChange={onCropChange}
                  onZoomChange={onZoomChange}
                />*/}
                <Image
                  className='w-40 h-40 mx-auto relative rounded-full -mt-20'
                  src={URL.createObjectURL(selectedImage)}
                  height={160}
                  width={160}
                  alt={''}
                  loading="lazy"
                />
                <div className="flex justify-center">
                  <button
                    className="text-center text-salmon pt-3 hover:text-darksalmon duration-100"
                    onClick={() => setSelectedImage(null)}
                  >
                    Fjern bilde
                  </button>
                </div>
              </div>
            ) : (
              <Image
                className='w-40 h-40 mx-auto relative rounded-full -mt-20'
                src={'/avatar.png'}
                height={160}
                width={160}
                alt={''}
                loading="lazy"
              />
            )
          }

            <label
              htmlFor="file-upload"
              className=" mb-4 py-3 relative text-base cursor-pointer bg-salmon text-white text-left rounded-md w-full inline-flex items-center mt-8 drop-shadow-box hover:bg-darksalmon duration-100"
            >
              <span className="pl-4">Last opp bilde</span>

              <input
                id="file-upload"
                name="myImage"
                type="file"
                className="sr-only"
                // TODO: Bug: When selecting the same image twice, the onChange event is not triggered
                onChange={(event) => {
                  if (!event.target.files) return;
                  setSelectedImage(event.target.files[0]);
                }}
              />
              <div className="ml-auto pr-5">
                <Image
                  className='w-4 h-4'
                  src={'/Upload.png'}
                  height={16}
                  width={16}
                  alt={''}
                  loading="lazy"
                />
              </div>
            </label>
          </div>
          <div className="mb-5">
            <span className="text-xl text-lightgrey font-bold block">Brukernavn</span>
            <input
              className="text-lg font-normal text-darkgrey bg-background rounded-xl p-3 w-full outline-none"
              type="text"
              defaultValue={profileUsername}
            />{/* TODO placeholder={username} */}
          </div>
          <div className="mb-5">
            <span className="text-xl text-lightgrey font-bold block">Fullt navn</span>
            <input
              className="text-lg font-normal text-darkgrey bg-background rounded-xl p-3 w-full outline-none"
              type="text"
              defaultValue={profileFullName}
              />{/* TODO placeholder={fullt navn} */}
          </div>
          <div className="flex justify-center space-x-2">
            <button
              className="bg-white text-salmon text-base rounded-md w-full p-2 border border-salmon drop-shadow-box hover:bg-background duration-100"
              onClick={handleCancelEdit}
            >
              Avbryt
            </button>
            <button
              className="bg-salmon text-white text-base rounded-md w-full p-2 drop-shadow-box hover:bg-darksalmon duration-100"
              onClick={handleSaveProfile}
            >
              Lagre endringer
            </button>
          </div>
        </div>
      ) : (
        <div> {/* PROFILE */}
          <Image
            className='w-40 h-40 mx-auto relative rounded-full -mt-20'
            src={'/avatar.png'}
            height={160}
            width={160}
            alt={''}
            loading="lazy"
          />
          <div className="mb-5 mt-8">
            <span className="text-xl text-lightgrey font-bold block">Brukernavn</span>
            <span className="text-2xl text-darkgrey">@{profileUsername}</span> {/* TODO logikk */}
          </div>
          <div className="mb-5">
            <span className="text-xl text-lightgrey font-bold block">Fullt navn</span>
            <span className="text-2xl text-darkgrey">{profileFullName}</span> {/* TODO logikk */}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-salmon text-white text-base rounded-md w-full p-2 drop-shadow-box hover:bg-darksalmon duration-100"
              onClick={handleEditProfile}
            >
              Rediger profil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfileCard;
