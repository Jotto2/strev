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
    <div className="mx-auto p-3 m-4 bg-salmon">
        <img src={imageURL} alt="" />  
      <h1>{title}</h1>
      <h1>{description}</h1>
      <h1>{followedBy.length}</h1>
      <h1></h1>
      <button
        className=""
        onClick={() => {
          window.location.href = `grupper/${group.id}`;
        }}
      >
        Trykk på meg
      </button>
    </div>
  );
}
