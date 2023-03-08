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
    <div className="rounded-2xl bg-white max-w-md mx-auto border-8 border-white shadow-lg">
        <img src={imageURL} alt="" />  
      <h1>*BILDE HER*</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h3 className="text-black text-xl -mt-2 truncate">{title}</h3>
      <div className="text-black text-md truncate">{description}</div>
      <div className="grid grid-cols-2 gap-4 p-3">
        <button
          className="btn text-sm text-white bg-purple rounded-full py-1.5"
          onClick={() => {
            window.location.href = `grupper/${group.id}`;
          }}
    >
          Se gruppen
        </button>
        <div className="flex items-center text-lightgrey text-sm">
          <img src="./Vector.png" className="h-3 mr-2" alt="Vector"></img>
          {followedBy.length > 0 ? (
            <div>{followedBy.length}</div>
          ) : (
            <div>Inviter medlemmer</div>
          )}
        </div>
  </div>



    </div>
  );
}
