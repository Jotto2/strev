import React, { useEffect } from "react";

export default function GroupCard({ group }: any) {
  const {
    id,
    title,
    category,
    followers,
    description,
    createdBy,
    imageURL,
    madeByName,
    followedBy,
    isPublic,
    imgUrl,
  } = group;

  return (
    <div className="rounded-2xl bg-white max-w-md mx-auto p-4 drop-shadow-box mt-10">
      <div className="rounded-xl w-full h-40 bg-[url('/inspect-placeholder.jpg')] bg-center bg-cover"></div>
      <h3 className="text-black text-xl mt-2 truncate font-nunito">{title}</h3>
      <div className="text-black text-md truncate font-lato">{description}</div>
      <div className="grid grid-cols-2 gap-4 pt-3">
        <button
          className="btn text-sm text-white bg-purple rounded-full py-1.5 hover:bg-darkpurple duration-200"
          onClick={() => {
            window.location.href = `grupper/${group.id}`;
          }}
        >
          Se gruppen
        </button>
        <div className="flex items-center text-lightgrey text-sm">
          <img src="./Vector.png" className="h-3 mr-2" alt="Vector"></img>
          {followedBy.length > 0 ? (
            <div>
              {followedBy.length}
              {followedBy.length === 1 ? " medlem" : " medlemmer"}
            </div>
          ) : (
            <div>Inviter medlemmer</div>
          )}
        </div>
      </div>
    </div>
  );
}
