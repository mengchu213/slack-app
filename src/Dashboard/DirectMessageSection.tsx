import {FaPlus} from "react-icons/fa";

const DirectMessageSection = () => {
  return (
    <div>
      <div className="px-5 py-3 flex justify-between items-center">
        <h2 className="font-semibold">Direct Messages</h2>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 ">
          <FaPlus />
        </button>
      </div>
      <div className="px-5 py-1 hover:bg-gray-600 cursor-pointer">
        User Name
      </div>
      {}
    </div>
  );
};

export default DirectMessageSection;
