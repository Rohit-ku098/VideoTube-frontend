import { useEffect, useState } from "react";
import "./App.css";
import {Cookies} from 'react-cookie'

import { api } from "./services/conf";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import Loader from "./components/Loader";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const healthcheck = async () => {
    try {
      const res = await api.get("/healthcheck");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");
      console.log(res.data.data);
      if(res.status === 200) {
        dispatch(login(res.data?.data))
        // localStorage.setItem("user", JSON.stringify(res.data?.data))
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    healthcheck();
    getCurrentUser();
  }, []);

  return loading ? <Loader /> : <Outlet />;
}

export default App;
