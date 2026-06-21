import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  return (
    <>
      <h1>Activities</h1>
      <ActivityList />
      <ActivityForm />
    </>
  );
}
