import { useNavigate, useParams } from "react-router";
import { useRoutines } from "./RoutinesContext";
import { useEffect, useState } from "react";
import { deleteRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import SetsForm from "../sets/SetsForm";
import SetsList from "../sets/SetsList";

export default function RoutineDetails() {
  const { routines, syncRoutines } = useRoutines();
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const selectedRoutine = routines.find((routine) => routine.id === Number(id));
  const setsList = selectedRoutine?.sets || [];
  async function handleDelete() {
    try {
      await deleteRoutine(token, id);
      syncRoutines();
      navigate("/routines");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2>{selectedRoutine?.name}</h2>
      <p>{selectedRoutine?.creatorName}</p>
      <p>{selectedRoutine?.goal}</p>
      {token && <button onClick={handleDelete}>Delete routine</button>}
      {error && <p role="alert">{error}</p>}
      <SetsList setsList={setsList} />
      <SetsForm />
    </>
  );
}
