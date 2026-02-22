# Specification

## Summary
**Goal:** Fix the Complete Assessment button to properly submit assessment data to the backend and navigate users to the Wellness Report page.

**Planned changes:**
- Fix Complete Assessment button click handler in Section4.tsx to trigger submission process
- Ensure assessment data is successfully submitted to Motoko backend via actor.submitAssessment()
- Implement automatic navigation to Wellness Report page after successful submission
- Verify submitted assessments appear in Admin Dashboard after submission

**User-visible outcome:** Users can successfully complete and submit their wellness assessments. After clicking Complete Assessment, they are automatically redirected to view their Wellness Report with calculated scores. Submitted assessments immediately appear in the Admin Dashboard.
