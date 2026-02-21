# Specification

## Summary
**Goal:** Build Phase 1 of the Admin Dashboard with a comprehensive User Assessment Data Table, Quick Stats Cards, and CSV export functionality to enable administrators to view, search, filter, sort, and export all wellness assessment data.

**Planned changes:**
- Create User Assessment Data Table component displaying all wellness reports with columns for Name, Assessment Date, Total Score (0-160), section-wise scores (Sleep, Gut, Movement, Mind), WhatsApp Number, and Email
- Add search functionality to filter table by user name in real-time
- Implement date range and score range filters for the data table
- Add column sorting with clickable headers for Name, Assessment Date, Total Score, and individual section scores
- Implement pagination with 10-20 entries per page and navigation controls
- Create Quick Stats Cards section showing Total Assessments Completed, Average Score, Users Needing Immediate Attention (Alert status), and Recent Submissions (last 7 days)
- Add CSV export functionality that exports all filtered assessment data to a downloadable file with timestamp
- Add backend query function getAllWellnessReports() in main.mo to return all stored wellness reports
- Update AdminDashboardPage.tsx to replace placeholder content with the new components
- Create React Query hook useAdminAssessments in useQueries.ts for fetching wellness reports data with caching

**User-visible outcome:** Administrators can access a fully functional dashboard to view all user wellness assessments in a searchable, filterable, sortable data table with key statistics displayed in cards at the top, and export filtered data to CSV for external analysis.
