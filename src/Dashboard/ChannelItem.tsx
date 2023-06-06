import React, {useState, useEffect, useRef} from "react";

interface ChannelItemProps {
  id: string;
  name: string;
  setSelectedChannel: React.Dispatch<
    React.SetStateAction<{id: number; name: string} | null>
  >;
  handleDeleteChannel: (id: string) => void;
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
      onClick={() => setSelectedChannel({id: parseInt(id), name})} // Note the change here
    >
      <h3 className="font-medium text-sm">{name}</h3>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-8 h-8 items-center rounded-lg border text-sm font-medium text-gray-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="options-menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
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
