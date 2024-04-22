import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

function AuthLayout({authentication=true, children}) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const {isLoggedIn, user} = useSelector((state) => state.user)
  
    useEffect(() => {
        if(authentication && isLoggedIn !== authentication) {
            navigate('/login')
        } 
        else if(!authentication && isLoggedIn !== authentication) {
            navigate('/')
            console.log('navigating to home')
        }

        setLoader(false)
    }, [isLoggedIn, authentication, navigate])

    
  return <>{loader ? <Loader /> : children}</>;
}

export default AuthLayout
