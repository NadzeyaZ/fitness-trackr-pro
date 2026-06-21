import { useEffect, useState } from "react";
import {
  getSingleActivity,
  deleteActivity,
  getActivities,
} from "../api/activities";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useActivities } from "./ActivitiesContext";

export default function ActivityDetails() {
  const { token } = useAuth();
  const { syncActivities } = useActivities();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const navigate = useNavigate();

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      syncActivities();
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    async function getActivity() {
      const act = await getSingleActivity(id);
      setActivity(act);
    }
    getActivity();
  }, [id]);

  return (
    <>
      <h2>{activity?.name}</h2>
      <p>{activity?.creatorName}</p>
      <p>{activity?.description}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
