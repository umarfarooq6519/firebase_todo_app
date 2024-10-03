import { createContext, useContext } from "react";
import useDB from "../firestore";

const DBcontext = createContext();

export const DBprovider = ({ children }) => {
  const db = useDB();

  return <DBcontext.Provider value={db}>{children}</DBcontext.Provider>;
};

export const useDBcontext = () => {
  return useContext(DBcontext);
};
