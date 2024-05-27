import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
const Dropdown = React.forwardRef(function Dropdown(
  {
    options = [
      {
        title: "",
        path: "",
        icon: "",
        target: "_self",
        onClick: () => {}
      },
    ],
  },
  ref
) {
  console.log(ref);
  return (
    <div className="z-50 relative" >
      <ul className="min-w-48 me-4 bg-white dark:bg-backgroundDark shadow-md absolute -right-2 border-2 dark:border-gray-800 rounded-lg">
        {options.map((item, i) =>
          item.path ? (
            <Link to={item.path} key={i} target={item?.target} state={item?.state}>
              <li
                ref={ref}
                title={item.title}
                className="flex items-center px-6 py-2 gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                onClick={item.onClick}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.title}
              </li>
            </Link>
          ) : (
            <li
              ref={ref}
              title={item.title}
              key={i}
              className="flex items-center px-6 py-2 gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              onClick={item.onClick}
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.title}
            </li>
          )
        )}
      </ul>
    </div>
  );
})

export default Dropdown
