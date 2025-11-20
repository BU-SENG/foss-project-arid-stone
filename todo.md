### TODO – Academic Progress Tracker (Group C)

## Phase 1 — Project Setup

- [x] Create project repository & initialize version control
- [x] Set up backend environment (Next.js server functions)
- [ ] Set up database (currently using localStorage)
- [ ] Prepare .env.example environment template
- [x] Initialize frontend (Next.js 16 + React 19)

## Phase 2 — User Authentication (FR-001, FR-002)

- [x] Implement Registration (email + password)
- [x] Implement Login with authentication middleware
- [x] Create login & registration UI pages
- [x] Add form validation & error handling (Valibot)
- [ ] Implement secure session/token storage (currently localStorage)

## Phase 3 — Course Management (FR-003, FR-005)

- [x] API to add new course (course code, title, units, semester)
- [x] API to edit existing course
- [x] API to delete a course
- [x] API to fetch all courses for a user
- [x] Frontend form to add/edit/delete courses
- [x] Input validation (duplicate codes, empty fields)

## Phase 4 — GPA & CGPA Calculation (FR-004)

- [x] Implement grade-to-point conversion
- [x] Implement GPA calculation per semester
- [x] Implement CGPA calculation overall
- [x] Display GPA & CGPA dynamically on dashboard
- [x] Ensure recalculation when grades change

## Phase 5 — Visualization (FR-006)

- [x] Integrate chart library (Recharts)
- [x] GPA trend chart
- [x] Progress-to-graduation progress bar
- [x] Ensure charts load in under 3 seconds

## Phase 6 — AI Insights (FR-007)

- [x] Build AI or rule-based insights engine (Gemini + rule-based)
- [x] Generate academic improvement suggestions
- [x] Display insights on user dashboard
- [x] Ensure insights update dynamically after grade changes

## Phase 7 — PDF Export (FR-010)

- [ ] Create PDF report layout (courses, GPA, CGPA, insights, graphs)
- [ ] Implement PDF generator (jsPDF, PDFKit, Puppeteer)
- [ ] Add "Download Report" button implementation
- [ ] Validate PDF formatting & accuracy

## Phase 8 — Testing

- [x] Backend unit tests (22 tests for GPA utilities)
- [ ] Frontend component tests
- [ ] Integration testing (auth → course management → dashboard → PDF)
- [ ] Performance testing (loading time < 3–5 seconds)
- [ ] Fix bugs & UI inconsistencies

## Phase 9 — Deployment & Documentation

- [ ] Deploy backend (Render, AWS, Railway, etc.)
- [ ] Deploy frontend (Vercel, Netlify)
- [ ] Connect to production database
- [ ] Perform final end-to-end tests
- [x] Write final documentation & user guide (README.md)

---

## Notes

- Storage layer is abstracted for easy migration from localStorage to database
- Authentication currently uses localStorage - needs secure backend for production
- PDF export button exists but functionality not implemented yet
- All core features (Phases 2-6) are complete and functional