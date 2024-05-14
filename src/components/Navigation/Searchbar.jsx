import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearchOpen } from "../../store/navbarSlice";

const Searchbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const {
    register,
    handleSubmit, 
    formState: { isDirty },
  } = useForm({defaultValues: { "query": "" }});
  
  const { isSearchOpen } = useSelector((state) => state.navbar);
  
  const onSearch = (data) => {
    if(isDirty) {
        console.log('navigating....')
        navigate({
          pathname: '/search',
          search: createSearchParams({
            ...data
          }).toString()
        });
    }
  }

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  
  return (
    <form
      onSubmit={handleSubmit(isDirty ? onSearch : () => {})}
      onMouseLeave={() => !isDirty && dispatch(setIsSearchOpen(false))}
      onMouseEnter={() => dispatch(setIsSearchOpen(true))}
      className={` flex justify-center items-center  border-2 dark:border-gray-800 rounded-md md:divide-x-2  dark:divide-gray-800 ${
        isSearchOpen ? "divide-x-2" : ""
      }
       `}
    >
      <input
        type="text"
        {...register("query", { required: true, validate:  (val) => val.trim().length > 0 , })}
        className={` dark:bg-backgroundDark w-40 sm:w-48 md:block md:w-96 rounded-md rounded-e-none px-4 py-2 outline-none  
            ${isSearchOpen ? "block" : "hidden"} ${isDirty ? "block" : ""}`}
        placeholder="Search"
      />

      {width < 768 ? (
        <div
          className={` p-1.5  ${
            isSearchOpen
              ? "rounded-md rounded-s-none "
              : "absolute right-[15%] md:static"
          }`}
        >
          {isSearchOpen ? (
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} className={` text-2xl `} />
            </button>
          ) : (
            <FontAwesomeIcon icon={faSearch} className={` text-2xl `} />
          )}
        </div>
      ) : (
        <button type="submit" className={` p-1.5 rounded-md rounded-s-none `}>
          <FontAwesomeIcon icon={faSearch} className={` text-2xl `} />
        </button>
      )}
    </form>
  ); 
};

export default Searchbar;
