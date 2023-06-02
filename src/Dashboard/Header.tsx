import React from "react";
import SearchBar from "./SearchBar";
import {ReactComponent as Logo} from "../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__left">
        {}
        <Logo className="w-[266] h-[73]" />
      </div>
      <div className="header__center">
        <SearchBar />
      </div>
      <div className="header__right">
        {}
        <p>User Name</p>
      </div>
    </header>
  );
};

export default Header;
