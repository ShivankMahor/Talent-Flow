import db from "./index";

export async function seedDB() {
  const hasData = await db.jobs.count();
  if (hasData > 0) return;
  
  await db.jobs.bulkAdd([
    { id: 1, title: "Frontend Developer", slug: "frontend-dev", status: "active", order: 1 },
    { id: 2, title: "Backend Developer", slug: "backend-dev", status: "active", order: 2 },
  ]);

  await db.candidates.bulkAdd([
    { id: 1, name: "Alice Candidate", email: "alice@candidate.com", stage: "applied", jobId: 1 },
    { id: 2, name: "Bob Candidate", email: "bob@candidate.com", stage: "screen", jobId: 2 },
  ]);

  await db.settings.put({ key: "theme", value: "light" });
}
