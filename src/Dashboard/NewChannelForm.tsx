import React, {useState} from "react";

const NewChannelForm: React.FC = () => {
  const [channelName, setChannelName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`New channel form submitted with name: ${channelName}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={channelName}
        onChange={(event) => setChannelName(event.target.value)}
        placeholder="Enter channel name..."
      />
      <button type="submit">Create Channel</button>
    </form>
  );
};

export default NewChannelForm;
