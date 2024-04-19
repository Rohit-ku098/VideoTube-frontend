import React, {useEffect, useRef, useState} from 'react'
import { getAge } from '../../utils/getAge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faListUl, faEdit, faTrash, faFlag} from '@fortawesome/free-solid-svg-icons'
import Dropdown from '../Dropdown'
import { useSelector } from 'react-redux'

const Comment = ({comment}) => {
  const [age, setAge] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const {user} = useSelector(state => state.user)

  useEffect(() => {
    const handleCloseDropdown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleCloseDropdown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
    };
  }, []);

  useEffect(() => {
    setAge(getAge(comment?.createdAt))
  }, [])
  

  return (
    <div className="w-full p-4 my-2 flex gap-3 group/comment">
      <div>
        {/*avatar*/}
        <img
          src={comment?.owner?.avatar}
          alt=""
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div>
        {/*username age comment like */}
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm">
            {/*owner name */}
            @&nbsp;{comment?.owner?.userName}
          </p>
          <p className="text-gray-500 text-sm">
            {/* age */}
            {age}
          </p>
        </div>
        <div>
          {/*comment content*/}
          <pre className="font-sans text-wrap">{comment?.content}</pre>
        </div>
      </div>
      <div
        className={`ml-auto ${isDropdownOpen ?'visible' :'invisible'} group-hover/comment:visible`}
        ref={dropdownRef}
      >
        {/* 3 dots */}
        <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
        {isDropdownOpen && (
          <Dropdown
            
            options={
              user?._id === comment?.owner?._id
                ? [
                    {
                      title: "Edit",
                      path: `/editComment/${comment?._id}`,
                      icon: faEdit,
                    },
                    {
                      title: "Delete",
                      path: `/deleteComment/${comment?._id}`,
                      icon: faTrash,
                    },
                  ]
                : [
                    {
                      title: "Report",
                      path: `/reportComment/${comment?._id}`,
                      icon: faFlag,
                    },
                  ]
            }
          />
        )}
      </div>
    </div>
  );
}

export default Comment
