import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";

const ActivitiesContext = createContext();

export function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  const value = { activities, setActivities, syncActivities };
  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (!context)
    throw Error("useActivities must be used within ActivitiesProvider");
  return context;
}
