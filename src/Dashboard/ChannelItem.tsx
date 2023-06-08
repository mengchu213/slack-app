import React, {useState, useEffect, useRef} from "react";
import {FaCaretDown} from "react-icons/fa";

interface ChannelItemProps {
  id: number;
  name: string;
  setSelectedChannel: React.Dispatch<
    React.SetStateAction<{id: number; name: string} | null>
  >;
  handleDeleteChannel: (id: number) => void;
}

const ChannelItem: React.FC<ChannelItemProps> = ({
  id,
  name,
  setSelectedChannel,
  handleDeleteChannel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current?.contains(e.target as Node)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={node}
      className="flex justify-between items-center px-5 py-2 cursor-pointer hover:bg-gray-700"
      onClick={() => setSelectedChannel({id, name})}
    >
      <h3 className="font-medium text-sm">{name}</h3>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-8 h-8 items-center rounded-lg  text-sm font-medium text-gray-300  "
            id="options-menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <FaCaretDown />
          </button>
        </div>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                onClick={() => handleDeleteChannel(id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelItem;
