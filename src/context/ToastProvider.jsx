import React, { useEffect,useState, useId } from 'react'
import toastContext from './toastContext'
import Alert from '../components/Alert'


function ToastProvider({children}) {
    
    const [toast, setToast] = useState([])
    const [time, setTime] = useState(4000)
    const id = Date.now()
    
    const open = (message, timeout=4000) => {
        setToast([...toast,{ message, id }])
        setTime(timeout)
        setTimeout(() => close(id), timeout)
    }
    
    console.log(toast)
    
    const close = (id) => {
      setToast(toast.filter((toast) => toast.id !== id))
    }
    
    
    return (
      <toastContext.Provider value={{ open, close }}>
        {children}
        <div className='z-50 fixed bottom-0 left-0 space-y-1 '>
          {toast.map(({ message, id }) => (
            <Alert key={id} id={id} message={message} timeout={time}/>
          ))}
        </div>
      </toastContext.Provider>
    );
}

export default ToastProvider
