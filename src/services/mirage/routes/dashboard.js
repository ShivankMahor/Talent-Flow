import { withFailure }  from "../utils/WithFailure"
import db from '../../../db/index'

export default function dashBoardRoutes(server){
  
  server.get("/dashboard/jobs-summary", async () => {
    const jobs = await db.jobs.toArray();
    const activeCount = jobs.filter(j => j.status === "active").length;
    const archivedCount = jobs.filter(j => j.status === "archived").length;
    return { activeCount, archivedCount };
  });

}