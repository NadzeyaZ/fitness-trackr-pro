import { NavLink } from "react-router";
import { useActivities } from "./ActivitiesContext";

export default function ActivityList() {
  const { activities, syncActivities } = useActivities();
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}

function ActivityListItem({ activity }) {
  const { syncActivities } = useActivities();
  return (
    <li>
      <NavLink to={`/activities/${activity.id}`}>{activity.name}</NavLink>
    </li>
  );
}
