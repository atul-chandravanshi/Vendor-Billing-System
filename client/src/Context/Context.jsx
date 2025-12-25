import React, { createContext, useState } from "react";

export const userContext = createContext();

const Context = (props) => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  return (
    <>
      <userContext.Provider value={{ user, setUser, products, setProducts }}>
        {props.children}
      </userContext.Provider>
    </>
  );
};

export default Context;
