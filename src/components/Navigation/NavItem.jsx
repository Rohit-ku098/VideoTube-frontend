import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux' 
import React,{ useEffect, useRef } from "react";
import { toggleMenu } from "../../store/navbarSlice";

const NavItem = ({ to, icon, label, onClick, className }) => {
  const dispatch = useDispatch()
  const {isMenuOpen} = useSelector(state => state.navbar)
  const liRef = useRef()
  const handleClose = (e) => {
    if(liRef.current?.contains(e.target)) {
      dispatch(toggleMenu(false))
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClose)
    return () => document.removeEventListener('click', handleClose)
  }, [])
  return (
    <Link
      to={to}
      className={`list-none ${
        isMenuOpen ? "hover:bg-slate-100 dark:hover:bg-slate-800" : ""
      } px-6 py-3 my-1 cursor-pointer`}
      ref={liRef}
    >
      <li className={`flex items-center  ${className}`} onClick={onClick}>
        <FontAwesomeIcon icon={icon} className="mr-1 " />{" "}
        {isMenuOpen && <span className={`text-sm `}>{label}</span>}
      </li>
    </Link>
  );
};

export default NavItem