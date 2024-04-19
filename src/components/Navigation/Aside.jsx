import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFire,
  faBell,
  faHistory,
  faVideo,
  faUpload,
  faCog,
  faSearch,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from './NavItem';
function Aside() {
  const { isMenuOpen } = useSelector(state => state.navbar)
  return (
    <>
      {/* mobile */}
      <div className="lg:hidden z-50">
        {isMenuOpen && (
          <aside className="h-screen p-6 border-e-2 flex flex-col gap-8 text-xl md:flex text-black bg-white fixed left-0 ">
            <NavItem to="/" icon={faHome} label="Home" />
            <NavItem to="/trending" icon={faFire} label="Trending" />
            <NavItem to="/subscriptions" icon={faUser} label="Subscriptions" />
            <NavItem to="/history" icon={faHistory} label="History" />
            <NavItem to="/library" icon={faVideo} label="Library" />
            <NavItem to="/upload" icon={faUpload} label="Upload" />
            <NavItem to="/settings" icon={faCog} label="Settings" />
          </aside>
        )}
      </div>
      {/* desktop */}
      <div className=" hidden lg:block fixed left-0 z-50">
        {
          <aside className={`${isMenuOpen ? 'w-48': 'w-16'} h-screen p-6 border-e-2 flex flex-col gap-8 text-xl md:flex text-black  bg-white `}>
            <NavItem to="/" icon={faHome} label="Home" />
            <NavItem to="/trending" icon={faFire} label="Trending" />
            <NavItem to="/subscriptions" icon={faUser} label="Subscriptions" />
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
    </>
  );
}


export default Aside
