import { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../services/Firebase";
import storeReducer, { initialState } from "./StoreReducer";

const StoreContext = createContext<any>(!null);

interface Props {
  children: any
}
const StoreProvider = ({ children }: Props) => {
  const [store, dispatch] = useReducer(storeReducer, initialState);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => setUser(firebaseUser));
    return unsubscribe;
  }, [user]);

  return (
    <StoreContext.Provider value={[store, dispatch, user]}>
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext }
export default StoreProvider;