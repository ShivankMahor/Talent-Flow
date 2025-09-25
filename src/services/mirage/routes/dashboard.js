import db from '../../../db/index'

export default function dashBoardRoutes(server){
  
  server.get("/dashboard/jobs-summary", async () => {
    const jobs = await db.jobs.toArray();
    const activeCount = jobs.filter(j => j.status === "active").length;
    const archivedCount = jobs.filter(j => j.status === "archived").length;
    return { activeCount, archivedCount };
  });

  server.get("/dashboard/jobs-by-tags", async () => {
  const jobTags = await db.jobTags.toArray();
  const tags = await db.tags.toArray();

  // Count jobs per tag
  const counts = jobTags.reduce((acc, jt) => {
    acc[jt.tagId] = (acc[jt.tagId] || 0) + 1;
    return acc;
  }, {});

  const data = tags.map(t => ({
    name: t.name,
    count: counts[t.id] || 0,
  }));

  return data;
});
server.get("/dashboard/candidates-pipeline", async () => {
  const candidates = await db.candidates.toArray();
  const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

  const counts = stages.map(stage => ({
    stage,
    count: candidates.filter(c => c.stage === stage).length,
  }));

  return counts; // [{ stage: "applied", count: 200 }, ...]
});
server.get("/dashboard/candidates-total", async () => {
  const totalCandidates = await db.candidates.count();
  return { totalCandidates };
});
server.get("/dashboard/top-jobs", async () => {
  const jobs = await db.jobs.toArray();
  const candidates = await db.candidates.toArray();

  const counts = jobs.map(j => ({
    name: j.title,
    count: candidates.filter(c => c.jobId === j.id).length,
  }));

  // Sort & take top 5
  const top = counts.sort((a, b) => b.count - a.count).slice(0, 5);
  return top;
});
server.get("/dashboard/tags-usage", async () => {
  const jobTags = await db.jobTags.toArray();
  const tags = await db.tags.toArray();

  const counts = jobTags.reduce((acc, jt) => {
    acc[jt.tagId] = (acc[jt.tagId] || 0) + 1;
    return acc;
  }, {});

  const data = tags.map(t => ({
    name: t.name,
    count: counts[t.id] || 0,
  }));

  // Sort descending by usage
  return data.sort((a, b) => b.count - a.count);
});

}