import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux' 

const NavItem = ({ to, icon, label, onClick, className }) => {
  const {isMenuOpen} = useSelector(state => state.navbar)
  return (
    <li className="list-none ">
      <Link
        to={to}
        className={`flex items-center  ${className}`}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} className="mr-1 " />{" "}
        {isMenuOpen && <span className={`text-sm  `}>{label}</span>}
      </Link>
    </li>
  );
};

export default NavItem