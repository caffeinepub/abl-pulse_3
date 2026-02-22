# Specification

## Summary
**Goal:** Connect the Admin Dashboard to the backend database to display real assessment data and statistics.

**Planned changes:**
- Implement backend query functions to retrieve all submitted assessments with complete details (student name, score, answers, timestamps)
- Implement backend function to calculate dashboard statistics (total assessments, average score, alert users, recent submissions)
- Update frontend useQueries hooks to fetch real data from backend instead of returning empty arrays
- Connect QuickStatsCards component to display actual statistics from backend
- Connect UserAssessmentDataTable to display real assessment submissions with working filters, sorting, and pagination

**User-visible outcome:** Admin dashboard displays real assessment submissions in the table, accurate statistics in the stat cards, and all filtering/sorting features work with actual data from the backend database.
