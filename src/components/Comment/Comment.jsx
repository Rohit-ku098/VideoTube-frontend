import React, {useEffect, useRef, useState} from 'react'
import { getAge } from '../../utils/getAge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsisVertical, faListUl, faEdit, faTrash, faFlag} from '@fortawesome/free-solid-svg-icons'
import Dropdown from '../Dropdown'
import { useSelector } from 'react-redux'
import Confirmation from '../Confirmation'
import { deleteComment } from '../../services/comment.service'

const Comment = ({comment}) => {
  const [age, setAge] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isFlagOpen, setIsFlagOpen] = useState(false)
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
  
  const handleConfirmationPopup = () => {
    setIsDeleteOpen(!isDeleteOpen)
  }

  const handleDeleteComment = () => {
    deleteComment(comment?._id).then(() => {
      setIsDeleteOpen(false)
      setIsDeleted(true)
    })
  }

  return !isDeleted && (
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
                      icon: faEdit,
                    },
                    {
                      title: "Delete",
                      icon: faTrash,
                      onClick: handleConfirmationPopup
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
        {
          isDeleteOpen && 
          (<Confirmation 
            title='Delete Comment'
            onCancel={handleConfirmationPopup}
            onConfirm={handleDeleteComment}
          >
            <p>Are you sure to delete? </p>
          </Confirmation>)
        }
      </div>
    </div>
  );
}

export default Comment
