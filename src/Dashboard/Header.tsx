import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import {ReactComponent as Logo} from "../assets/logo.svg";

const Header: React.FC = () => {
  const currentUser: string | null = localStorage.getItem("uid");

  return (
    <header className="flex justify-between items-center bg-gray-800 px-4 py-2 border-b border-gray-200">
      <div className="header__left">
        <Logo className="w-4 h-4" />
      </div>
      <div className="header__center">
        <SearchBar />
      </div>
      <div className="header__right">
        <p className="text-white mr-24">{currentUser}</p>
      </div>
    </header>
  );
};

export default Header;
