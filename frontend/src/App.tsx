import React, { createContext, useEffect, useState } from "react";
import Auth from "./components/Auth";
import Todo from "./components/Todo";
import { axiosInstance } from "./axios";

interface AuthContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axiosInstance
      .post("/auth/verify", {})
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      });
  },[]);
  return (
    <AuthContext.Provider
      value={{ auth: isAuthenticated, setAuth: setIsAuthenticated }}
    >
      {isAuthenticated ? <Todo /> : <Auth />}
    </AuthContext.Provider>
  );
};

export default App;
