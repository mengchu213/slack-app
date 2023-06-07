import React, {useState} from "react";

const NewDirectMessageForm: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`New direct message form submitted with username: ${username}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mr-10 w-full p-2.5 flex justify-center items-center"
      />
      <button
        type="submit"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Send Direct Message
      </button>
    </form>
  );
};

export default NewDirectMessageForm;
