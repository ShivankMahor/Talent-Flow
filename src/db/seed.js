import db from "./index";

// helper: random pick
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export async function seedDB() {
  const hasData = await db.jobs.count();
  if (hasData > 0) return; // don't reseed

const jobs = [
  { title: "Frontend Developer", slug: "frontend-developer", order: 1, status: "active", tags: ["react", "javascript"], company: "Techify", location: "Bangalore, India", salary: "₹8–12 LPA", postedDate: "2 days ago", applicants: 45 },
  { title: "Backend Developer", slug: "backend-developer", order: 2, status: "active", tags: ["nodejs", "api"], company: "CodeWave", location: "Remote", salary: "$70k–90k", postedDate: "1 week ago", applicants: 32 },
  { title: "Fullstack Engineer", slug: "fullstack-engineer", order: 3, status: "active", tags: ["react", "node"], company: "Innovent", location: "Delhi, India", salary: "₹10–15 LPA", postedDate: "3 days ago", applicants: 51 },
  { title: "Mobile App Developer", slug: "mobile-app-developer", order: 4, status: "closed", tags: ["flutter", "ios"], company: "Appify", location: "Pune, India", salary: "₹6–10 LPA", postedDate: "2 weeks ago", applicants: 27 },
  { title: "Data Scientist", slug: "data-scientist", order: 5, status: "active", tags: ["python", "ml"], company: "DataLabs", location: "Remote", salary: "$90k–120k", postedDate: "5 days ago", applicants: 63 },
  { title: "ML Engineer", slug: "ml-engineer", order: 6, status: "active", tags: ["tensorflow", "ai"], company: "AIWorks", location: "Hyderabad, India", salary: "₹12–18 LPA", postedDate: "4 days ago", applicants: 40 },
  { title: "DevOps Engineer", slug: "devops-engineer", order: 7, status: "active", tags: ["docker", "kubernetes"], company: "CloudOps", location: "Berlin, Germany", salary: "€65k–85k", postedDate: "6 days ago", applicants: 29 },
  { title: "QA Tester", slug: "qa-tester", order: 8, status: "paused", tags: ["testing", "automation"], company: "QualityFirst", location: "Mumbai, India", salary: "₹5–8 LPA", postedDate: "3 weeks ago", applicants: 18 },
  { title: "Product Manager", slug: "product-manager", order: 9, status: "active", tags: ["management", "agile"], company: "NextGen", location: "London, UK", salary: "£60k–80k", postedDate: "1 day ago", applicants: 12 },
  { title: "UI/UX Designer", slug: "ui-ux-designer", order: 10, status: "active", tags: ["design", "figma"], company: "PixelPerfect", location: "Remote", salary: "$50k–70k", postedDate: "5 days ago", applicants: 37 },
  { title: "Security Analyst", slug: "security-analyst", order: 11, status: "active", tags: ["security", "pentest"], company: "SecureNet", location: "Singapore", salary: "SGD 70k–100k", postedDate: "2 weeks ago", applicants: 21 },
  { title: "Cloud Architect", slug: "cloud-architect", order: 12, status: "closed", tags: ["aws", "azure"], company: "CloudScale", location: "Remote", salary: "$110k–140k", postedDate: "1 month ago", applicants: 15 },
  { title: "Business Analyst", slug: "business-analyst", order: 13, status: "active", tags: ["analysis", "stakeholder"], company: "BizSolve", location: "Noida, India", salary: "₹7–12 LPA", postedDate: "8 days ago", applicants: 33 },
  { title: "Technical Writer", slug: "technical-writer", order: 14, status: "active", tags: ["docs", "content"], company: "DocuPro", location: "Remote", salary: "$45k–60k", postedDate: "2 days ago", applicants: 11 },
  { title: "Database Admin", slug: "database-admin", order: 15, status: "active", tags: ["sql", "performance"], company: "DBMasters", location: "Chennai, India", salary: "₹9–14 LPA", postedDate: "4 days ago", applicants: 26 },
  { title: "Game Developer", slug: "game-developer", order: 16, status: "paused", tags: ["unity", "csharp"], company: "PlayForge", location: "Los Angeles, USA", salary: "$80k–100k", postedDate: "3 weeks ago", applicants: 19 },
  { title: "AI Researcher", slug: "ai-researcher", order: 17, status: "active", tags: ["ai", "research"], company: "DeepVision", location: "Boston, USA", salary: "$120k–150k", postedDate: "1 day ago", applicants: 8 },
  { title: "Systems Engineer", slug: "systems-engineer", order: 18, status: "active", tags: ["linux", "infra"], company: "SysCore", location: "Bangalore, India", salary: "₹8–13 LPA", postedDate: "1 week ago", applicants: 35 },
  { title: "IT Support Specialist", slug: "it-support-specialist", order: 19, status: "closed", tags: ["support", "hardware"], company: "TechAssist", location: "Remote", salary: "$35k–50k", postedDate: "2 months ago", applicants: 22 },
  { title: "Site Reliability Engineer", slug: "site-reliability-engineer", order: 20, status: "active", tags: ["reliability", "monitoring"], company: "ReliTech", location: "Dublin, Ireland", salary: "€60k–80k", postedDate: "3 days ago", applicants: 14 },
  { title: "Embedded Engineer", slug: "embedded-engineer", order: 21, status: "active", tags: ["c", "firmware"], company: "EmbedSys", location: "Tokyo, Japan", salary: "¥7M–10M", postedDate: "1 week ago", applicants: 17 },
  { title: "Blockchain Developer", slug: "blockchain-developer", order: 22, status: "paused", tags: ["solidity", "crypto"], company: "ChainWorks", location: "Remote", salary: "$100k–130k", postedDate: "2 weeks ago", applicants: 25 },
  { title: "Data Engineer", slug: "data-engineer", order: 23, status: "active", tags: ["etl", "pipeline"], company: "DataFlow", location: "Amsterdam, Netherlands", salary: "€55k–75k", postedDate: "6 days ago", applicants: 30 },
  { title: "Network Engineer", slug: "network-engineer", order: 24, status: "active", tags: ["networking", "routing"], company: "NetSecure", location: "Delhi, India", salary: "₹6–10 LPA", postedDate: "5 days ago", applicants: 28 },
  { title: "Solutions Architect", slug: "solutions-architect", order: 25, status: "active", tags: ["design", "enterprise"], company: "ArchTech", location: "Toronto, Canada", salary: "CAD 90k–120k", postedDate: "4 days ago", applicants: 13 }
];


  await db.jobs.bulkAdd(jobs);

  // 1000 candidates spread across jobs + stages
  const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];
  const candidates = Array.from({ length: 1000 }).map((_, i) => ({
    name: `Candidate ${i + 1}`,
    email: `candidate${i + 1}@example.com`,
    stage: pick(stages),
    jobId: Math.floor(Math.random() * 25) + 1
  }));

  await db.candidates.bulkAdd(candidates);

  // at least 3 assessments with 10+ questions each
  const assessments = [
    {
      jobId: 1,
      title: "Frontend Quiz",
      questions: Array.from({ length: 10 }).map((_, i) => ({
        type: "single-choice",
        question: `Frontend Question ${i + 1}`,
        options: ["A", "B", "C", "D"]
      }))
    },
    {
      jobId: 2,
      title: "Backend Quiz",
      questions: Array.from({ length: 12 }).map((_, i) => ({
        type: "short-text",
        question: `Backend Question ${i + 1}`
      }))
    },
    {
      jobId: 5,
      title: "Data Science Quiz",
      questions: Array.from({ length: 15 }).map((_, i) => ({
        type: "numeric",
        question: `Data Science Question ${i + 1}`,
        min: 0,
        max: 100
      }))
    }
  ];

  await db.assessments.bulkAdd(assessments);

  // settings
  await db.settings.put({ key: "theme", value: "light" });
}
