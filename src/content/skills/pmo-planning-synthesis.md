---
title: Planning Synthesis
stage: Planning
order: 7
summary: Turn planning-session transcripts into a documented strategy and plan (WBS) against the Steps database, write confirmed team deliverables as step rows, and propose milestones.
sourceFile: pmo-planning-synthesis.md
related:
  - pmo-step-schedule
  - pmo-kickoff-scheduler
  - pmo-meeting-recap
---

## When it triggers

Use this once a project's planning sessions have wrapped and you want the strategy and plan written up and the schedule finished — turning whatever came out of those sessions into the documents and steps the rest of the process expects to find.

## What it does

- Reads the planning-session meeting entries you point it to and drafts two documents: a strategy (the agreed approach, key decisions, and tradeoffs) and a plan (every team's deliverables, sequenced, with dates) — flagging anything the sessions left too thin or vague rather than inventing detail.
- Shows you both drafts before writing anything, and only writes what you approve.
- Attaches the approved strategy and plan as pages under the Steps database's seeded "Define a strategy" and "Create a plan" rows.
- Turns the plan's deliverable list into actual step rows in the Steps database — one row per deliverable, tagged by team — picking up where `pmo-step-schedule`'s prep run left off.
- Steps back once the schedule is complete and proposes a handful of real milestones (not an even split of step count), shown for your approval before anything is written, always prefixed "Milestone:".

## Inputs & outputs

- **You provide:** links to the planning-session meeting entries in the project workbook (asked for directly, not searched for), and ideally the Project Overview and team-intake outputs to check deliverables and milestones against.
- **You get:** a strategy document and a plan document attached in the Steps database, new step rows for every confirmed deliverable, and a set of proposed milestones written into the schedule once approved.
