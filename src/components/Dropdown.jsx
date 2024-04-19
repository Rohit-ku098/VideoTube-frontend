import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
const Dropdown = React.forwardRef(function Dropdown(
  {
    options = [
      {
        title: "",
        path: "#",
        icon: "",
      },
    ],
  },
  ref
) {
  console.log(ref);
  return (
    <div className="relative">
      <ul className="w-64 me-4 bg-white shadow-lg absolute -right-2 border rounded-lg">
        {options.map((item, i) => (
          <Link to={item.path} key={i}>
            <li
              ref={ref}
              title={item.title}
              className="flex items-center px-6 py-2 gap-2 hover:bg-slate-50"
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
})

export default Dropdown
