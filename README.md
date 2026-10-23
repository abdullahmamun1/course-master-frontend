# CourseMaster - Frontend
Live Link: https://course-master4981.netlify.app/

Video link: https://drive.google.com/file/d/1vjMrBxr0-7xqjxMX2EBEBw30D_av1pOu/view

A modern E-learning platform frontend built with React, Redux Toolkit, and Tailwind CSS.

**Demo accounts** (created by the backend's `npm run seed`):

| Role | Email | Password |
|---|---|---|
| Admin | admin@coursemaster.com | admin123 |
| Student | student@coursemaster.com | student123 |

The login page has **Admin Fill / Student Fill** buttons that fill in these credentials. The **🎓 Student Portal / 👑 Admin Portal** dev-bypass buttons log in with the same demo accounts and open the matching dashboard, so they need a seeded database.

> **Bug bash:** 56 bugs across the frontend and backend were found, fixed and verified. See [Bug bash fixes](#bug-bash-fixes) below.

## Project Name & Description

**CourseMaster** is a full-featured E-learning platform where students can browse, purchase, and consume courses. The frontend provides an intuitive interface for students to enroll in courses, watch video lectures, complete assignments, and take quizzes. Administrators can manage courses, track enrollments, review assignments, and view analytics through a dedicated admin dashboard.

This is the frontend application of the CourseMaster platform, built with modern React technologies and responsive design principles.

## Technology Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Tailwind CSS + DaisyUI** - Styling
- **Axios** - HTTP client

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd course-master-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory (see `.env.example`)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables (see `.env.example` for reference):

```env
# Backend API Base URL (must end with /api)
VITE_API_BASE_URL=http://localhost:5000/api
# For production, use your deployed backend URL, for example:
# VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

**Required Variables:**
- `VITE_API_BASE_URL` - The base URL of the backend API, including the `/api` prefix (required). Use the port your backend actually runs on (`PORT` in the backend `.env`)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CourseCard/     # Course listing components
│   └── shared/         # Shared components (Navbar, Footer, Logo)
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   ├── CoursePlayer/   # Course video player
│   ├── CousrseDetails/ # Course details page
│   ├── Home/           # Home page with course listing
│   ├── Login/          # Login page
│   ├── Register/       # Registration page
│   └── student/        # Student dashboard
├── routes/              # Route protection components (ProtectedRoute, AdminRoute)
├── services/           # API service functions (one axios instance in api.js)
├── store/              # Redux store and slices
└── utils/              # Utility functions (auth token storage, date helpers)
```

## Features

### Public Features
- Browse courses with pagination, search (on submit), sorting, and category/tag filters (applied after you stop typing)
- View detailed course information
- User registration (with optional admin key) and login
- Light and dark themes

### Student Features
- Enroll in courses, optionally choosing a batch
- Watch video lectures (responsive YouTube player)
- Mark lessons as complete
- Track learning progress on the dashboard
- Submit assignments (text or Google Drive links)
- Take quizzes with immediate score and answer review (correct answers are shown only after submitting)
- The course player is available only for enrolled courses; others show an enroll prompt

### Admin Features
- Dashboard overview with enrollment trend and top-courses chart
- Create, update, and delete courses, with validation for price, titles and quiz questions
- Add course syllabus (modules, lessons, videos, live classes, assignments, quizzes)
- Manage course batches
- Schedule live classes and add Google Meet/Zoom links (Video Classes)
- View all enrollments, filtered by course or student
- Review and grade student assignments
- Manage users: change role, ban/unban, delete
- Analytics (enrollments over the last 30 days)

## API Integration

The frontend communicates with the backend API. All API endpoints are documented in the backend README.

### Key API Endpoints Used:

- **Authentication**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Courses**: `/api/courses` (GET all, GET by ID)
- **Enrollments**: `/api/enrollments/:courseId` (POST), `/api/enrollments/my` (GET)
- **Assignments**: `/api/assignments/submit` (POST), `/api/assignments/my` (GET), `/api/assignments/stats` (GET)
- **Quizzes**: `/api/quizzes/submit` (POST), `/api/quizzes/my` (GET), `/api/quizzes/stats` (GET)
- **Admin**: `/api/admin/courses`, `/api/admin/enrollments`, `/api/admin/assignments`, `/api/admin/analytics`

For complete API documentation with request/response formats, see the [backend README](https://github.com/abdullahmamun1/course-master-backend#readme).

## Development

- Development server runs on `http://localhost:5173` (default Vite port)
- Hot Module Replacement (HMR) is enabled
- ESLint is configured for code quality (`npm run lint`)

## Deployment

The frontend can be deployed to:
- **Netlify**

## Bug Bash Fixes

The project went through a full bug bash. Every fix is a separate commit on `main` with the bug ID in the message, so `git log --oneline` lists them all. Where one commit fixes several bugs, all their IDs are listed. The full report, with steps to reproduce, expected vs actual results, severity, evidence and verification for every bug, is in the [CourseMaster Bug Report](https://docs.google.com/document/d/1Nk1A2tTov8aiVeYTyYsiVXiJO_SywFZ_1XDkKmBBZ-8/edit) (Google Doc). Backend fixes (BE-xx) are listed in the [backend README](https://github.com/abdullahmamun1/course-master-backend#bug-bash-fixes).

| ID | Severity | Fix |
|---|---|---|
| FE-01 | Critical | Login was never remembered: the token was saved and read under different localStorage keys |
| FE-02 | Medium | The dev-bypass Portal buttons used invalid hard-coded tokens; they now log in with the demo accounts |
| FE-03 | Critical | The student dashboard crashed because the enrollments list was read as `.data` (undefined) |
| FE-04 | High | The course details price was shown ×100 |
| FE-05 | High | Choosing a batch sent its list position instead of its `_id`, so enrollment failed |
| FE-06 | High | Quiz and assignment state carried over when switching lessons |
| FE-07 | Medium | "Mark as Complete" never switched to "Completed" |
| FE-08 | Medium | The course player was open to students who weren't enrolled |
| FE-09 | Medium | Dashboard progress showed "NaN%" |
| FE-10 | Medium | The admin area stayed blank when the user check failed; it now redirects |
| FE-11 | Medium | The lesson video was a fixed 300×700 box; it is now a responsive 16:9 player |
| FE-12 | Medium | The mobile menu cut off Dashboard and Logout |
| FE-13 | Low | Every navbar link was always highlighted |
| FE-14 | Low | Dead Profile and About Us links; footer links reloaded the page |
| FE-15 | Low | Long course titles overflowed the card; invalid `<div>` inside `<p>` |
| FE-16 | Low | All quiz questions shared one radio group |
| FE-17 | Low | No "Manage Courses" in the admin sidebar; the mobile admin bar covered content |
| FE-18 | Low | Plain 404 page and generic browser tab title |
| FE-19 | Low | The dashboard "Browse Courses" buttons went to the home page |
| FE-20 | Medium | The Courses page sent duplicate and per-keystroke requests, and searched from the wrong page |
| FE-21 | Medium | The logged-in user wasn't loaded after a reload (admin-only UI disappeared); duplicate requests |
| AD-01 | High | Editing an existing course's syllabus threw "Cannot assign to read only property" |
| AD-02 | High | The edit page showed old data after saving |
| AD-03 | High | A failed course creation still redirected and lost the form |
| AD-04 | High | "+ New Course" could show a leftover message instead of the form |
| AD-05 | High | The "Top Courses by Enrollments" chart never rendered |
| AD-06 | Medium | Blank quiz questions and options could be saved |
| AD-07 | Medium | User emails were unreadable in dark mode |
| AD-08 | Low | The user action menu was clipped on the last rows |
| AD-09 | Low | The assignment review form opened off-screen |
| AD-10 | Low | "..." was added to every assignment answer |
| AD-11 | Low | "+ Add Live Class / Assignment" did nothing for new lessons |
| AD-12 | Medium | A deleted course stayed in the list, and error messages never cleared |
| AD-13 | Medium | Deleting the last course on a page left an empty view with no pager |
| AD-14 | Low | The Update button could be clicked twice while saving |
| AD-15 | Low | Admin fetch errors were hidden; they now show with Retry |
| AD-16 | Medium | Live class times were shown in UTC instead of local time |
| AD-17 | Medium | Adding a Google Meet link overwrote the scheduled class date |
| AD-18 | Low | A hard-coded "+12%" trend was shown as live data |

