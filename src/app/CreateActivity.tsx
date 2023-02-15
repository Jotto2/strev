import next from "next";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";

const CreateActivity = () => {
  const handleSubmit = () => {
    //Her for å submitte form
  };

  const [exerciseList, setExerciseList] = useState([{ exercise: "" }]);

  const handleExerciseAdd = () => {
    setExerciseList([...exerciseList, { exercise: "" }]);
  };

  const handleExerciseRemove = (index: number) => {
    const list = [...exerciseList];
    list.splice(index, 1);
    setExerciseList(list);
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl p-4">
        <h2 className="text-lg pt-4 mb-3">Opprett treningsprogram</h2>
        <form action="#" method="POST" className="">
          <label className="w-10">
            <input
              className="mb-4 pl-4 h-8 w-full bg-background rounded-md"
              type="text"
              name="title"
              placeholder="Tittel"
            />
          </label>

          <div className="col-span-6 sm:col-span-3 mb-4">
            <select
              id="category"
              name="category"
              value="Test"
              defaultValue={"default"}
              autoComplete="Velg treningstype"
              className="text-darkblue px-3 h-8 w-full bg-background rounded-md"
              placeholder="Kategori"
            >
              <option value={"default"}>Velg treningstype</option>
              <option>Styrke</option>
              <option>Cardio</option>
              <option>Bevegelse</option>
            </select>
          </div>

          <label className="w-10 mb-4">
            <textarea
              className="pl-4 pt-2 h-16 w-full bg-background rounded-md"
              rows={3}
              name="title"
              placeholder="Beskrivelse"
            />
          </label>

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
              <span className="pl-4">Last opp bilde</span>

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

          <label className="">Dager</label>
          <div className="pt-3">
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" value="" className="sr-only peer"></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Mandag
              </span>
            </label>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" value="" className="sr-only peer"></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Tirsdag
              </span>
            </label>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" value="" className="sr-only peer"></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Onsdag
              </span>
            </label>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" value="" className="sr-only peer"></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Torsdag
              </span>
            </label>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" value="" className="sr-only peer"></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Fredag
              </span>
            </label>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" value="" className="sr-only peer"></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Lørdag
              </span>
            </label>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" value="" className="sr-only peer"></input>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Søndag
              </span>
            </label>
          </div>

          {exerciseList.map((singleExercise, index) => (
            <div key={index}>
              <div className="flex justify-between pr-5">
                <label className=" mb-3">Øvelse</label>

                {exerciseList.length > 1 && (
                  <button
                    className=""
                    onClick={() => handleExerciseRemove(index)}
                  >
                    <div className="">
                      <img src="./Trash.png" className="h-5"></img>
                    </div>
                  </button>
                )}
              </div>
              <label className="w-10 ">
                <input
                  className=" mb-4 pl-4 h-8 w-full bg-background rounded-md"
                  type="text"
                  name="title"
                  placeholder="Tittel"
                />
              </label>
              {/*Her må noen lage validering for å kun ta inn tall*/}
              <label className="w-10 ">
                <input
                  className="mb-4 pl-4 h-8 w-full bg-background rounded-md"
                  type="text"
                  name="title"
                  placeholder="Antall Sett"
                />
              </label>
              <label className="w-10 ">
                <input
                  className="mb-4 pl-4 h-8 w-full bg-background rounded-md"
                  type="text"
                  name="title"
                  placeholder="Repetisjoner per sett"
                />
              </label>
              <label className="w-10 ">
                <input
                  className="mb-4 pl-4 h-8 w-full bg-background rounded-md"
                  type="text"
                  name="title"
                  placeholder="Vekt per repetisjon"
                />
              </label>

              {exerciseList.length - 1 === index &&
                exerciseList.length < 15 && (
                  <button
                    onClick={handleExerciseAdd}
                    className="bg-salmon mb-4 text-white text-md text-left rounded-md w-full p-1  inline-flex items-center"
                  >
                    <span className=" pl-3">Legg til øvelse</span>
                    <div className="ml-auto pr-3">
                      <img src="./AddButton.png" className="h-8"></img>
                    </div>
                  </button>
                )}
            </div>
          ))}

          <label className="relative inline-flex items-center cursor-pointer mb-4">
            <input type="checkbox" value="" className="sr-only peer"></input>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:salmon rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-salmon"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Offentlig innlegg
            </span>
          </label>

          <button
            className="bg-salmon text-white text-md rounded-md w-full p-2 "
            onClick={handleSubmit}
          >
            Opprett aktivitet
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
