import Cropper from 'react-easy-crop';
import { useState, useCallback } from "react";

const ProfileCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("Brukernavn");
  const [fullName, setFullName] = useState("Fullt navn");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const [zoom, setZoom] = useState(1);
  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // TODO perform logic to save the edited profile data
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // TODO perform logic to reset the profile data to its original state
  };

  return (
    <div className="rounded-2xl bg-white max-w-md mx-auto p-6 mt-20 drop-shadow-box">
      {editMode ? (
        <div className="mb-5"> {/* EDIT PROFILE */}
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
                <img
                  className="w-40 h-40 mx-auto relative -top-16 rounded-full"
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
            ) : (
              <img
                className="w-40 mx-auto relative -top-16 rounded-full"
                src="./avatar.png" // TODO: Replace with user's profile picture
              />
            )
          }

            <label
              htmlFor="file-upload"
              className=" mb-4 py-3 relative cursor-pointer bg-salmon text-white text-md text-left rounded-md w-full inline-flex items-center"
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
                <img src="./Upload.png" className="h-4"></img>
              </div>
            </label>
          </div>
          <div className="mb-5">
            <span className="text-xl text-lightgrey font-bold block">Brukernavn</span>
            <input
              className="text-lg font-normal text-darkgrey bg-background rounded-xl p-3 w-full"
              type="text"
            />{/* TODO placeholder={username} */}
          </div>
          <div className="mb-5">
            <span className="text-xl text-lightgrey font-bold block">Fullt navn</span>
            <input
              className="text-lg font-normal text-darkgrey bg-background rounded-xl p-3 w-full"
              type="text"
              />{/* TODO placeholder={fullt navn} */}
          </div>
          <div className="flex justify-center space-x-2">
            <button
              className="bg-salmon text-white text-base rounded-md w-full p-2 drop-shadow-box"
              onClick={handleSaveProfile}
            >
              Lagre endringer
            </button>
            <button
              className="bg-white text-salmon text-base rounded-md w-full p-2 border border-salmon drop-shadow-box"
              onClick={handleCancelEdit}
            >
              Avbryt
            </button>
          </div>
        </div>
      ) : (
        <div> {/* PROFILE */}
          <img
            className="w-40 mx-auto relative -top-16 border-full"
            src="./avatar.png"
          />
          <div className="mb-5">
            <span className="text-xl text-lightgrey font-bold block">{username}</span>
            <span className="text-2xl text-darkgrey">@anders</span> {/* TODO logikk */}
          </div>
          <div className="mb-5">
            <span className="text-xl text-lightgrey font-bold block">{fullName}</span>
            <span className="text-2xl text-darkgrey">Anders blabla</span> {/* TODO logikk */}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-salmon text-white text-base rounded-md w-full p-2 drop-shadow-box"
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

export default ProfileCard;
