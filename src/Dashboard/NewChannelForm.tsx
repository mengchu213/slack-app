import React, {useState} from "react";

const NewChannelForm: React.FC = () => {
  const [channelName, setChannelName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`New channel form submitted with name: ${channelName}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <input
        type="text"
        value={channelName}
        onChange={(event) => setChannelName(event.target.value)}
        placeholder="Enter channel name..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mr-10 w-full p-2.5 flex justify-center items-center"
      />
      <button
        type="submit"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Create Channel
      </button>
    </form>
  );
};

export default NewChannelForm;
