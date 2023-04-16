import React, { useState } from "react";
import { MOODS } from "..";
import EditModal from "./EditModal";

export const Post = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const item = props.item;
  const data = props.data;
  return (
    <div className="flex flex-col outline outline-2 rounded-xl p-2 bg-white shadow-2xl mb-4">
      <div className="flex flex-row item items-center">
        <picture>
          <img
            src={item.author.image as string | undefined}
            className="rounded-full h-12 w-14 object-cover"
            alt="profile photo"
          />
        </picture>
        <div
          className="rounded-full w-full flex flex-col items-center ml-2"
          onClick={() => console.log(item)}
        >
          <h1 className=" font-semibold">
            {item.author.name} had a {MOODS[item.mood].text} day
          </h1>
          <h1>{new Date(item.createdAt).toDateString()}</h1>
        </div>
        <div className="w-12 h-12">{MOODS[item.mood].svg}</div>
      </div>
      <div className="text-ellipsis overflow-hidden">
        <p className="font-semibold">Summary: </p>
        <p>{item.content}</p>
        {item.author.name === data.user?.name && (
          <div className="text-right text-gray-500 hover:font-semibold">
            <button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              (edit)
            </button>
          </div>
        )}
      </div>
      <EditModal isOpen={isModalOpen} setIsOpen={setModalOpen} post={item} />
    </div>
  );
};
