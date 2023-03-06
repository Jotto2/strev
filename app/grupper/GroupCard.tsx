import React from "react";

export default function GroupCard({ group }: any) {
  return (
    <div className="mx-auto p-3 m-4 bg-salmon">
      <h1>{group.Title}</h1>
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
