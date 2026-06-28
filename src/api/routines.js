const API = import.meta.env.VITE_API;

export async function getRoutines() {
  try {
    const response = await fetch(`${API}/routines`);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function createNewRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine.");
  }
  try {
    const response = await fetch(`${API}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(routine),
    });
    const result = await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
