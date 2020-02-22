import React, { createContext } from "react";

const UserContext = createContext();

const UserProvider = props => {
  const { children } = props;

  return (
    <UserContext.Provider value={{ name: "Another user" }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
