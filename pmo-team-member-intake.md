---
name: pmo-team-member-intake
description: Turn notes or a transcript from a PM's one-on-one with a contributing team member (or several members of the same team), held after the initial project-sponsor meeting, into a structured capture of what that person confirmed, contributed, and needs — then create it as a new page in Notion and flag any genuine conflicts or unresolved questions directly on the Project Overview, following the HostPapa PMO's team-onboarding process. Use whenever the user has notes from a one-on-one with someone who will actually do the work on a project (as opposed to the sponsor/requestor) and wants it turned into a project record — e.g. "here's my call with the engineering lead, capture this," "turn these notes from my one-on-one with Design into the intake," "I met with two people from Data, write up what we got." Asks for the destination Notion URL and creates the page there rather than just returning text. Part of the pmo- family alongside pmo-project-overview.
---

# PMO Team Member Intake

## Why this exists

`pmo-project-overview` captures the sponsor's account of a project — what it is, why it matters, what happens if it doesn't get done. But the sponsor isn't the person doing the work, and their account is one perspective. The PMO's practice is to follow that meeting with a separate one-on-one with each team or team member who will actually contribute, both to bring them up to speed and — just as important — to pressure-test and complete the picture from the side of the people who'll execute it.

This matters more when the PM doesn't know the domain. The methodology's guiding rule applies directly here: the PM isn't trying to learn or dictate how a team does its work, they're trying to establish enough shared understanding to track deliverables against. So this meeting isn't really about process for its own sake — it's about confirming contribution, deliverables, what a team needs to do their part, and what it'll cost them, using just enough process context to make that tracking possible.

## Inputs

- **Team-member meeting notes or transcript** (required) — from the one-on-one itself.
- **Sponsor overview** (recommended) — the output of `pmo-project-overview`, or equivalent sponsor notes, for the same project. Without it, you can't check for gaps against the sponsor's account (item 3 below) or confirm what was actually briefed (item 1) — say so plainly in the output rather than skipping those sections silently.
- **Domain-familiarity flag** — is this a domain the PM already knows well, or one they're new to? If the user doesn't say, ask before writing the output; don't guess, since it changes how much weight items 5-8 get. If they've said elsewhere in the conversation that they're new to this space, that's enough — no need to ask again.

## Step 1: Capture the meeting in eight parts

Work through the notes looking for these eight things. They're listed in the order the PMO uses them, but pull from wherever in the notes the information actually shows up — real conversations don't follow the list in order.

1. **Project briefing given** — what was actually communicated to this person about the project, based on the sponsor's overview. A short recap, not a re-explanation of the whole overview.
2. **Feedback or questions raised** — whatever the team member reacted to, pushed back on, or asked about, in their own terms.
3. **Gaps versus the sponsor's account** — anything this person flagged, corrected, or raised that the sponsor didn't mention in their one-on-one. This is the check that the sponsor's picture was complete; it requires the sponsor overview as a comparison point.
4. **New dependencies, risks, or open questions** — information this person surfaced that's genuinely new, not already captured from the sponsor meeting.
5. **Confirmed contribution** — what this person or their team is actually signed up to do on this project, in their own words.
6. **Deliverables** — the concrete thing(s) they'll produce. Per the methodology's core principle, this is what actually gets tracked — capture it precisely.
7. **Inputs, sources, and process** — what information or materials they need to do their part, who provides it to them, and a light-touch description of their team's process (just enough to understand the workflow, not a full process map — the PM tracks the deliverable, not the process). Close this out by revisiting item 6: does understanding their inputs and process change or refine what their deliverable actually is? Note the revalidated deliverable if it shifted.
8. **Workload impact** — how taking this on affects their current capacity, in whatever terms they gave (bandwidth, competing priorities, timeline concern).

**If the notes don't address one of these**, flag it as `**Not covered in the notes**` with a specific follow-up question, the same way `pmo-project-overview` handles gaps — don't invent a plausible-sounding answer. Item 3 has its own null case: if there's genuinely no sponsor overview to compare against, write `**Cannot assess — no sponsor overview provided for comparison**` instead of guessing at what might be a gap.

### Depth: familiar vs. unfamiliar domain

- **Unfamiliar domain**: give items 5 through 8 the most space and the most follow-up questions when something's thin — contribution, deliverables, inputs/process, and workload impact are the foundation the PM is building from scratch here, since there's no prior understanding to fall back on. Items 1-4 can stay brief.
- **Familiar domain**: keep all eight roughly even. The PM already understands the space, so this meeting is more about confirming what's already assumed and catching anything new (updates to risks, workload, or scope) than deep discovery.

## Step 2: Handle multiple people in one meeting

If the notes cover more than one team member (e.g., two people from the same team interviewed together), items 1-4 are usually shared context for the group — write them once unless the notes show the two people disagreeing or reacting differently. Items 5-8 are person-specific: give each person their own block, since contribution, deliverables, inputs, and workload impact will differ even within the same team.

## Step 3: Assemble the content

This is what gets created in Notion in Step 4 below, or handed to the user directly if Notion isn't available:

```markdown
# Team Intake — [Project Name] — [Team/Person Name(s)]

**Domain familiarity:** [Familiar / Unfamiliar to the PM]

## 1. Project briefing given
[recap, or the "not covered" flag]

## 2. Feedback or questions raised
[summary, or "None raised."]

## 3. Gaps versus the sponsor's account
[gaps found, "No gaps identified," or the "cannot assess" flag]

## 4. New dependencies, risks, or open questions
[new items, or "Nothing new beyond the sponsor meeting."]

## 5. Confirmed contribution — [Person/Team]
[answer, or the "not covered" flag]

## 6. Deliverables — [Person/Team]
[answer, or the "not covered" flag]

## 7. Inputs, sources, and process — [Person/Team]
- Inputs needed: [...]
- Provided by: [...]
- Process (brief): [...]
- Revalidated deliverable: [same as #6 / updated to: ...]

## 8. Workload impact — [Person/Team]
[answer, or the "not covered" flag]

(Repeat sections 5-8 per person if the meeting covered multiple team members.)
```

## Step 4: Publish to Notion

This intake isn't finished until it's actually captured in Notion, not just returned as text — each one-on-one becomes its own record.

- **Default the destination to the project node.** Ask for the Notion URL of the project node — the same hub page `pmo-project-overview` and `pmo-project-registry` use — unless the PM says intake records live somewhere else for this project. If the node URL is already known from earlier in this conversation (e.g., the PM just ran `pmo-project-registry` or another pmo- skill for this project), reuse it rather than asking again. Don't guess it or search for it if it hasn't been given.
- **Check for a matching page first.** If the PM reruns this skill for the same meeting (say, to correct or add something), creating a fresh duplicate every time clutters the project. Before creating anything, check whether a page titled `Team Intake — [Project Name] — [Team/Person Name(s)]` already exists under that destination. If it does, ask whether to update that page instead of creating a new one.
- **Otherwise, create a new child page** at the given destination, titled `Team Intake — [Project Name] — [Team/Person Name(s)]`, and write the Step 3 content into it.
- **Confirm with a link.** Once the page is created or updated, give the user the direct Notion link so they can check it right away.
- **If Notion isn't connected in this session**, say so plainly and hand the user the Step 3 content to paste in manually instead.

## Step 5: Flag conflicts and open questions on the Project Overview

The Team Intake page from Step 4 is this meeting's own record, but two things from it also belong directly on the Project Overview page, so nobody has to open a separate page to see them:

- **Genuine conflicts (item 3).** For any Project Overview heading where this team's account genuinely conflicts with what the sponsor said — not just adding detail the sponsor didn't mention, an actual disagreement — add a visible flag under that heading (e.g., a callout: "⚠️ [Team] feedback conflicts with this — see [link to the Team Intake page]"). Don't flag a heading just because this team added something new; that's not a conflict.
- **Open questions (items 2 and 4).** Any question this team raised that didn't get resolved in the meeting goes under an "## Open Questions" heading on the Project Overview page — create that section if it doesn't exist yet, or append to it if it does. Attribute each question to the team/person who raised it, and check what's already listed there before adding, so the same question doesn't get duplicated across multiple teams' meetings.

Find the Project Overview page the same way `pmo-project-overview` does — the child subpage titled "Project Overview" under the project node used as this skill's destination in Step 4. If it can't be found, say so plainly and give the user the flags/questions as text instead of silently skipping this step.

**If Notion isn't connected in this session**, this step obviously can't happen — say so alongside the same note from Step 4, rather than reporting it as done.

## Explicitly out of scope

Don't build the full project workbook entry (action items, schedule steps, timeline) from this meeting — that's `pmo-step-schedule`'s job, working from the deliverables this skill captures. This one is scoped to capturing this specific one-on-one cleanly and surfacing conflicts/questions on the overview — it doesn't touch the Steps database or the workbook.

Don't schedule any follow-up meetings — same boundary as `pmo-project-overview`.
