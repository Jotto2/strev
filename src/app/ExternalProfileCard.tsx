import { useState} from "react";
import { UserContext } from "../lib/context";
import Image from "next/image";

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const ExternalProfileCard = () => {
  // const { user, username } = useContext(UserContext); // vet ikke hvordan dette funker enda

  const [isFollowing, setIsFollowing] = useState(false); // TODO hent inn fra backend

  const username = 'torgeirsmed'; // TODO hent inn fra backend
  const fullName = 'Torgeir Smedegod'; // TODO hent inn fra backend

  const handleFollow = () => {
    // TODO logikk
    setIsFollowing(true);
    toast.success('Du følger nå ' + fullName, {});
  };

  const handleUnfollow = () => {
    // TODO logikk
    setIsFollowing(false);
    toast.success('Du har sluttet å følge ' + fullName, {});
  };

  return (
    <div className="rounded-2xl bg-white max-w-md mx-auto p-6 mt-32 drop-shadow-box">
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
          <span className="text-2xl text-darkgrey">@{username}</span> {/* TODO logikk */}
        </div>
        <div className="mb-5">
          <span className="text-xl text-lightgrey font-bold block">Fullt navn</span>
          <span className="text-2xl text-darkgrey">{fullName}</span> {/* TODO logikk */}
        </div>
        <div className="flex justify-center">
          {
            isFollowing ?
              <button
                className="bg-background text-dark text-base rounded-md w-full p-2 hover:bg-darksalmon duration-100"
                onClick={handleUnfollow}
              >
                Følger
              </button>
              :
              <button
                className="bg-salmon text-white text-base rounded-md w-full p-2 drop-shadow-box hover:bg-darksalmon duration-100"
                onClick={handleFollow}
              >
                Følg
              </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ExternalProfileCard;
