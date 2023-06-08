import Button from "./Button";
import { DirectMessageItems } from "./DirectMessageItem";
import React from "react";
import { FaPlus } from "react-icons/fa";


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
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
          onClick={onAddUser}
        >
          <FaPlus />
        </button>
      </div>
      <DirectMessageItems />
    </div>
  );
};

export default DirectMessageSection;
