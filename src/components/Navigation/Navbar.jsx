import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/navbarSlice";
import { logout } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/user.service";

import Dropdown from "../Dropdown";
import Logo from "../Logo";
import Searchbar from "./Searchbar";
import Confirmation from "../Confirmation";
import Loader from "../Loader";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { isMenuOpen, isSearchOpen } = useSelector((state) => state.navbar);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null)
  const menuButtonRef = useRef(null)

    const handleConfirmationPopup = () => {
      setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    };

    const handleLogout = () => {
      setLoading(true);
      logoutUser().then(() => {
        setLoading(false);
        navigate("/login");
        dispatch(logout());
        setLoading(false)
      });
    }

  
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
      
      icon: faUser,
      onClick: handleConfirmationPopup,
    },
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

  console.log('navbar render')

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

      {isConfirmationPopupOpen && 
        <Confirmation onCancel={handleConfirmationPopup} onConfirm={handleLogout} confirmBtn="Log Out">
          <p>Are you sure to log out?</p>
        </Confirmation>}

      {loading && <Loader />}
    </>
  );
};

export default Navbar;
