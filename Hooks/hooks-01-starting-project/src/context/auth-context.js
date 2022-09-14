import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthed, setIsAuthed] = useState(false);

  const loginHandler = () => {
    setIsAuthed(true);
  };

  const contextValue = {
    isAuth: isAuthed,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
