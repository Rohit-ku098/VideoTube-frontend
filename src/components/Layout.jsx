import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navigation/Navbar';
import Aside from './Navigation/Aside';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function Layout() { 
  const { isMenuOpen } = useSelector((state) => state.navbar);
  return (
    <div>
      <header>
        <Navbar searchBar={true}/>
      </header>
      <main
        className={`mt-[4.7rem] lg:ml-16 ${
          isMenuOpen ? "" : ""
        }  `}
      >
        <Aside />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout
