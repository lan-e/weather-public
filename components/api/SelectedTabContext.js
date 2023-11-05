import React, { createContext, useState, useContext } from "react";

const SelectedTabContext = createContext();

export const useSelectedTab = () => useContext(SelectedTabContext);

export function SelectedTabProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </SelectedTabContext.Provider>
  );
}
