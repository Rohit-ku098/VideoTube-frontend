// const toggleDropdown = (dropdownRef, setIsDropdownOpen) => {
//   setIsDropdownOpen((e) => !e);
//   document.addEventListener("mousedown", handleCloseDropdown);
//   document.removeEventListener("mousedown", (e) => {
//     if (!dropdownRef.current.contains(e.target)) {
//       setIsDropdownOpen(false);
//     }
//   });
//   return () => {
      
//   };
// };

export { toggleDropdown }