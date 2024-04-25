import { createContext, useContext } from "react";

const toastContext = createContext(null);

export const useToast = () =>  useContext(toastContext);

export default toastContext