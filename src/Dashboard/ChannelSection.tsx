import React from "react";
import { ChannelItem } from "./ChannelItem";
import { FaPlus } from "react-icons/fa";
import { GetUserChannelButton } from "./getUsersChannel";
interface ChannelSectionProps {
  onAddChannel: () => void;
}

const ChannelSection: React.FC<ChannelSectionProps> = ({ onAddChannel }) => {

  return (
    <div>
      <div className="px-5 py-3 grid grid-cols-4 gap-4 border-b">
        <h2 className="col-span-2 font-semibold">Channels</h2>
        <div className="col-span-1">
          <GetUserChannelButton />
        </div>
        <button
          className="col-span-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 w-9 h-9"
          onClick={onAddChannel}
        >
          <FaPlus />
        </button>
      </div>
      <ChannelItem />
    </div>
  );
};

export default ChannelSection;
