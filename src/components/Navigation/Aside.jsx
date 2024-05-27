import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFire,
  faBell,
  faHistory,
  faVideo,
  faListUl,
  faUpload,
  faCog,
  faUser,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";

import { toggleMenu } from "../../store/navbarSlice";
import NavItem from "./NavItem";
function Aside() {
  const { isMenuOpen } = useSelector((state) => state.navbar);
  const asideRef = useRef(null);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const {user} = useSelector(state => state.user)


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!asideRef?.current?.contains(event.target)) {
        dispatch(toggleMenu(false));
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [asideRef]);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [])


  console.log('aside render')
  return (
    <>
      {width < 1022 ? (
        <div className="">
          {/* mobile */}
          {isMenuOpen && (
            <aside
              ref={asideRef}
              className="z-40 h-screen  border-e-2 dark:border-gray-800 flex flex-col text-xl md:flex  bg-white fixed dark:bg-bgDarkSecondary left-0 "
            >
              <NavItem to="/" icon={faHome} label="Home" />
              <NavItem to="/blog" icon={faBlog} label="Blog" />
              {/* <NavItem
                to="/subscriptions"
                icon={faUser}
                label="Subscriptions"
              /> */}
              <NavItem to="/history" icon={faHistory} label="History" />
              <NavItem
                to={`/playlist/feed/${user?._id}`}
                icon={faListUl}
                label="Playlist"
              />
              <NavItem to="/upload" icon={faUpload} label="Upload" />
              {/* <NavItem
                icon={faCog}
                label="Settings"
              /> */}
            </aside>
          )}
        </div>
      ) : (
        <div className="z-40  md:block fixed left-0">
          {/* desktop */}
          {
            <aside
              ref={asideRef}
              className={`${
                isMenuOpen ? "w-48" : "w-16"
              }  h-screen border-e-2 dark:border-0 flex flex-col  text-xl md:fle bg-white dark:bg-bgDarkSecondary `}
            >
              <NavItem to="/" icon={faHome} label="Home" />
              <NavItem to="/blog" icon={faBlog} label="Blog" />
              {/* <NavItem
                to="/subscriptions"
                icon={faUser}
                label="Subscriptions"
              /> */}
              <NavItem to="/history" icon={faHistory} label="History" />
              <NavItem
                to={`/playlist/feed/${user?._id}`}
                icon={faListUl}
                label="Playlist"
              />
              <NavItem to="/upload" icon={faUpload} label="Upload" />
              {/* <NavItem
                icon={faCog}
                label="Settings"
              /> */}
            </aside>
          }
        </div>
      )}
    </>
  );
}

export default Aside;
