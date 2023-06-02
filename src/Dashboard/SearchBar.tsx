import React, {useState} from "react";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement search logic
    console.log(`Searching for "${searchTerm}"`);
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className="searchbar__input"
      />
    </form>
  );
};

export default SearchBar;
