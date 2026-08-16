---
title: Step Schedule
stage: Scheduling prep
order: 5
summary: Prep the Steps database ahead of team 1:1s by carrying forward applicable steps and learnings from similar past projects; later keeps the schedule current from weekly Slack sync notes.
sourceFile: pmo-step-schedule.md
related:
  - pmo-team-member-intake
  - pmo-kickoff-scheduler
  - pmo-planning-synthesis
---

## When it triggers

Two different moments call for this. Use it before team-intake 1:1s, to walk in already prepared instead of starting from a blank page. Later, use it again whenever this week's sync notes are posted in the project's Slack channel and the schedule's statuses need refreshing.

## What it does

- **Before team 1:1s:** finds past projects with the same PM, asks you which are actually comparable, then pulls candidate steps and relevant learnings from those you confirm. It also asks whether you already have a specific prior plan or steps database you want carried forward. Everything gets shown to you for approval before anything is written.
- Collapses multi-step process chains (draft → review → sign) into one deliverable-oriented step, named for the outcome that matters — not a row per sub-action.
- **From a weekly sync:** reads what changed in this week's notes and updates just the matching steps' status (and completion date), without rebuilding the schedule. Only adds a new row if the notes describe a genuinely new deliverable, not process chatter.
- Never scores project similarity itself, never proposes milestones, and never writes team-confirmed deliverables as steps — that's `pmo-planning-synthesis`'s job once those are actually confirmed.

## Inputs & outputs

- **You provide:** which mode you mean (prep vs. update); for prep, which past projects are genuinely comparable; for updates, this week's sync notes and the steps database link (or it's pulled from the registry).
- **You get:** a populated or updated Steps database in Notion, and — if nothing was reusable — an honest empty schedule ready for team intake and planning to fill in.
