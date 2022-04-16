import  React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const RouterContext = createContext();

export const RouterProvider = ({children}) => {
  const location = useLocation()
  const [route, setRoute] = useState({ //--> It can be replaced with useRef or localStorage
    to: location.pathname,
    from: location.pathname //--> previous pathname
  });

  useEffect(()=> {
    setRoute((prev)=> ({to: location.pathname, from: prev.to}) )
  }, [location]);
  
  return <RouterContext.Provider value={route}>
    {children}
  </RouterContext.Provider>
}