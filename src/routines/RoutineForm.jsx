import { useRoutines } from "./RoutinesContext";
import { createNewRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

export default function RoutineForm() {
  const { routine, syncRoutines } = useRoutines();
  const { token } = useAuth();
  const [error, setError] = useState(null);

  async function tryCreateRoutine(formData) {
    setError(null);
    const name = formData.get("name");
    const goal = formData.get("goal");

    try {
      await createNewRoutine(token, { name, goal });
      syncRoutines();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Add a new routine</h2>
      <form action={tryCreateRoutine}>
        <label>
          Name
          <input type="text" name="name"></input>
        </label>
        <label>
          Description
          <input type="text" name="goal"></input>
        </label>
        <button>Add activity</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
