import Dexie from "dexie";

const db = new Dexie("TalentFlowDB");

db.version(1).stores({
  jobs: "++id, title, slug, status, order, tags",
  candidates: "++id, name, email, stage, jobId",
  assessments: "++id, jobId, title",
  settings: "key, value" // for auth session, theme, etc.
});

export default db;
