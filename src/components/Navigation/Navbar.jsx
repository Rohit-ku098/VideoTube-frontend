import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSearch,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/navbarSlice";
import Dropdown from "../Dropdown";
import Logo from "../Logo";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isMenuOpen, isSearchOpen } = useSelector((state) => state.navbar);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null)
  const menuButtonRef = useRef(null)
  
  
  useEffect(() => {
    const handleCloseMenu = (e) => {
      if (menuButtonRef.current.contains(e.target)) {
        dispatch(toggleMenu(!isMenuOpen));
      }
    };
    document.addEventListener("mousedown", handleCloseMenu);
    return () => {
      document.removeEventListener("mousedown", handleCloseMenu);
    };
}, [isMenuOpen])


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
          <div type="button" className="text-2xl" ref={menuButtonRef}>
            {isMenuOpen ? (
              <button type="button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            ) : (
              <button type="button">
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
          </div>
          <div className="flex items-center ">
            <Logo height="45px" width="45px" />
            <span
              className={`font-bold text-lg ${
                isSearchOpen ? "hidden" : "block"
              } md:block`}
            >
              VideoTube
            </span>
          </div>
        </div>

        <Searchbar />

        <div ref={dropdownRef}>
          <img
            src={`${isLoggedIn ? user?.avatar : "/avatar.png"}`}
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
