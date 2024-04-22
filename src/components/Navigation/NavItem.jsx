import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux' 
import React,{ useRef } from "react";

const NavItem = ({ to, icon, label, onClick, className }, ref) => {
  const {isMenuOpen} = useSelector(state => state.navbar)
  return (
    <li className="list-none " ref={ref}>
      <Link
        to={to}
        className={`flex items-center  ${className}`}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} className="mr-1 " />{" "}
        {isMenuOpen && <span className={`text-sm `}>{label}</span>}
      </Link>
    </li>
  );
};

export default React.forwardRef(NavItem)