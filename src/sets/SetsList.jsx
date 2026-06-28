import { useState } from "react";
import { deleteSet } from "../api/sets";
import { useRoutines } from "../routines/RoutinesContext";
import { useAuth } from "../auth/AuthContext";

export default function SetsList({ setsList }) {
  const [error, setError] = useState(null);
  const { syncRoutines } = useRoutines();
  const { token } = useAuth();
  async function handleDelete(id) {
    try {
      await deleteSet(token, id);
      syncRoutines();
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h3>Sets List</h3>
      <ul className="sets">
        {setsList.map((set) => (
          <li key={set.id}>
            <p>{set.name}</p>
            <button onClick={() => handleDelete(set.id)}>Delete set</button>
          </li>
        ))}
      </ul>
    </>
  );
}
