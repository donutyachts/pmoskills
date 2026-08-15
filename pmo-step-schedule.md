---
name: pmo-step-schedule
description: Preps a project's Notion Steps database ahead of the team-intake 1:1s by carrying forward applicable steps and learnings from similar past projects (found via the Project Manager property), plus a specific previous plan or steps database if the PM has one — then keeps the schedule current from weekly sync notes posted in the project's Slack channel. Follows the HostPapa PMO's steps-not-tasks methodology — steps are deliverables, not task chains. Use when a PM wants to prep for team 1:1s by reusing what applies from past projects, or wants statuses refreshed from this week's Slack sync. Triggers include "find past projects like this and carry forward what applies," "prep the steps database before I meet the teams," "update the schedule from this week's sync." Doesn't write team-confirmed deliverables or propose milestones — pmo-planning-synthesis owns that once deliverables are confirmed. Asks for the destination Notion URL. Part of the pmo- family with pmo-project-overview and pmo-planning-synthesis.
---

# PMO Step Schedule

## Why this exists

The PMO used to build schedules the traditional way: a spreadsheet or Gantt chart with a task for every sub-action, because the process wasn't documented anywhere else and the schedule became the only record of it. The example that drove the change: a legal-review chain tracked as five separate tasks — draft the SOW, review it, send it, get partner feedback, get it signed — when the only thing that actually mattered, week over week, was the last one: is it signed. All that granular process tracking added rows without adding anything anyone actually used to manage the project.

The fix is to schedule **steps**, not tasks. A step is a deliverable — a thing that either exists or doesn't, is done or isn't — not a blow-by-blow of how it got produced.

This skill's other job, distinct from the discipline above, is timing: a PM walking into individual team 1:1s cold is starting from a blank page every time, even though similar work has usually been done before. So before those meetings happen, this skill searches out what's reusable from past projects and seeds the schedule with it — the PM shows up to team intake already able to get into the weeds, instead of discovering everything for the first time in the room. Once deliverables are actually confirmed (team intake) and refined (planning sessions), `pmo-planning-synthesis` is what adds those specific steps and proposes milestones — this skill's prep work stops at what can reasonably be carried forward from history.

## Core rules

These apply whether you're carrying forward steps from history or updating existing ones:

1. **Call them steps, kept in execution order** — not tasks, not a WBS with subtask trees.
2. **Each step is deliverable-oriented.** Its description covers what it is, why it matters, and what happens if it doesn't get done — not a decomposition of the work into smaller tracked pieces.
3. **Collapse process chains into their outcome.** If a set of items are really just the sequential mechanics of producing one thing (draft → review → send → get feedback → sign), that's one step, named for the final state that matters (e.g., "Engineering Project Charter Signed"), not five rows — whether that chain came from a legacy plan, a previous project's steps database, or a similar project's already-completed steps.
4. **Process detail, if it's worth keeping at all, lives in a separate document** — never as extra rows bolted onto the schedule. This skill can flag that a separate process doc might be worth writing; it doesn't write one unprompted.
5. **Status tracking stays simple.** A step is Not Started, In Progress, or Done, with a completion date logged when it moves to Done. Don't add duration calculations, dependency logic, or extra date columns by default — only if the PM asks for them for a specific project.

## Step 1: Figure out which mode applies

- **Preparing ahead of team 1:1s** — run after `pmo-project-registry` and after the sponsor 1:1 (`pmo-project-overview`), but before the individual team-intake meetings (`pmo-team-member-intake`). Seeds the schedule with whatever's reusable from similar past projects before those meetings happen.
- **Updating a schedule** — the user has this week's sync notes posted in the project's Slack channel and an existing steps schedule that needs its statuses refreshed.

If it's not clear which one the user means, ask before starting — they touch the schedule very differently, and guessing wrong means redoing the work.

## Mode A: Prepare the schedule ahead of team 1:1s

### A1: Find similar past projects

Search Notion for other project nodes with the current PM named in the Project Manager property — ask whose name to match if it isn't already clear from context. Present what turns up (project name, and a brief description if the node has one) and ask the PM which of these, if any, are actually comparable to the current project. **Don't score or guess similarity yourself** — matching by Project Manager only narrows the field; judging which of those are genuinely similar work is the PM's call, not something to infer from project titles.

### A2: Pull candidate steps and learnings from the confirmed-similar projects

For each project the PM confirms as comparable:

- **Open its Steps database** and identify steps that might carry forward to the current project — present these as candidates, not as something to add automatically.
- **Check its Project Workbook for entries tagged Learnings** in the Category property, and surface any that seem to apply to the current project. This is a prep briefing for the PM, not project data — don't write it into the current project's Notion anywhere; if the PM wants a specific learning kept on record for this project, that's their call to make directly.

### A3: Ask about a specific previous plan or steps database

Separately from the search above, ask the PM directly whether there's a specific previous plan (spreadsheet, Gantt export, old task list, Notion page) or a specific previous project's steps database they already know they want to reuse — this can supplement or override whatever A1/A2 turned up. Don't skip this just because the search found something; the PM may have a better source in mind than whatever surfaced automatically.

### A4: Convert into steps

Apply Core Rules 2-3 to whatever material was gathered (carried-forward steps, an explicit previous plan, or a previous steps database): collapse process chains into single deliverable-outcome steps, and note what got merged into each one so the PM can catch a bad merge. Order the result by execution sequence.

If nothing turned up — no comparable past projects, no explicit previous source — say so plainly and hand back an empty schedule ready for team intake and `pmo-planning-synthesis` to fill in later. Don't fabricate carried-forward steps that don't exist.

### A5: Populate the steps database in Notion

By the time this skill runs, the project's Notion structure — including the steps database itself — should already exist; setting that up happens earlier (see `pmo-project-registry`). This skill populates an existing, possibly-seeded steps database — it does not create the database from scratch.

- **Get the steps database URL.** Check the project node's "Data Repositories" section first — if `pmo-project-registry` has already run for this project, that section records the Steps Database link directly; use it, and tell the user you're using the registered link so a stale entry doesn't go unnoticed. Otherwise ask the user directly for the Notion URL — don't guess, search, or create a new one.
- **Confirm it's actually the steps database before writing.** Open it and check that it looks like a database/table with the expected shape. If it doesn't look right, stop and check with the user.
- **Check whether it already has step rows.** Recurring rows like "Go / No-Go," "E2E testing," "Create plan," or "Define strategy" showing up already is normal — this database is commonly seeded with a standard starting set. Add the carried-forward steps alongside these, don't replace them, unless the PM says otherwise.
- **Write one page/row per carried-forward step**, using: Step Name (title), Status (select: Not Started / In Progress / Done — new steps start Not Started), Completed Date (date, left blank), Team (select — tag it only if the step's team is already obvious and matches the confirmed roster; otherwise leave blank rather than guess, since team intake hasn't happened yet), and Assignee (left blank). There's no Order property — execution sequence is set by each row's physical position, not a number field.
- **Position each row where it belongs in the sequence**, immediately after the step that precedes it.
- **Create each step's page from the database's "Step - Template,"** not a blank page, and populate its headings by what each is actually for: **Description** (what the step is), **Impact** (what happens if it isn't done or there's a problem), **Action to take** (itemized checklist — this is where a collapsed process chain gets itemized), **Deliverable** (left for whoever completes the step to fill in — don't fabricate a placeholder), **Updates** (left empty at creation).
- **Present the candidate steps for approval before writing anything.** This is prep work, not a finished schedule — the PM should see exactly what's being carried forward and why (which past project it came from) before it lands in Notion.
- **Confirm with a link** to the database once populated.
- **If Notion isn't connected in this session**, say so and hand the user a plain markdown list of the carried-forward steps and any surfaced learnings instead, so they can still walk into team 1:1s prepared.

This mode doesn't write team-confirmed deliverables as their own steps, and doesn't propose milestones — see Explicitly out of scope.

## Mode B: Update a schedule

### B1: Get the destination

Check the project node's "Data Repositories" section (from `pmo-project-registry`) for a recorded Steps Database link first, same as in A5; otherwise ask for the Notion URL directly.

### B2: Read the weekly sync notes from the project's Slack channel

Get the project's Slack channel the same way — check the registry first, then ask directly. Read what was posted there for this week's sync, whatever form it's in: a `pmo-meeting-recap` post, its `pmo-slack-notion-sync`'d workbook entries, or plain notes someone posted directly in the channel. Read for what actually changed: what got finished, what's blocked, what's newly in progress.

For each match, update that step's Status (and Completed Date, if it moved to Done) — don't rebuild the schedule from scratch.

If the notes describe a substantive update on a step (progress, a blocker, a change in plan) rather than just a status flip, log it on that step's page in the **Updates** section, using the page's **"Add update" button** — that's the mechanism this template expects, not a manually typed block.

Don't turn process chatter from the sync into new granular rows. Only add a new step if the notes describe a genuinely new deliverable-level piece of work that isn't already on the schedule — applying the same collapsing judgment as A4.

If the notes mention risks, decisions, blockers, or action items that aren't schedule status updates, don't fold them into the schedule — flag them to the user as belonging in the project workbook instead, via `pmo-slack-notion-sync` or a direct Notion edit.

### B3: Confirm

Report back what changed — which steps moved to which status — and give the link to the database so the PM can verify.

If Notion or Slack isn't connected in this session, say so and give the user the list of status changes to apply manually.

## Explicitly out of scope

Don't write team-confirmed deliverables as their own steps, and don't propose milestones — both are `pmo-planning-synthesis`'s job, once deliverables are actually confirmed (team intake) and refined (planning sessions). This skill's Mode A is prep from history, not the finished schedule.

Don't create the project's Notion structure itself (project node, steps database, workbook, Slack channel) — that setup happens before this skill runs.

Don't write anything into the project workbook — reading the Slack channel for sync notes (B2) is fine, but decisions, changes, problems, risks, dependencies, action items, and learnings all live in the workbook and are `pmo-slack-notion-sync`'s job to write there, not this skill's.

Don't score or infer similarity between past projects algorithmically — surfacing candidates by Project Manager match is as far as this skill goes automatically; judging genuine similarity is the PM's call.

Don't write surfaced learnings into Notion anywhere — they're a prep briefing for the PM, not project data, unless the PM explicitly asks for one to be recorded somewhere.

Don't schedule meetings or calls — same boundary as the rest of the pmo- family.
