import { createContext } from "react";
import { Iuser } from "../interfaces/interface";

interface IUserContext {
  user: Iuser | null;
  setUser: Function;    
}

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = UserContext.Provider;
export default UserContext;
