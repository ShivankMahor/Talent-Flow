import db from "./index";
import { faker } from '@faker-js/faker';

export async function seedDB() {
console.log("InsideSeedDB") 
const hasData = await db.jobs.count();
console.log("had Data: ",hasData) 
if (hasData > 0) return; // don't reseed

console.log("starting Seed") 
// const jobs = [
//   { title: "Frontend Developer", slug: "frontend-developer", order: 1, status: "active", tags: ["react", "javascript"], company: "Techify", location: "Bangalore, India", salary: "₹8–12 LPA", postedDate: "2 days ago", applicants: 45 },
//   { title: "Backend Developer", slug: "backend-developer", order: 2, status: "archived", tags: ["nodejs", "api"], company: "CodeWave", location: "Remote", salary: "$70k–90k", postedDate: "1 week ago", applicants: 32 },
//   { title: "Fullstack Engineer", slug: "fullstack-engineer", order: 3, status: "active", tags: ["react", "node"], company: "Innovent", location: "Delhi, India", salary: "₹10–15 LPA", postedDate: "3 days ago", applicants: 51 },
//   { title: "Mobile App Developer", slug: "mobile-app-developer", order: 4, status: "active", tags: ["flutter", "ios"], company: "Appify", location: "Pune, India", salary: "₹6–10 LPA", postedDate: "2 weeks ago", applicants: 27 },
//   { title: "Data Scientist", slug: "data-scientist", order: 5, status: "active", tags: ["python", "ml"], company: "DataLabs", location: "Remote", salary: "$90k–120k", postedDate: "5 days ago", applicants: 63 },
//   { title: "ML Engineer", slug: "ml-engineer", order: 6, status: "active", tags: ["tensorflow", "ai"], company: "AIWorks", location: "Hyderabad, India", salary: "₹12–18 LPA", postedDate: "4 days ago", applicants: 40 },
//   { title: "DevOps Engineer", slug: "devops-engineer", order: 7, status: "closed", tags: ["docker", "kubernetes"], company: "CloudOps", location: "Berlin, Germany", salary: "€65k–85k", postedDate: "6 days ago", applicants: 29 },
//   { title: "QA Tester", slug: "qa-tester", order: 8, status: "archive", tags: ["testing", "automation"], company: "QualityFirst", location: "Mumbai, India", salary: "₹5–8 LPA", postedDate: "3 weeks ago", applicants: 18 },
//   { title: "Product Manager", slug: "product-manager", order: 9, status: "archived", tags: ["management", "agile"], company: "NextGen", location: "London, UK", salary: "£60k–80k", postedDate: "1 day ago", applicants: 12 },
//   { title: "UI/UX Designer", slug: "ui-ux-designer", order: 10, status: "active", tags: ["design", "figma"], company: "PixelPerfect", location: "Remote", salary: "$50k–70k", postedDate: "5 days ago", applicants: 37 },
//   { title: "Security Analyst", slug: "security-analyst", order: 11, status: "active", tags: ["security", "pentest"], company: "SecureNet", location: "Singapore", salary: "SGD 70k–100k", postedDate: "2 weeks ago", applicants: 21 },
//   { title: "Cloud Architect", slug: "cloud-architect", order: 12, status: "archived", tags: ["aws", "azure"], company: "CloudScale", location: "Remote", salary: "$110k–140k", postedDate: "1 month ago", applicants: 15 },
//   { title: "Business Analyst", slug: "business-analyst", order: 13, status: "closed", tags: ["analysis", "stakeholder"], company: "BizSolve", location: "Noida, India", salary: "₹7–12 LPA", postedDate: "8 days ago", applicants: 33 },
//   { title: "Technical Writer", slug: "technical-writer", order: 14, status: "closed", tags: ["docs", "content"], company: "DocuPro", location: "Remote", salary: "$45k–60k", postedDate: "2 days ago", applicants: 11 },
//   { title: "Database Admin", slug: "database-admin", order: 15, status: "active", tags: ["sql", "performance"], company: "DBMasters", location: "Chennai, India", salary: "₹9–14 LPA", postedDate: "4 days ago", applicants: 26 },
//   { title: "Game Developer", slug: "game-developer", order: 16, status: "archive", tags: ["unity", "csharp"], company: "PlayForge", location: "Los Angeles, USA", salary: "$80k–100k", postedDate: "3 weeks ago", applicants: 19 },
//   { title: "AI Researcher", slug: "ai-researcher", order: 17, status: "active", tags: ["ai", "research"], company: "DeepVision", location: "Boston, USA", salary: "$120k–150k", postedDate: "1 day ago", applicants: 8 },
//   { title: "Systems Engineer", slug: "systems-engineer", order: 18, status: "active", tags: ["linux", "infra"], company: "SysCore", location: "Bangalore, India", salary: "₹8–13 LPA", postedDate: "1 week ago", applicants: 35 },
//   { title: "IT Support Specialist", slug: "it-support-specialist", order: 19, status: "closed", tags: ["support", "hardware"], company: "TechAssist", location: "Remote", salary: "$35k–50k", postedDate: "2 months ago", applicants: 22 },
//   { title: "Site Reliability Engineer", slug: "site-reliability-engineer", order: 20, status: "archived", tags: ["reliability", "monitoring"], company: "ReliTech", location: "Dublin, Ireland", salary: "€60k–80k", postedDate: "3 days ago", applicants: 14 },
//   { title: "Embedded Engineer", slug: "embedded-engineer", order: 21, status: "active", tags: ["c", "firmware"], company: "EmbedSys", location: "Tokyo, Japan", salary: "¥7M–10M", postedDate: "1 week ago", applicants: 17 },
//   { title: "Blockchain Developer", slug: "blockchain-developer", order: 22, status: "archive", tags: ["solidity", "crypto"], company: "ChainWorks", location: "Remote", salary: "$100k–130k", postedDate: "2 weeks ago", applicants: 25 },
//   { title: "Data Engineer", slug: "data-engineer", order: 23, status: "active", tags: ["etl", "pipeline"], company: "DataFlow", location: "Amsterdam, Netherlands", salary: "€55k–75k", postedDate: "6 days ago", applicants: 30 },
//   { title: "Network Engineer", slug: "network-engineer", order: 24, status: "closed", tags: ["networking", "routing"], company: "NetSecure", location: "Delhi, India", salary: "₹6–10 LPA", postedDate: "5 days ago", applicants: 28 },
//   { title: "Solutions Architect", slug: "solutions-architect", order: 25, status: "active", tags: ["design", "enterprise"], company: "ArchTech", location: "Toronto, Canada", salary: "CAD 90k–120k", postedDate: "4 days ago", applicants: 13 }
// ];

const commonTags = [
  "javascript",
  "react",
  "nodejs",
  "python",
  "aws",
  "docker",
  "sql",
  "design",
  "testing",
  "agile"
];

const jobs = [
  {
    title: "Frontend Developer",
    slug: "frontend-developer",
    order: 1,
    status: "active",
    tags: ["javascript", "react", "design"],
    company: "Techify",
    location: "Bangalore, India",
    salary: "₹8–12 LPA",
    postedDate: "2 days ago",
    applicants: 45,
    description: "Build responsive web UIs with React and Tailwind.",
    experience: "2–4 years",
    type: "Full-time"
  },
  {
    title: "Backend Developer",
    slug: "backend-developer",
    order: 2,
    status: "archived",
    tags: ["nodejs", "sql", "aws"],
    company: "CodeWave",
    location: "Remote",
    salary: "$70k–90k",
    postedDate: "1 week ago",
    applicants: 32,
    description: "Develop APIs and optimize server performance with Node.js.",
    experience: "3–5 years",
    type: "Full-time"
  },
  {
    title: "Fullstack Engineer",
    slug: "fullstack-engineer",
    order: 3,
    status: "active",
    tags: ["javascript", "react", "nodejs", "sql"],
    company: "Innovent",
    location: "Delhi, India",
    salary: "₹10–15 LPA",
    postedDate: "3 days ago",
    applicants: 51,
    description: "Work on both frontend and backend in a fast-paced environment.",
    experience: "3–6 years",
    type: "Hybrid"
  },
  {
    title: "Mobile App Developer",
    slug: "mobile-app-developer",
    order: 4,
    status: "active",
    tags: ["javascript", "react", "design"],
    company: "Appify",
    location: "Pune, India",
    salary: "₹6–10 LPA",
    postedDate: "2 weeks ago",
    applicants: 27,
    description: "Create mobile apps using React Native and modern frameworks.",
    experience: "1–3 years",
    type: "Full-time"
  },
  {
    title: "Data Scientist",
    slug: "data-scientist",
    order: 5,
    status: "active",
    tags: ["python", "sql", "agile"],
    company: "DataLabs",
    location: "Remote",
    salary: "$90k–120k",
    postedDate: "5 days ago",
    applicants: 63,
    description: "Analyze data and build ML pipelines for predictive insights.",
    experience: "2–5 years",
    type: "Full-time"
  },
  {
    title: "ML Engineer",
    slug: "ml-engineer",
    order: 6,
    status: "active",
    tags: ["python", "sql", "docker"],
    company: "AIWorks",
    location: "Hyderabad, India",
    salary: "₹12–18 LPA",
    postedDate: "4 days ago",
    applicants: 40,
    description: "Deploy ML models into production environments.",
    experience: "3–6 years",
    type: "Full-time"
  },
  {
    title: "DevOps Engineer",
    slug: "devops-engineer",
    order: 7,
    status: "active",
    tags: ["docker", "aws", "testing"],
    company: "CloudOps",
    location: "Berlin, Germany",
    salary: "€65k–85k",
    postedDate: "6 days ago",
    applicants: 29,
    description: "Manage CI/CD pipelines and infrastructure automation.",
    experience: "3–6 years",
    type: "On-site"
  },
  {
    title: "QA Tester",
    slug: "qa-tester",
    order: 8,
    status: "archived",
    tags: ["testing", "agile"],
    company: "QualityFirst",
    location: "Mumbai, India",
    salary: "₹5–8 LPA",
    postedDate: "3 weeks ago",
    applicants: 18,
    description: "Test software systems and build automated regression suites.",
    experience: "1–3 years",
    type: "Full-time"
  },
  {
    title: "Product Manager",
    slug: "product-manager",
    order: 9,
    status: "archived",
    tags: ["agile", "design", "testing"],
    company: "NextGen",
    location: "London, UK",
    salary: "£60k–80k",
    postedDate: "1 day ago",
    applicants: 12,
    description: "Define product strategy and coordinate cross-functional teams.",
    experience: "4–8 years",
    type: "Hybrid"
  },
  {
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    order: 10,
    status: "active",
    tags: ["design", "agile"],
    company: "PixelPerfect",
    location: "Remote",
    salary: "$50k–70k",
    postedDate: "5 days ago",
    applicants: 37,
    description: "Design engaging interfaces and improve user experience.",
    experience: "2–5 years",
    type: "Contract"
  },
  {
    title: "Security Analyst",
    slug: "security-analyst",
    order: 11,
    status: "active",
    tags: ["testing", "sql", "aws"],
    company: "SecureNet",
    location: "Singapore",
    salary: "SGD 70k–100k",
    postedDate: "2 weeks ago",
    applicants: 21,
    description: "Perform security audits and penetration testing.",
    experience: "3–5 years",
    type: "Full-time"
  },
  {
    title: "Cloud Architect",
    slug: "cloud-architect",
    order: 12,
    status: "archived",
    tags: ["aws", "docker", "agile"],
    company: "CloudScale",
    location: "Remote",
    salary: "$110k–140k",
    postedDate: "1 month ago",
    applicants: 15,
    description: "Architect scalable solutions using AWS and containerization.",
    experience: "6–10 years",
    type: "Full-time"
  },
  {
    title: "Business Analyst",
    slug: "business-analyst",
    order: 13,
    status: "active",
    tags: ["agile", "sql"],
    company: "BizSolve",
    location: "Noida, India",
    salary: "₹7–12 LPA",
    postedDate: "8 days ago",
    applicants: 33,
    description: "Analyze requirements and support project planning.",
    experience: "2–4 years",
    type: "Full-time"
  },
  {
    title: "Technical Writer",
    slug: "technical-writer",
    order: 14,
    status: "active",
    tags: ["design", "agile"],
    company: "DocuPro",
    location: "Remote",
    salary: "$45k–60k",
    postedDate: "2 days ago",
    applicants: 11,
    description: "Write and maintain clear product documentation.",
    experience: "1–3 years",
    type: "Contract"
  },
  {
    title: "Database Admin",
    slug: "database-admin",
    order: 15,
    status: "active",
    tags: ["sql", "docker"],
    company: "DBMasters",
    location: "Chennai, India",
    salary: "₹9–14 LPA",
    postedDate: "4 days ago",
    applicants: 26,
    description: "Manage and optimize SQL databases and performance tuning.",
    experience: "3–6 years",
    type: "Full-time"
  },
  {
    title: "Game Developer",
    slug: "game-developer",
    order: 16,
    status: "archived",
    tags: ["javascript", "design", "testing"],
    company: "PlayForge",
    location: "Los Angeles, USA",
    salary: "$80k–100k",
    postedDate: "3 weeks ago",
    applicants: 19,
    description: "Develop engaging games with modern web technologies.",
    experience: "2–5 years",
    type: "Full-time"
  },
  {
    title: "AI Researcher",
    slug: "ai-researcher",
    order: 17,
    status: "active",
    tags: ["python", "agile"],
    company: "DeepVision",
    location: "Boston, USA",
    salary: "$120k–150k",
    postedDate: "1 day ago",
    applicants: 8,
    description: "Research and prototype cutting-edge AI models.",
    experience: "4–8 years",
    type: "Research"
  },
  {
    title: "Systems Engineer",
    slug: "systems-engineer",
    order: 18,
    status: "active",
    tags: ["linux", "docker", "aws"],
    company: "SysCore",
    location: "Bangalore, India",
    salary: "₹8–13 LPA",
    postedDate: "1 week ago",
    applicants: 35,
    description: "Maintain system infrastructure and troubleshoot deployments.",
    experience: "3–6 years",
    type: "On-site"
  },
  {
    title: "IT Support Specialist",
    slug: "it-support-specialist",
    order: 19,
    status: "active",
    tags: ["testing", "sql"],
    company: "TechAssist",
    location: "Remote",
    salary: "$35k–50k",
    postedDate: "2 months ago",
    applicants: 22,
    description: "Provide IT support and resolve system issues.",
    experience: "1–3 years",
    type: "Full-time"
  },
  {
    title: "Site Reliability Engineer",
    slug: "site-reliability-engineer",
    order: 20,
    status: "archived",
    tags: ["docker", "aws", "testing"],
    company: "ReliTech",
    location: "Dublin, Ireland",
    salary: "€60k–80k",
    postedDate: "3 days ago",
    applicants: 14,
    description: "Ensure service reliability and monitoring at scale.",
    experience: "3–6 years",
    type: "Full-time"
  },
  {
    title: "Embedded Engineer",
    slug: "embedded-engineer",
    order: 21,
    status: "active",
    tags: ["c", "docker", "testing"],
    company: "EmbedSys",
    location: "Tokyo, Japan",
    salary: "¥7M–10M",
    postedDate: "1 week ago",
    applicants: 17,
    description: "Develop and optimize firmware for embedded systems.",
    experience: "2–5 years",
    type: "On-site"
  },
  {
    title: "Blockchain Developer",
    slug: "blockchain-developer",
    order: 22,
    status: "archived",
    tags: ["nodejs", "javascript", "sql"],
    company: "ChainWorks",
    location: "Remote",
    salary: "$100k–130k",
    postedDate: "2 weeks ago",
    applicants: 25,
    description: "Develop smart contracts and blockchain integrations.",
    experience: "3–6 years",
    type: "Full-time"
  },
  {
    title: "Data Engineer",
    slug: "data-engineer",
    order: 23,
    status: "active",
    tags: ["python", "sql", "aws"],
    company: "DataFlow",
    location: "Amsterdam, Netherlands",
    salary: "€55k–75k",
    postedDate: "6 days ago",
    applicants: 30,
    description: "Build scalable data pipelines and ETL processes.",
    experience: "2–5 years",
    type: "Hybrid"
  },
  {
    title: "Network Engineer",
    slug: "network-engineer",
    order: 24,
    status: "active",
    tags: ["sql", "testing"],
    company: "NetSecure",
    location: "Delhi, India",
    salary: "₹6–10 LPA",
    postedDate: "5 days ago",
    applicants: 28,
    description: "Design and maintain secure network infrastructures.",
    experience: "2–5 years",
    type: "On-site"
  },
  {
    title: "Solutions Architect",
    slug: "solutions-architect",
    order: 25,
    status: "active",
    tags: ["design", "agile", "aws"],
    company: "ArchTech",
    location: "Toronto, Canada",
    salary: "CAD 90k–120k",
    postedDate: "4 days ago",
    applicants: 13,
    description: "Design enterprise-grade solutions for large-scale clients.",
    experience: "6–10 years",
    type: "Full-time"
  }
];

// Insert jobs
  await db.jobs.bulkAdd(jobs);

  // Collect unique tags
  const uniqueTags = Array.from(new Set(jobs.flatMap(j => j.tags)));

  // Insert tags
  const tagIds = {};
  await db.tags.bulkAdd(uniqueTags.map((t) => ({ name: t })));
  const tagsFromDB = await db.tags.toArray();
  tagsFromDB.forEach((t) => { tagIds[t.name] = t.id; });

  // Insert jobTags (many-to-many relationships)
  const jobRecords = await db.jobs.toArray();
  const jobTags = [];
  jobs.forEach((job, i) => {
    const jobId = jobRecords[i].id;
    job.tags.forEach((tag) => {
      jobTags.push({ jobId, tagId: tagIds[tag] });
    });
  });
  await db.jobTags.bulkAdd(jobTags);

  // Candidates


  for (let i = 1; i <= 1000; i++) {
    db.candidates.add({
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      stage: ["applied", "screen", "tech", "offer", "hired", "rejected"][Math.floor(Math.random() * 6)],
      jobId: Math.floor(Math.random() * 25) + 1, // random job
    });
  }

  await db.users.bulkAdd([
    { email: "candidate@test.com", password: "1234", name: "Candidate User", role: "candidate" },
    { email: "hr@test.com", password: "abcd", name: "HR Manager", role: "hr" }
  ]);
  // Settings
  await db.settings.put({ key: "theme", value: "light" });
const assessments = [
  {
  jobId: 1,
  title: "Frontend Developer Assessment",
  form: {
    sections: [
      {
        id: 1,
        title: "JavaScript Basics",
        description: "Test your JS fundamentals",
        questions: [
          {
            id: 101,
            type: "single-choice",
            question: "What does `===` check in JavaScript?",
            required: true,
            options: [
              {
                label: "Only value",
                conditionalQuestion: {
                  id: 1011,
                  type: "short-text",
                  question: "Give an example where value-only comparison can fail.",
                  validation: { maxLength: 100 }
                }
              },
              {
                label: "Value and type",
                conditionalQuestion: {
                  id: 1012,
                  type: "short-text",
                  question: "Why is strict equality better than `==`?",
                  validation: { maxLength: 100 }
                }
              },
              {
                label: "Memory reference",
                conditionalQuestion: {
                  id: 1013,
                  type: "short-text",
                  question: "Which operator is used for reference comparison?",
                  validation: { maxLength: 100 }
                }
              }
            ]
          },
          {
            id: 102,
            type: "short-text",
            question: "Explain event delegation in JavaScript.",
            required: true,
            validation: { maxLength: 150 }
          },
          {
            id: 103,
            type: "numeric",
            question: "What is the result of `parseInt('08')` in older JS versions?",
            validation: { min: 0, max: 20 }
          },
          {
            id: 104,
            type: "multi-choice",
            question: "Which of these are array methods?",
            options: [
              { label: "map()" },
              { label: "filter()" },
              { label: "reduce()" },
              { label: "assign()" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "React",
        description: "Core React concepts",
        questions: [
          {
            id: 105,
            type: "short-text",
            question: "What is JSX?",
            validation: { maxLength: 100 }
          },
          {
            id: 106,
            type: "single-choice",
            question: "Which hook is used for managing state?",
            options: [
              {
                label: "useEffect",
                conditionalQuestion: {
                  id: 1061,
                  type: "short-text",
                  question: "When would you use useEffect for state-like behavior?",
                  validation: { maxLength: 100 }
                }
              },
              {
                label: "useState",
                conditionalQuestion: {
                  id: 1062,
                  type: "short-text",
                  question: "Give an example of initializing state with useState.",
                  validation: { maxLength: 100 }
                }
              },
              {
                label: "useReducer",
                conditionalQuestion: {
                  id: 1063,
                  type: "long-text",
                  question: "When would you use useReducer over useState?",
                  validation: { maxLength: 200 }
                }
              }
            ]
          },
          {
            id: 107,
            type: "long-text",
            question: "Explain reconciliation in React.",
            validation: { maxLength: 300 }
          },
          {
            id: 108,
            type: "multi-choice",
            question: "Which of the following are React lifecycle methods (class)?",
            options: [
              { label: "componentDidMount" },
              { label: "componentDidUpdate" },
              { label: "componentWillUnmount" },
              { label: "onMounted" }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Frontend UI",
        description: "CSS & HTML basics",
        questions: [
          {
            id: 109,
            type: "short-text",
            question: "What does flex:1 mean in CSS Flexbox?",
            validation: { maxLength: 80 }
          },
          {
            id: 110,
            type: "file-upload",
            question: "Upload a screenshot of a UI you built",
            validation: { fileType: "image", maxSizeMB: 2, multiple: false }
          }
        ]
      }
    ]
  }
},

  {
    jobId: 2,
    title: "Backend Developer Technical Assessment",
    form: {
      sections: [
        {
          id: 4,
          title: "Databases",
          description: "SQL and database knowledge",
          questions: [
            {
              id: 201,
              type: "short-text",
              question: "What is the difference between SQL and NoSQL databases?",
              required: true,
              validation: { maxLength: 120 }
            },
            {
              id: 202,
              type: "numeric",
              question: "How many types of normalization forms exist?",
              validation: { min: 1, max: 10 }
            },
            {
              id: 203,
              type: "multi-choice",
              question: "Which of these are SQL commands?",
              options: [
                { label: "SELECT" },
                { label: "INSERT" },
                { label: "FETCH" },
                { label: "UPDATE" }
              ]
            },
            {
              id: 204,
              type: "single-choice",
              question: "Which indexing strategy speeds up queries most?",
              options: [
                { label: "Clustered Index" },
                { label: "Non-Clustered Index" },
                { label: "No Index" }
              ]
            }
          ]
        },
        {
          id: 5,
          title: "System Design",
          description: "Scalability & architecture",
          questions: [
            {
              id: 205,
              type: "long-text",
              question: "Design a URL shortener service like bit.ly. Describe your DB schema and scaling strategy.",
              validation: { maxLength: 500 }
            },
            {
              id: 206,
              type: "short-text",
              question: "What is horizontal scaling?",
              validation: { maxLength: 80 }
            },
            {
              id: 207,
              type: "single-choice",
              question: "Choose the best architecture for high read-heavy systems:",
              options: [
                { label: "Master-Slave replication" },
                { label: "Master-Master replication" },
                { 
                  label: "Sharding",
                  conditionalQuestion: {
                    id: 2071,
                    type: "short-text",
                    question: "When would you NOT use sharding?",
                    validation: { maxLength: 100 }
                  }
                }
              ]
            },
            {
              id: 208,
              type: "multi-choice",
              question: "Which of these are caching solutions?",
              options: [
                { label: "Redis" },
                { label: "Memcached" },
                { label: "Kafka" },
                { label: "ElasticSearch" }
              ]
            }
          ]
        },
        {
          id: 6,
          title: "APIs & Security",
          description: "Web API and security basics",
          questions: [
            {
              id: 209,
              type: "short-text",
              question: "What is an idempotent HTTP method?",
              validation: { maxLength: 120 }
            },
            {
              id: 210,
              type: "file-upload",
              question: "Upload a code snippet implementing JWT authentication",
              validation: { fileType: "document", maxSizeMB: 3, multiple: false }
            }
          ]
        }
      ]
    }
  },

  {
    jobId: 3,
    title: "General Aptitude & HR Assessment",
    form: {
      sections: [
        {
          id: 7,
          title: "Logical Reasoning",
          description: "Basic aptitude questions",
          questions: [
            {
              id: 301,
              type: "numeric",
              question: "If a train travels 60 km in 1.5 hours, what is its average speed?",
              validation: { min: 0, max: 500 }
            },
            {
              id: 302,
              type: "single-choice",
              question: "Which shape has 5 sides?",
              options: [
                { label: "Triangle" },
                { label: "Pentagon" },
                { 
                  label: "Hexagon",
                  conditionalQuestion: {
                    id: 3021,
                    type: "short-text",
                    question: "How many diagonals does this shape have?",
                    validation: { min: 0, max: 20 }
                  }
                }
              ]
            },
            {
              id: 303,
              type: "multi-choice",
              question: "Which of these are prime numbers?",
              options: [
                { label: "2" },
                { label: "3" },
                { label: "4" },
                { label: "5" }
              ]
            },
            {
              id: 304,
              type: "short-text",
              question: "Solve: 15 * 12 = ?",
              validation: { maxLength: 5 }
            }
          ]
        },
        {
          id: 8,
          title: "Verbal Ability",
          description: "English grammar and comprehension",
          questions: [
            {
              id: 305,
              type: "single-choice",
              question: "Choose the correct spelling:",
              options: [
                { label: "Recieve" },
                { label: "Receive" },
                { label: "Receeve" }
              ]
            },
            {
              id: 306,
              type: "long-text",
              question: "Write a short passage about your favorite book.",
              validation: { maxLength: 300 }
            },
            {
              id: 307,
              type: "short-text",
              question: "What is the synonym of 'happy'?",
              validation: { maxLength: 50 }
            },
            {
              id: 308,
              type: "multi-choice",
              question: "Which are articles in English?",
              options: [
                { label: "a" },
                { label: "an" },
                { label: "the" },
                { label: "on" }
              ]
            }
          ]
        },
        {
          id: 9,
          title: "HR Questions",
          description: "Soft skills & motivation",
          questions: [
            {
              id: 309,
              type: "long-text",
              question: "Why do you want to join our company?",
              required: true,
              validation: { maxLength: 300 }
            },
            {
              id: 310,
              type: "file-upload",
              question: "Upload your resume",
              placeholder: "Please upload your CV",
              validation: { fileType: "document", maxSizeMB: 5, multiple: false }
            },
            {
              id: 311,
              type: "single-choice",
              question: "Would you relocate for this job?",
              options: [
                { label: "Yes" },
                { 
                  label: "No", 
                  conditionalQuestion: {
                    id: 3111,
                    type: "long-text",
                    question: "Explain why relocation is not possible.",
                    validation: { maxLength: 200 }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }
];

await db.assessments.bulkAdd(assessments);
}