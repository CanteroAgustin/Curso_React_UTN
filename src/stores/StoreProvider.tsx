import { createContext, useReducer } from "react";
import storeReducer, { initialState } from "./StoreReducer";



const StoreContext = createContext<any>(!null);



interface Props {
  children: any
}

const StoreProvider = ({ children }: Props) => {
  const [store, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext }
export default StoreProvider;