import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "lib/firebase";
import { useEffect, useRef, useState } from "react";

function convertToDate(nanoseconds: number, seconds: number): Date {
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
  return new Date(milliseconds);
}

export type Progression = {
  title: string,
  description: string,
  unit: string,
  createdBy: string,
  progression: ProgressionItem[],
}

export type ProgressionItem = {
  date: Date;
  amount: number;
}

async function getUsersProgressions(documentId: string) {
  const progressionCollection = collection(firestoreDB, "progressions");
  const progressionDocument = doc(progressionCollection, documentId);
  const documentSnapshot = await getDoc(progressionDocument);

  return documentSnapshot.data() as Progression;
}

export default function ProgressionCard(props: { id: string }) {

  const [document, setDocument] = useState<Progression>({} as Progression);

  const inputRef = useRef(null)
  const docRef = doc(firestoreDB, "progressions", props.id);

  useEffect(() => {
    async function fetchData() {
      const result = await getUsersProgressions(props.id);
      setDocument(result);
    }
    fetchData();
  }, [document]); //TODO fjern document og sjekk hvorfor setDocument i handleAddProgression ikke funker uten. noe feil med Date()?

  async function handleAddProgression() {
    event.preventDefault();

    if (inputRef.current.value === "") {
      return;
    }

    setDocument(
      {
        ...document,
        progression: [...document.progression, {
          date: new Date(),
          amount: inputRef.current.value as number,
        }]
      }
    )
    await updateDoc(docRef, {
      progression: [...document.progression, {
        date: new Date(),
        amount: inputRef.current.value as number,
      }]
    });

    inputRef.current.value = "";
  }

  return (
    <div className="bg-white rounded-xl drop-shadow-box p-4 mt-10">
      <div className="font-bold font-nunito text-2xl">
        {document.title}
      </div>
      <div className="font-lato text-darkgrey">
        {document.description}
      </div>
      {
        document.progression?.length > 0 ? (
          <div className="border-lightgrey border-b-[0.5px] border-t-[0.5px] pb-5 mt-5 max-h-56 overflow-auto">
            {
              document.progression?.map((p, index) => {
                return (
                  <div key={index} className="flex items-baseline gap-2 mt-2">
                    <div className="text-2xl font-semibold">
                      {p.amount}<span className="text-xl">{document.unit}</span>
                    </div>
                    <div className="text-darkgrey">
                      {
                        convertToDate(p.date.nanoseconds, p.date.seconds).toLocaleDateString("no-NO")
                      }
                    </div>
                  </div>
                )
              })
            }

          </div>
        ) : null
      }
      <form onSubmit={handleAddProgression} className="flex justify-between gap-5 mt-5">
        <input
          className="bg-background rounded-xl outline-none p-3 font-lato font-normal border-[1px] border-darkgrey w-full"
          type="number"
          placeholder="Ny progresjon..."
          ref={inputRef}
        />
        <button type="submit" className="bg-salmon hover:bg-darksalmon duration-200 rounded-xl text-white w-32" >Legg til </button>
      </form>
    </div>
  )
}
