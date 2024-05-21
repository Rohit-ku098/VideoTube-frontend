import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '../../context/Theme/themeContext.js';

function ToastProvider() {
   
  return (
    <ToastContainer draggable draggablePercent={60}  />
  );
}

export default ToastProvider
