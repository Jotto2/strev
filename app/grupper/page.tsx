'use client'
import Navbar from "components/Navbar";
import { useState, useCallback } from "react";
const Groups = () => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleCreateNewGroup = () => {
    setEditMode(true);
  };
  const handleCreateGroup = () => {
    const group = { title, description, selectedImage };
    setEditMode(false);
    setTitle('');
    setDescription('');
    setSelectedImage(null);
  };
  const handleCancelEdit = () => {
    setEditMode(false);
    // TODO perform logic to reset the profile data to its original state
  };
  const [value, setValue] = useState('')
  const handleChange = (event) => {
    const shouldSetValue = value.length < 100
        if (shouldSetValue) setValue(event.target.value)
  }
  return (
    <div>
    <div className="rounded-2xl bg-white max-w-md mx-auto p-6  drop-shadow-box">
          
      {editMode ? (
        <div className="bg-salm p-5 mb-5">
          <div>
          <button>
          <div className="flex items-center btn text-sm text-lightgrey bg-white rounded-full "
            onClick={handleCancelEdit}>
                <img src="./Vector-pil.png" className="h-3 mr-2" alt="Vector"></img>
              </div>
              </button>
        <div className="h-10 text-xl">Opprett gruppe</div>
          <div className="mb-5">
            <input
              className="text-lg font-normal text-darkgrey bg-background rounded-xl p-3 w-full"
              placeholder='Tittel'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
    {selectedImage && (
        <div>
            <img
            className=" mx-auto relative rounded-xl"
            //legg inn value her
            src={URL.createObjectURL(selectedImage)}
            />
            <div className="flex justify-center">
            <button
                className="text-center text-salmon p-3"
                onClick={() => setSelectedImage(null)}>Fjern bilde
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
              key={selectedImage?.name}
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
          <label className="w-10 mb-4">
            <textarea
              className="pl-4 pt-2 h-16 w-full bg-background rounded-md"
              rows={3}
              name="title"
              placeholder="Beskrivelse"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="flex justify-center space-x-2">
            <button
              className="bg-salmon text-white text-base rounded-md w-full p-2 drop-shadow-box"
              onClick={handleCreateGroup}> Opprett gruppe
            </button>
          </div>
        </div>
      ) : (
      <><div className="rounded-t-lg bg-white mt-10">
            <button
              onClick={handleCreateNewGroup}
              className="bg-salmon mb-4 text-white text-md text-left rounded-2xl w-full p-1 py-5 inline-flex items-center"
            >
              <span className=" pl-5 text-xl">Lag en ny gruppe</span>
              <div className="ml-auto pr-3">
                <img src="./AddButton.png" className="h-8"></img>
              </div>
            </button>
            <div className="ml-2 text-black text-xl">Mine grupper</div>
          </div>
          <div className="rounded-2xl bg-white max-w-md mx-auto border-8 border-white shadow-lg">
              <div className="grid grid-cols-2 pt-3 pb-2 px-3">
                <div className="flex justify-end">
                </div>
              </div>
              <div className="">
                <img
                  className="rounded-lg"
                  src="./mountain.png"
                  alt="Mountain"
                ></img>
              </div>
              <div className="my-4">
                <div className="bg-white pl-5">
                  <h3 className="text-black text-xl -mt-2 truncate">
                    Gruppeaktivitet
                  </h3>
                  <p className="text-black text-md truncate" // fiks word break
                  >
                    Beskrivelse av gruppeaktivitet: Vi som trenger å trene oss opp til topptur!
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-3">
                <button className="btn text-sm text-white bg-purple rounded-full py-1.5">
                  Se gruppen
                </button>
                  <div className="flex items-center text-lightgrey text-sm">
                    <img src="./Vector.png" className="h-3 mr-2" alt="Vector"></img>
                    <div>Inviter medlemmer</div>
                  </div>
              </div>
            </div></>
      )}
    </div>
    <Navbar activeProp={3} />
    </div>
  );
};
export default Groups;