import React, {useState} from "react";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(`Searching for "${searchTerm}"`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar w-8 flex justify-center items-center "
    >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="searchbar__input bg-gray-700 rounded-xl py-1 px-10 "
      />
    </form>
  );
};

export default SearchBar;
