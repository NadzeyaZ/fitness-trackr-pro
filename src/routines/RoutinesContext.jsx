import { useContext, createContext, useState, useEffect } from "react";
import { getRoutines } from "../api/routines";
const RoutinesContext = createContext();

export function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState();
  useEffect(() => {
    async function syncRoutines() {
      const data = await getRoutines();
      setRoutines(data);
    }
    syncRoutines();
  }, []);

  const value = { routines };
  return (
    <RoutinesContext.Provider value={value}>
      {children}
    </RoutinesContext.Provider>
  );
}

export function useRoutines() {
  const context = useContext(RoutinesContext);
  return context;
}
