import Button from "./Button";
import { DirectMessageItems } from "./DirectMessageItem";
import React from "react";


interface DirectMessageSection {
  onAddUser: () => void;
}

const DirectMessageSection: React.FC<DirectMessageSection> = ({ onAddUser }) => {
  return (
    <div>
      <div className="px-5 py-3 flex justify-between items-center">
        <h2 className="font-semibold">Direct Messages</h2>
        <Button />
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
          onClick={onAddUser}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            ></path>
          </svg>
        </button>
      </div>
      <DirectMessageItems />
    </div>
  );
};

export default DirectMessageSection;
