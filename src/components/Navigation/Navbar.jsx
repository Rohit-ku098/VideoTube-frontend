import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBars,
  faTimes,
  faUser,
  faPalette,
  faGauge,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../store/navbarSlice";
import { logout } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/user.service";

import Dropdown from "../Dropdown";
import Logo from "../Logo";
import Searchbar from "./Searchbar";
import Modal from "../Modal";
import Loader from "../Loader";
import Appearance from "../Appearance";
import { toast } from "react-toastify";

const Navbar = ({searchBar, menubar=true}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { isMenuOpen, isSearchOpen } = useSelector((state) => state.navbar);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);

  const dropdownRef = useRef(null)
  const menuButtonRef = useRef(null)

    const handleConfirmationPopup = () => {
      setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    };

    const handleLogout = () => {
      setLoading(true);
      logoutUser().then(() => {
        navigate("/login");
        dispatch(logout());
      }).catch((error) => {
        toast.error(error, {
          position: "bottom-left",
        });
      }).finally(() => {
        setLoading(false);
      })
    }

  const handleAppearanceOpen = () => {
    setIsAppearanceOpen(!isAppearanceOpen);
  };
  
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
  }) 


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
      path: `/channel/${user?.userName}`,
      icon: faUser,
    },
    {
      title: "Dashboard",
      path: `/dashboard`,
      icon: faGauge,
      target: "_blank",
    },
    {
      title: "Appearance",
      onClick: handleAppearanceOpen,
      icon: faPalette,
    },
    {
      title: "Setting",
      path: "/setting",
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
    {
      title: "Appearance",
      onClick: handleAppearanceOpen,
      icon: faPalette,
    },
  ];

  console.log('navbar render')

  return (
    <>
      <nav className="flex justify-between items-center group p-4 z-40 md:px-10 border-b-2 dark:border-gray-800 shadow-sm fixed top-0 w-full bg-white dark:bg-bgDarkSecondary">
        <div className="flex items-center gap-3">
          {menubar && (
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
          )}
          <Link to={"/"}>
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
          </Link>
        </div>

        {searchBar && <Searchbar />}
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

      {isConfirmationPopupOpen && (
        <Modal
          title="Log Out"
          onCancel={handleConfirmationPopup}
          onConfirm={handleLogout}
          confirmBtn="Log Out"
        >
          <p>Are you sure to log out?</p>
        </Modal>
      )}

      {isAppearanceOpen && (
        <Appearance setAppearanceOpen={setIsAppearanceOpen} />
      )}
      {loading && <Loader />}
    </>
  );
};

export default Navbar;
