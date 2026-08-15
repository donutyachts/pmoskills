---
name: pmo-planning-synthesis
description: Turn planning-session meeting transcripts into a documented strategy and plan (WBS), attached under the Steps database's seeded "Define a strategy"/"Create a plan" rows; write each team's confirmed deliverable as its own step row (using pmo-team-member-intake outputs, refined by planning); then propose milestones from the finished schedule and the Project Overview. Use once a project's planning sessions have happened and the PM wants the schedule finalized — e.g. "write up the strategy and plan from planning and finish the schedule," "turn the planning notes into our WBS and propose milestones." Asks the PM directly for the relevant Project Workbook entries rather than searching for them. Shows drafts and proposed steps/milestones for approval before writing. Part of the pmo- family, downstream of pmo-team-member-intake and pmo-kickoff-scheduler's Flow B, and of pmo-step-schedule's prep run.
---

# PMO Planning Synthesis

## Why this exists

Planning sessions are where a project's strategy and plan actually get worked out — but the output lives scattered across however many sessions it took, as transcripts and AI-generated notes, not as the clean documents and finished schedule the rest of the methodology expects to find. The Steps database is seeded with a "Define a strategy" row and a "Create a plan" row specifically to hold the two documents; this skill turns the planning-session record into what belongs in each row.

The two rows aren't equivalent, though. "Define a strategy" is satisfied by documentation alone — the strategy explains the approach, and that's the whole deliverable. "Create a plan" is satisfied by documentation that *also functions as* a list of steps to add to the Steps database — the plan isn't just describing work, it's the source list this skill turns into actual step rows.

It also finishes the schedule itself. `pmo-step-schedule`'s prep run seeds the Steps database from history before team 1:1s ever happen, but it deliberately stops there — it doesn't know what a team is actually delivering yet. By the time planning sessions wrap, that's confirmed and refined, so this is the point where each team's deliverable becomes its own step row, and where milestones finally get proposed against a schedule that's actually complete.

All of this draws from the same planning-session material and naturally happens together once planning is done, which is why it's one skill rather than three.

## Inputs

- **The planning-session meeting entries** (required) — the Project Workbook rows (tagged **Meetings** in the Category property) that hold each planning session's transcript/notes. **Ask the PM directly for these links rather than searching the workbook for them** — same reasoning as the rest of this family: picking the right handful of meeting entries out of a workbook that logs every meeting is a disambiguation problem regardless of how deterministic their storage location is (see `pmo-meeting-recap`'s Gemini Notes / Notion AI notes convention). If there were multiple planning sessions, ask for all of their links up front rather than one at a time.
- **The Project Overview** (recommended) — for the strategy's framing and for proposing milestones, since both are only meaningful against the goals/objectives the project is meant to achieve. If it isn't available, proceed but say plainly that the strategy and milestones weren't checked against the overview's stated goals.
- **`pmo-team-member-intake` outputs** (recommended) — each team's confirmed deliverable, for both the plan document and the step rows below. If some teams' intakes aren't available, work from what the planning-session notes describe directly and flag which teams' deliverables couldn't be cross-checked.

## Step 1: Pull the planning-session content

Read through the provided meeting entries for what was actually decided and described — not everything discussed, since planning sessions cover false starts and abandoned options too. Look specifically for:

- **For the strategy:** the agreed approach to delivering the project's goals and objectives — the "how," including any key decisions, tradeoffs, or assumptions the group settled on. Anchor this against the Project Overview's stated goals/objectives where available.
- **For the plan and step rows:** every team's deliverables as discussed in planning (cross-check against `pmo-team-member-intake` outputs where available — planning sessions sometimes refine a deliverable further than the original 1:1 did), how they sequence against each other, and any start/end dates or durations the group agreed on.

If either document's source material is thin on a specific point (an unresolved tradeoff, a deliverable with no discussed timing), flag it as `**Not covered in the planning sessions** — confirm with the PM` rather than inventing a plausible-sounding answer.

## Step 2: Draft the strategy document

Write a strategy document covering: the project's goals/objectives (from the Project Overview, if available), the agreed approach to achieving them, key decisions and tradeoffs made during planning, and any assumptions or risks the group explicitly addressed. This should read as the answer to "how are we actually going to deliver this," not a restatement of the overview or a rehash of the plan's deliverable list.

**This document is pure documentation, nothing more.** Unlike the plan below, nothing in the strategy document gets turned into Steps-database rows — it explains the approach, it doesn't enumerate work.

## Step 3: Draft the plan (WBS)

Write a plan listing every team's deliverables, sequenced in execution order, each with its start and end dates as agreed in planning. This is the same "deliverables, not tasks" discipline `pmo-step-schedule` applies to the Steps database — list the deliverable a team is producing, not the granular process behind it.

**This document is documentation *and* a to-do list, and that's the point.** Unlike the strategy document, the plan's deliverable list isn't just descriptive — it's the definitive list of steps this skill turns into actual Steps-database rows in Step 6. Write it with that dual purpose in mind: every deliverable named here should be specific and singular enough to become its own step row, not a loose grouping that would need to be split apart later. If planning sessions left a deliverable too vague to make a clean step (e.g., "Engineering will handle the backend somehow"), flag it as `**Not covered in the planning sessions** — confirm with the PM` here rather than writing an ambiguous line that Step 6 can't cleanly convert.

## Step 4: Present the strategy and plan drafts for approval

Show the full strategy document and the full plan together before writing anything to Notion. Let the PM edit, correct, or reject either one — nothing gets written to the Steps database until both are approved (approving one while revising the other is fine; write only what's approved).

## Step 5: Attach each document as an inline page under its Steps database row

- **Get the Steps database URL.** Check the project node's "Data Repositories" section first; if it's not there, ask the PM directly rather than guessing or searching.
- **Find the "Define a strategy" row and the "Create a plan" row.** These are seeded rows that should already exist in the Steps database before this skill runs. If either is missing, say so plainly and ask the PM how to proceed — don't create a replacement row yourself.
- **Add the approved document as a new inline page under that row's existing "Deliverable" section** — don't overwrite or replace anything already there; append it. This is the same "Deliverable" heading that means "proof the step is complete," so the inline page you're adding *is* that proof for these two steps.
- **The two rows' deliverables aren't the same kind of thing, and shouldn't be treated that way.** "Define a strategy"'s deliverable is the strategy document, full stop — attaching it is the entire job for that row. "Create a plan"'s deliverable is the plan document *and* the reason the Steps database gains new rows in Step 6 below — attaching the plan document here doesn't complete that row's real-world purpose on its own.
- **Confirm with links** to both updated rows once written.

## Step 6: Turn the plan's step list into Steps-database rows

This is the step that actually finishes the schedule `pmo-step-schedule`'s prep run started, and it's a direct continuation of Step 3 — not a separate pass over the intakes. **Every row this step writes should trace back to a line in the approved plan document.**

- **For each deliverable listed in the approved plan** (which already reflects `pmo-team-member-intake`'s confirmed deliverables, refined by anything planning sessions changed — see Step 1), write a new row named for the deliverable itself — e.g., a Marketing deliverable of "update the product page" becomes a step titled "Update product page," not "Marketing."
- **Tag each step with its team in the Team property.** Check the property's existing options first; reuse a match if one exists, or create a new option named exactly for the team if not.
- **Leave Assignee blank** — the PM assigns that manually.
- **Use the same properties and template as the rest of the database:** Step Name (title), Status (Not Started), Completed Date (blank), Team (per above), Assignee (blank). Create each page from the **"Step - Template,"** populating **Description** (what it is), **Impact** (what happens if it isn't done or there's a problem), **Action to take** (itemized checklist — this is where any inputs the team identified as needed also go, as their own to-do items), **Deliverable** (left for whoever completes the step — don't fabricate a placeholder), and **Updates** (left empty at creation).
- **Position each new row where it belongs in the sequence**, alongside the prep steps `pmo-step-schedule` already seeded and the database's other seeded rows (e.g., "Go / No-Go," "E2E testing") — there's no Order property; sequence is physical row position.
- **Present the proposed step rows for approval before writing**, same as the documents in Step 4.
- **If Notion isn't connected in this session**, hand the user a clean markdown table of the steps (with team tags and any identified inputs) instead.

## Step 7: Propose milestones

Once Step 6's steps are written, step back and look at the full schedule — prep steps, the strategy/plan rows, and the new deliverable steps together — alongside the Project Overview, and propose a handful of milestones: points in the schedule that mark real progress, not an even split of the step count. A good milestone corresponds to one or more steps reaching a state the overview would recognize as meaningful (e.g., "all Engineering deliverables signed off," "public launch messaging approved"), not an arbitrary calendar checkpoint.

- If the Project Overview isn't available, propose milestones from the schedule alone, but say plainly that they weren't cross-checked against the project's stated success criteria.
- **Present the proposed milestones before writing anything**: what the milestone is, which step(s) mark it reached, and why it's meaningful. Let the PM adjust, drop, or add milestones.
- **Once approved, write each milestone as a new row in the Steps database itself**, positioned physically where it falls in the sequence, same as any step.
- **Always prefix the Step Name with "Milestone:"** (e.g., "Milestone: All Engineering deliverables signed off") — this is how milestone rows are distinguished, not a property to add.
- If the PM only approves some of the proposed milestones, write only those — don't record the declined ones anywhere.
- **If Notion isn't connected in this session**, give the PM the proposed milestones as text instead of writing anything.

## Explicitly out of scope

Don't create the "Define a strategy" or "Create a plan" rows if they don't exist, and don't create the Steps database itself — that setup happens earlier (see `pmo-project-registry` and `pmo-step-schedule`'s prep run). Flag either gap to the PM instead of working around it.

Don't touch any step this skill didn't write, and don't mark any row's Status as Done — that's the PM's call, or a later `pmo-step-schedule` Mode B update from a weekly sync, not something this skill infers from writing a deliverable or a milestone.

Don't search Google Drive, Calendar, or the workbook for the planning-session entries — always ask the PM directly for those links, per Inputs above.

Don't re-propose milestones on a later run just because the schedule changed — if it's drifted enough to look stale, flag that to the PM rather than silently regenerating them (same rule `pmo-step-schedule` Mode B follows).

Don't schedule any meetings — same boundary as the rest of the pmo- family.
