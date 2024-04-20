import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
const Confirmation = ({children, title='Title', cancelBtn='Cancel', confirmBtn='Confirm', onCancel, onConfirm }) => {
    const popupRef = useRef(null)
    
    const handleClosePopup = (e) => {
        if(!popupRef.current.contains(e.target)) {
            onCancel()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClosePopup)
        return () => {
            document.removeEventListener('mousedown', handleClosePopup)
        }
    }, [])
    
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);

  return (
    <div className="z-50 w-[100vw] h-screen flex justify-center items-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] backdrop-brightness-75 ">
      <div 
      className="min-w-[300px] min-h-[150px] md:max-w-[25rem] max-w-[22rem] p-4 bg-white rounded-lg relative"
      ref={popupRef}
      >
        <h2 className="mb-2 text-lg font-semibold ">{title}</h2>
        <div className="absolute top-0 right-0 m-3 text-lg">
          <FontAwesomeIcon icon={faTimes} onClick={onCancel}/>
        </div>
        <div>{children}</div>
        <div className="absolute bottom-0 right-0 mr-4 mb-4">
          <div className="flex gap-4 mt-4">
            <button onClick={onCancel} className="">
              {cancelBtn}
            </button>
            <button onClick={onConfirm} className="">
              {confirmBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation
