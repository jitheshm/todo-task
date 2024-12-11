import React, { createContext, useState } from "react";
import Auth from "./components/Auth";
import Todo from "./components/Todo";

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

  return (
    <AuthContext.Provider
      value={{ auth: isAuthenticated, setAuth: setIsAuthenticated }}
    >
      {isAuthenticated ? <Todo /> : <Auth />}
    </AuthContext.Provider>
  );
};

export default App;
