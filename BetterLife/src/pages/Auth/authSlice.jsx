import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedName = JSON.parse(localStorage.getItem("name"));

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(storedName || "");
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    contact: "",
    store: "",
    available: "",
  });

  const setLogin = (value) => {
    setIsLoggedIn(value);
  };

  const updateName = (newName) => {
    localStorage.setItem("name", JSON.stringify(newName));
    setName(newName);
  };

  const updateUser = (profile) => {
    setUser({
      name: profile.name,
      email: profile.email,
      role: profile.role,
      contact: profile.contact,
      store: profile.store,
      available: profile.available,
    });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLogin, name, updateName, user, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
