import React, {useState} from "react";

const NewDirectMessageForm: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`New direct message form submitted with username: ${username}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username..."
      />
      <button type="submit">Send Direct Message</button>
    </form>
  );
};

export default NewDirectMessageForm;
