import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFire,
  faBell,
  faHistory,
  faVideo,
  faUpload,
  faCog,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { toggleMenu } from "../../store/navbarSlice";
import NavItem from "./NavItem";
function Aside() {
  const { isMenuOpen } = useSelector((state) => state.navbar);
  const asideRef = useRef(null);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

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
      console.log(window.innerWidth)
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
              className="z-50 h-screen p-6 border-e-2 flex flex-col gap-8 text-xl md:flex text-black bg-white fixed left-0 "
            >
              <NavItem to="/" icon={faHome} label="Home" />
              <NavItem to="/trending" icon={faFire} label="Trending" />
              <NavItem
                to="/subscriptions"
                icon={faUser}
                label="Subscriptions"
              />
              <NavItem to="/history" icon={faHistory} label="History" />
              <NavItem to="/library" icon={faVideo} label="Library" />
              <NavItem to="/upload" icon={faUpload} label="Upload" />
              <NavItem to="/settings" icon={faCog} label="Settings" />
            </aside>
          )}
        </div>
      ) : (
        <div className="  md:block fixed left-0 z-50">
          {/* desktop */}
          {
            <aside
              ref={asideRef}
              className={`${
                isMenuOpen ? "w-48" : "w-16"
              } h-screen p-6 border-e-2 flex flex-col gap-8 text-xl md:flex text-black  bg-white `}
            >
              <NavItem to="/" icon={faHome} label="Home" />
              <NavItem to="/trending" icon={faFire} label="Trending" />
              <NavItem
                to="/subscriptions"
                icon={faUser}
                label="Subscriptions"
              />
              <NavItem to="/history" icon={faHistory} label="History" />
              <NavItem to="/library" icon={faVideo} label="Library" />
              <NavItem to="/upload" icon={faUpload} label="Upload" />
              <NavItem
                to="/settings"
                icon={faCog}
                label="Settings"
                className={"absolute bottom-10"}
              />
            </aside>
          }
        </div>
      )}
    </>
  );
}

export default Aside;
