import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const PollutionProvider = ({ children }) => {
  const [dataPollution, setDataPollution] = useState(null);

  return (
    <DataContext.Provider value={{ dataPollution, setDataPollution }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
