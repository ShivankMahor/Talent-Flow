// db/index.js
import Dexie from "dexie";

const db = new Dexie("TalentFlowDB");

db.version(2).stores({
  jobs: "++id, title, slug, status, order",
  candidates: "++id, name, email, stage, jobId",
  assessments: "++id, jobId, title",
  settings: "key, value",
  tags: "++id, name",          // master tags
  jobTags: "++id, jobId, tagId" // join table many-to-many
});

export default db;
