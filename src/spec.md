# Specification

## Summary
**Goal:** Make the admin dashboard directly accessible from the footer admin button without authentication checks.

**Planned changes:**
- Update the admin button in the ContactFooter component to navigate directly to /admin
- Remove or bypass authentication/authorization checks on the AdminDashboardPage component
- Ensure no access denied screen appears when accessing the admin dashboard

**User-visible outcome:** Users can click the admin button in the footer and immediately access the admin dashboard without encountering any authentication barriers or access denied screens.
