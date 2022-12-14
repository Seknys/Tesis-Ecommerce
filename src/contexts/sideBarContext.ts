import { createContext } from "react";
// import { Iuser } from "../interfaces/interface";

interface ISideBar {
  valueSide: string | null;
  setValueSide: Function;
}

const SideBarContext = createContext<ISideBar>({
  valueSide: null,
  setValueSide: () => {},
});

export const SideBarContextProvider = SideBarContext.Provider;
export default SideBarContext;
