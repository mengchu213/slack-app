import React, {useEffect, useState} from "react";
import ChannelItem from "./ChannelItem";
import {FaPlus} from "react-icons/fa";
interface ChannelSectionProps {
  onAddChannel: () => void;
  channels: Array<{id: number; name: string}>;
  setChannels: React.Dispatch<
    React.SetStateAction<Array<{id: number; name: string}>>
  >;
  setSelectedChannel: React.Dispatch<
    React.SetStateAction<{id: number; name: string} | null>
  >;
  handleDeleteChannel: (id: number) => void;
}

const ChannelSection: React.FC<ChannelSectionProps> = ({
  onAddChannel,
  channels,
  setChannels,
  setSelectedChannel,
  handleDeleteChannel,
}) => {
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const storedChannels = JSON.parse(
        localStorage.getItem(`${currentUser}.channelLists`) || "[]"
      );
      setChannels(storedChannels);
    }
  }, [setChannels]);

  return (
    <div>
      <div className="px-5 py-3 flex justify-between items-center">
        <h2 className="font-semibold">Channels</h2>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
          onClick={onAddChannel}
        >
          <FaPlus />
        </button>
      </div>

      {channels.filter(Boolean).map((channel: {id: number; name: string}) => {
        console.log("Rendering channel: ", channel);
        return (
          <ChannelItem
            key={channel.id}
            id={channel.id}
            name={channel.name}
            setSelectedChannel={setSelectedChannel}
            handleDeleteChannel={handleDeleteChannel}
          />
        );
      })}
    </div>
  );
};

export default ChannelSection;
