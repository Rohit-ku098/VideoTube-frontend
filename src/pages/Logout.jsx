import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/conf'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { logout } from '../store/userSlice'
import { logoutUser } from '../services/user.service'
function Logout() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    console.log("logout running");
   
    useEffect(() => {
        logoutUser().then(() => {
            setLoading(false)
            navigate("/login");
            dispatch(logout());
        })
    },[])
  return (
    <div>
        {loading && <Loader/>}
    </div>
  )
}

export default Logout
