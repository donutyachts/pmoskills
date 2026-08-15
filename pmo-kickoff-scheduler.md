---
name: pmo-kickoff-scheduler
description: Given a confirmed project team roster, propose and send calendar invites for two distinct scheduling moments in a project's life — the kickoff call with the sponsor and full team (run once team feedback from pmo-team-member-intake is resolved), and the bundled block of planning sessions plus the recurring weekly sync (run once the kickoff call has happened). Never sends a single invite without showing the complete proposed batch first and getting explicit approval. Use whenever the user wants meetings scheduled to move a project forward — e.g. "schedule the kickoff call for this project," "set up the planning sessions and weekly sync now that kickoff happened," "get invites out for the WordPress migration team." This is the automation the PMO methodology was actively prototyping, not an established process — it stays conservative on purpose. Part of the pmo- family, downstream of pmo-project-overview and pmo-team-member-intake.
---

# PMO Kickoff Scheduler

## Why this exists

A project moves through two distinct scheduling moments before regular execution begins, and they happen at different points for different reasons — this skill handles both, but never blurs them into one invocation.

The **kickoff call** is where the sponsor and the whole team align on the Project Overview together, for the first time, as a group. It only makes sense to book once the individual team-feedback meetings (`pmo-team-member-intake`) have happened and any conflicts or open questions from those meetings have been resolved on the Project Overview — otherwise the group is aligning on a document that's still actively in dispute.

The **planning sessions and weekly sync** come after that: once the kickoff call has aligned everyone on the overview, the team needs a block of working sessions to actually build the strategy and plan, and then a standing weekly cadence once that plan exists. These two are scheduled together, as one batch, because the weekly sync's start date is derived directly from when the planning sessions are expected to finish — there's no reason to make the PM run this twice.

Both flows share the same underlying risk: calendar invites reach every attendee the moment they're sent — there's no quiet draft state the way there is with a Slack message or a Notion page. So this skill is built to move fast right up until the point of actually sending anything, and to stop hard there until a human has looked at the whole plan.

## Inputs

- **The team roster** — names/emails of who needs to be involved, typically from `pmo-project-overview`'s output, or given directly.
- **The project sponsor's contact** (Flow A only) — the kickoff call aligns the sponsor and the team together, so the sponsor is a required attendee alongside the roster, not optional. Ask if it isn't already known from earlier in the conversation.
- **Project name and context** — used in meeting titles/descriptions so invites are self-explanatory.
- **A preferred start window**, if the user has one (e.g., "starting next week," a specific date range). If not given, ask before searching calendars — don't assume "as soon as possible" without confirming.
- **Which flow to run.** If the user's request doesn't make it obvious (e.g., "schedule this project's meetings" without saying which), ask whether this is the kickoff call or the planning-sessions-and-weekly-sync batch — the two aren't interchangeable and running the wrong one wastes a round of invites.

## Flow A: Kickoff call

One meeting, aligning the sponsor and the full team on the Project Overview.

### A1: Confirm the shape before searching calendars

- **One meeting, 30 minutes.**
- **Attendees: the full team roster plus the project sponsor.** Confirm this with the user rather than assuming it silently — some projects may want a smaller subset, and that's the user's call, not a guess.

### A2: Find candidate times

Using available calendar tools, check attendee availability (including the sponsor) and propose specific times. Prefer times that work for everyone; if full availability can't be found within the preferred window, say so explicitly and propose the best available compromise rather than silently picking a time that conflicts for someone.

If calendar availability can't be checked for one or more attendees (access issue, or an attendee outside the connected calendar), flag exactly who and propose times based on whoever's availability is visible — don't guess at their schedule.

**If Google Calendar isn't connected in this session**, say so plainly rather than attempting to fabricate plausible-looking times, and instead help the user work out the time manually: ask about known constraints, propose times based on what they tell you, and hand off a plain-text proposal they can check against real calendars themselves.

### A3: Present for approval

Show the proposed time and full attendee list (roster + sponsor) for the user to adjust or approve. **Do not send the invite until the user has explicitly approved it.**

### A4: Send the invite

Once approved, create the calendar event for exactly what was approved. Confirm back with a summary: the time and the full attendee list.

**If Google Calendar isn't connected in this session**, there's nothing to send — say so plainly and give the user the approved details as text, rather than reporting it as sent.

## Flow B: Planning sessions + weekly sync

One combined batch: the four planning sessions, and the recurring weekly sync whose start date depends on when they finish.

### B1: Confirm the shape before searching calendars

- **Planning sessions:** four sessions, 60 minutes each, spaced across business days as close together as calendars allow — the goal is a completed plan quickly, not planning sessions dragging across many weeks.
- **Weekly sync:** a single recurring meeting, 30 minutes, starting the week after the last planning session's *scheduled* end date — not after the plan is actually finished in the real world. If the planning sessions later slip, that's a separate reschedule; this skill computes the sync's start from the schedule it's proposing right now.
- **Attendees:** default to the full roster for both the planning sessions and the weekly sync, and confirm this with the user rather than assuming it silently — some rosters may need a smaller subset for planning specifically.

Don't search for times until this shape is confirmed — changing attendee lists or session count after times are already found means redoing the search.

### B2: Find candidate times

Using available calendar tools, check attendee availability and propose specific times for each of the four planning sessions and the weekly sync's recurring slot (start date derived from the last planning session as described above). Prefer times that work for everyone; if full-team availability can't be found within the preferred window, say so explicitly and propose the best available compromise rather than silently picking a time that conflicts for someone.

If calendar availability can't be checked for one or more attendees, flag exactly who and propose times based on whoever's availability is visible — don't guess at their schedule.

**If Google Calendar isn't connected in this session**, say so plainly rather than attempting to fabricate plausible-looking times, and instead help the user work out the schedule manually.

### B3: Present the full batch for approval

Show the four planning sessions and the weekly sync together as one plan, not piecemeal approvals. Let the user adjust anything: move a specific time, change attendees, change session count or duration, drop the weekly sync, or reject the batch entirely and ask for a re-search.

**Do not send a single invite until the user has explicitly approved the batch as a whole.** This is the one non-negotiable step in this skill — there is no version of it that sends invites speculatively "to save a round trip." If the user only approves part of the batch (say, the planning sessions but not the weekly sync yet), send only what was approved and hold the rest.

### B4: Send the invites

Once approved, create the calendar events for exactly what was approved — no additions, no substitutions. Confirm back with a summary: each meeting, its time, and its attendees.

If something in the approved batch fails to send (a conflict appeared between proposal and send, an attendee's calendar rejected it, etc.), stop and report specifically what failed rather than silently sending a partial batch and reporting success.

**If Google Calendar isn't connected in this session**, there's nothing to send — say so plainly and give the user the approved schedule as text so they can create the invites themselves, rather than reporting the batch as sent.

## Explicitly out of scope

Don't schedule anything beyond the approved meetings in whichever flow was run — no adding extra meetings, and no rescheduling or canceling existing calendar events unless the user explicitly asks.

Don't decide on your own that "enough time has passed" to run Flow B after Flow A, or Flow A after team-intake meetings — the PM invokes each flow when they're ready; this skill doesn't track project timing itself.

Don't write anything to Notion or Slack — this skill's output is calendar invites only. Logging that these meetings were scheduled is a separate, manual step (or a future skill), not part of this one.

Don't treat "the PMO was excited about this automation" as license to skip the approval gate — the enthusiasm in the methodology was about speed once approved, not about skipping the check.
