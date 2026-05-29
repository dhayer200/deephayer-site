---
title: admittr
summary: Data-grounded college admissions. Swipe to discover, see admission probability against real applicants.
year: "2026"
status: building
order: 30
stack: [Next.js 14, TypeScript, Neon Postgres, Prisma, Tailwind, shadcn/ui]
links:
  github: https://github.com/dhayer200/admittr
tags: [admittr, education, ml]
---

A "chance me" that does not rely on Reddit. Students fill a profile, get per-college admission probability estimates blending a strength score with similarity-weighted historical outcomes, and see up to 20 comparable applicants with their actual results.

## Latest

Growing the applicant dataset and improving probability calibration. Transfer-student onboarding now handles GPA, credits, and transfer reasons separately.

## Status

End-to-end flow working in dev. Calibration is the bottleneck; outcomes data is the input I am farming.
