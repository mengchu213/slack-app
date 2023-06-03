import React, {useEffect, useState} from "react";
import ChannelItem from "./ChannelItem";

interface ChannelSectionProps {
  onAddChannel: () => void;
  channels: {id: string; name: string}[];
  setChannels: React.Dispatch<
    React.SetStateAction<{id: string; name: string}[]>
  >;
}

const ChannelSection: React.FC<ChannelSectionProps> = ({
  onAddChannel,
  channels,
  setChannels,
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
        <h2 className="font-semibold">Channels.</h2>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
          onClick={onAddChannel}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      {channels.map((channel) => (
        <ChannelItem key={channel.id} name={channel.name} />
      ))}
    </div>
  );
};

export default ChannelSection;
