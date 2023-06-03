// Header.tsx
import React from "react";
import SearchBar from "./SearchBar";
import {ReactComponent as Logo} from "../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-gray-800 px-4 py-2 border-b border-gray-200">
      <div className="header__left">
        <Logo className="w-8 h-8" />
      </div>
      <div className="header__center">
        <SearchBar />
      </div>
      <div className="header__right">
        <p className="text-white">Michael Langdon</p>
      </div>
    </header>
  );
};

export default Header;
