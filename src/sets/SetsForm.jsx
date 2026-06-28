import { useActivities } from "../activities/ActivitiesContext";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useParams } from "react-router";
import { addSet } from "../api/sets";
import { useRoutines } from "../routines/RoutinesContext";

export default function SetsForm() {
  const { activities, syncActivities } = useActivities();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { syncRoutines } = useRoutines();

  async function tryCreateActivity(formData) {
    setError(null);
    const activityID = formData.get("activity");
    const count = Number(formData.get("count"));
    try {
      await addSet(token, activityID, id, count);
      syncRoutines();
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h3>Add a set</h3>
      <form action={tryCreateActivity}>
        <label>
          Activity
          <select name="activity">
            {activities.map((activity) => (
              <option value={activity.id}>{activity.name}</option>
            ))}
          </select>
        </label>
        <label>
          Count
          <input type="text" name="count"></input>
        </label>
        <button>add set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
