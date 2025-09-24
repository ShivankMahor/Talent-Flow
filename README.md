# TalentFlow – A Mini Hiring Platform 🚀

A lightweight **frontend-only hiring platform** built with React.  
TalentFlow helps HR teams manage **Jobs**, **Candidates**, and **Assessments** – with persistence in IndexedDB and a mock API powered by MirageJS/MSW.  

---

## ✨ Features

### 🔹 Jobs
- Create, edit, archive/unarchive jobs.
- Paginated job list with search & filter (title, status, tags).
- Reorder jobs via drag-and-drop with optimistic updates & rollback on failure.
- Job detail route: `/jobs/:jobId`.

### 🔹 Candidates
- Virtualized candidate list (1,000+ seeded).
- Client-side search (name/email) + stage filter.
- Candidate profile with timeline of status changes & notes with `@mentions`.
- Kanban board view – drag & drop candidates between stages.
- Stage transitions persisted to IndexedDB.

### 🔹 Assessments
- Assessment builder per job:
  - Multiple sections.
  - Question types: single-choice, multi-choice, short/long text, numeric with range, file-upload (stub).
- Live preview pane (fillable form).
- Conditional logic (e.g., show Q3 only if Q1 === "Yes").
- Validation rules: required, numeric range, max length.
- Candidate responses stored locally.
- Preloaded sample assessments (Frontend, Backend, Aptitude).

### 🔹 Other Features
- Optimistic UI updates with rollback on errors.
- Artificial latency (200–1200ms) & 5–10% write error simulation.
- Toast notifications for feedback.
- Reusable UI components: `Card`, `Button`, `Badge`, `Loader`, etc.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite, React Router v6  
- **State Management:** React Context API + custom hooks  
- **Persistence:** IndexedDB via Dexie.js  
- **Mock Backend:** MirageJS / MSW  
- **Drag & Drop:** dnd-kit  
- **Styling:** TailwindCSS  
- **Icons:** Lucide React  
- **Notifications:** React Toastify  

---

## 📂 Project Structure

src/
├── components/ # Shared UI components
├── features/
│ ├── jobs/ # Job board, details, context
│ ├── candidates/ # Candidate board, profile
│ └── assessments/ # Builder, preview, runtime
├── context/ # Context providers
├── db/ # Dexie schema & seeding
├── server/ # MirageJS routes & handlers
└── app/ # Routing, global providers


---

## ⚙️ Setup & Installation

```bash
# Clone repo
git clone https://github.com/ShivankMahor/Talent-Flow
cd talentflow

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
npm run preview

```

## 🌱 Seeding & Mock Data

- Jobs: 25 (mixed active & archived)
- Candidates: 1,000 randomly assigned across jobs & stages
- Assessments: At least 3 with 10+ questions each
- MirageJS injects latency (200–1200ms) + error rate (5–10%)
- IndexedDB used for persistence across reloads
- 🔗 Routes
- /jobs → Jobs board with pagination & filters
- /jobs/:id → Job detail page
- /candidates → Virtualized candidate list
- candidates/:id → Candidate profile with timeline & notes
- /board → Kanban board (drag & drop)
- /assessments/:jobId → Assessment builder & runtime

## 👥 Demo Accounts

- **HR Manager** → hr@test.com / abcd

## 🏗 Architecture & Decisions

- IndexedDB (Dexie) chosen for persistence instead of localStorage (better schema + queries).

- MirageJS/MSW simulates REST API endpoints (/jobs, /candidates, /assessments) with latency + errors.

- React Context API used for jobs, candidates, board, and assessments.

- Optimistic updates with rollback on failed writes.

- Reusable components for consistent UI across features.

## ⚠️ Known Issues / Limitations

- IndexedDB data is per-browser (cleared if storage is wiped).
- File upload is only a stub (no real storage).
- Authentication is mock-only (no real security).

## 🚀 Future Improvements

- Real backend integration (Express/Nest + PostgreSQL).
- Authentication & role-based access.
- Resume/file uploads to storage (S3, Cloudinary).
- Analytics dashboards (charts of hiring funnel).
- Auto-grading for assessments.


## 📎 Deliverables

✅ Deployed App Link [(Vercel)](https://talent-flow-kappa.vercel.app/login)

✅ GitHub Repository Link [(Github)](https://github.com/ShivankMahor/Talent-Flow)