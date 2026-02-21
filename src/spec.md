# Specification

## Summary
**Goal:** Add internal test mode with three predefined test profiles to verify pattern analysis, solution tips, and medical history integration.

**Planned changes:**
- Create backend test functions that generate three profiles (Healthy: scores 30-40, no medical history; Moderate: scores 21-30, BP history; Serious: scores 0-20, Sugar and BP history) with realistic score patterns across all 40 questions
- Add backend verification functions that process each test profile through pattern analysis engine and log results to console (low-scoring questions, patterns, solution tips, medical history effects)
- Create frontend Test Mode page (internal-only) that displays all three test profiles with their complete analysis results in visual format matching existing results page design

**User-visible outcome:** Developers can access an internal Test Mode page showing three test profiles with complete wellness analysis results to verify the pattern detection and solution tip generation is working correctly across different health scenarios.
