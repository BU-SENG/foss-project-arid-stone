### TODO – Academic Progress Tracker (Group C)

## Phase 1 — Project Setup


- Create project repository & initialize version control
-  Set up backend environment (Node/Python/Java — team decision)
-  Set up database (MySQL / MongoDB / PostgreSQL — team decision)
- Prepare .env.example environment template
- Initialize frontend (React / Flutter / Vue — team decision)


## Phase 2 — User Authentication (FR-001, FR-002)


- Implement Registration (email + password)
- Implement Login with authentication middleware
- Create login & registration UI pages
- Add form validation & error handling
- Implement secure session/token storage

## Phase 3 — Course Management (FR-003, FR-005)


- API to add new course (course code, title, units, semester)
- API to edit existing course
- API to delete a course
- API to fetch all courses for a user
- Frontend form to add/edit/delete courses
- Input validation (duplicate codes, empty fields)


## Phase 4 — GPA & CGPA Calculation (FR-004)
- Implement grade-to-point conversion
-  Implement GPA calculation per semester
- Implement CGPA calculation overall
- Display GPA & CGPA dynamically on dashboard
- Ensure recalculation when grades change


## Phase 5 — Visualization (FR-006)
- Integrate chart library (Chart.js, Recharts, ApexCharts)
- GPA trend chart
- Progress-to-graduation progress bar
- Ensure charts load in under 3 seconds


## Phase 6 — AI Insights (FR-007)
- Build AI or rule-based insights engine
- Generate academic improvement suggestions
- Display insights on user dashboard
- Ensure insights update dynamically after grade changes


## Phase 7 — PDF Export (FR-010)
- Create PDF report layout (courses, GPA, CGPA, insights, graphs)
- Implement PDF generator (jsPDF, PDFKit, Puppeteer)
- Add “Download Report” button
- Validate PDF formatting & accuracy


## Phase 8 — Testing
- Backend unit tests
- Frontend component tests
- Integration testing (auth → course management → dashboard → PDF)
- Performance testing (loading time < 3–5 seconds)
- Fix bugs & UI inconsistencies


## Phase 9 — Deployment & Documentation
- Deploy backend (Render, AWS, Railway, etc.)
- Deploy frontend (Vercel, Netlify)
- Connect to production database
- Perform final end-to-end tests
- Write final documentation & user guide
