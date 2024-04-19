import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSearch,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "./NavItem";

import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/navbarSlice";
import Dropdown from "../Dropdown";
import Logo from "../Logo";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.navbar);
  const [isSeachOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)
  
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
   const handleCloseDropdown = (e) => {
     if (!dropdownRef.current.contains(e.target)) {
       setIsDropdownOpen(false);
     }
   };
   document.addEventListener("mousedown", handleCloseDropdown);

   return () => {
     document.removeEventListener("mousedown", handleCloseDropdown);
   };
 }, []);

  const loggedInDropdownOptions = [
    {
      title: "Profile",
      path: "/profile",
      icon: faUser,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: faCog,
    },
    {
      title: "Log Out",
      path: "/logout",
      icon: faUser,
    }
  ];

  const loggedOutDropdownOptions = [
    {
      title: "Login",
      path: "/login",
      icon: faUser,
    },
    {
      title: "Signup",
      path: "/signup",
      icon: faUser,
    },
  ];
  return (
    <>
      <nav className="flex justify-between items-center group p-4 z-50 md:px-10 border-2 fixed top-0 w-full bg-white">
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleToggleMenu} className="text-2xl">
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
          <div className="flex items-center ">
            <Logo height="45px" width="45px"/>
            <span
              className={`font-bold text-lg ${
                isSeachOpen ? "hidden" : "block"
              } md:block`}
            >
              VideoTube
            </span>
          </div>
        </div>

        <div
          className="flex justify-center items-center "
          onMouseOver={() => setIsSearchOpen(true)}
          onMouseOut={() => setIsSearchOpen(false)}
        >
          <input
            type="text"
            className={`w-52 md:block md:w-96 border border-gray-300 rounded-md rounded-e-none px-4 py-2 outline-none border-e-0 ${
              isSeachOpen ? "block" : "hidden"
            }`}
            placeholder="Search"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className={`p-2 text-2xl md:border md:rounded-md md:rounded-s-none ${
              isSeachOpen ? "rounded-md rounded-s-none border" : ""
            }`}
          />
        </div>
        <div ref={dropdownRef}>
          <img
            src={`${isLoggedIn ? user?.avatar : '/avatar.png'}`}
            alt="avatar"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-10 w-10 border-2  rounded-full cursor-pointer"
          />
          {isDropdownOpen && (
            <Dropdown
              options={
                isLoggedIn ? loggedInDropdownOptions : loggedOutDropdownOptions
              }
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
