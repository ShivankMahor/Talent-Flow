import db from "../../../db";

export async function loginUser({ email, password }) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid login");

  const userData = await res.json();

  // Persist in Dexie (settings table)
  await db.settings.put({ key: "user", value: userData });

  return userData;
}

export async function getCurrentUser() {
  const user = await db.settings.get("user");
  return user ? user.value : null;
}

export async function logoutUser() {
  await db.settings.delete("user");
}
