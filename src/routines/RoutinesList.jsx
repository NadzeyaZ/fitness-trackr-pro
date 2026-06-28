import { NavLink } from "react-router";
import { useRoutines } from "./RoutinesContext";

export function RoutinesList() {
  const { routines } = useRoutines();
  return (
    <ul>
      {routines.map((routine) => (
        <RoutinesListItem key={routine.id} routine={routine}></RoutinesListItem>
      ))}
    </ul>
  );
}

function RoutinesListItem({ routine }) {
  return (
    <li>
      <NavLink to={`/routines/${routine.id}`}>{routine.name}</NavLink>
    </li>
  );
}
