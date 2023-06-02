import React from "react";
import SearchBar from "./SearchBar";
import {ReactComponent as Logo} from "../assets/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__left">
        {/* You can use the logo component here */}
        <Logo className="w-[266] h-[73]" />
      </div>
      <div className="header__center">
        <SearchBar />
      </div>
      <div className="header__right">
        {/* This could contain user profile information or settings */}
        <p>User Name</p>
      </div>
    </header>
  );
};

export default Header;
