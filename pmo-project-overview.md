---
name: pmo-project-overview
description: Turn notes from the initial one-on-one between a PM and the project sponsor/requestor into a structured project overview and team roster, then create it as a child subpage under the project's Notion node — following the HostPapa PMO project-initiation methodology. Use whenever the user has notes, a transcript, or a recap from that initial "what is this project" meeting and wants a project overview, summary, or Notion "entry point" page from it — e.g. "turn these notes into a project overview," "summarize this intake call for the project page," "draft the overview for the WordPress migration project." Asks for the project node URL and publishes as a subpage there. This overview is shared at the later team kickoff call (see `pmo-kickoff-scheduler`) — this skill is the sponsor meeting that precedes it, not the kickoff. First skill in the pmo- family; other pmo-* skills cover later stages (team intake, scheduling, meeting recaps, Slack/Notion sync, project registry).
---

# PMO Project Overview

## Why this exists

The PMO's standard practice for starting a project is a single one-on-one meeting between the PM and whoever is requesting it — the project sponsor. This is a different meeting from the team kickoff call: the kickoff (handled by `pmo-kickoff-scheduler`) happens later, once the team roster is confirmed, and marks the project's formal start with everyone involved. The sponsor meeting comes first, and its whole purpose is producing the overview that gets shared at that kickoff — it's preparation for the kickoff, not the kickoff itself.

The core of the sponsor meeting is a fixed set of intake questions — what the project is, why it matters, what happens if it doesn't get done, plus a few more that round out what a PM actually needs before work starts: how success is judged, when it needs to land, what's already known to be a constraint or risk, and what's still unresolved. The answers become the project's overview — the page anyone lands on to understand the project at a glance — and the same conversation usually surfaces which teams need to be pulled in. The PM doesn't write this by hand; they hand the meeting notes to Claude and ask for the overview directly. This skill is that step, made repeatable.

The goal of the overview is orientation, not completeness. It should let someone with zero context read the answers and a name list and understand what the project is, what it's aiming for, and who's on it.

## When you're handed notes

You'll typically get one of: a Gemini/Google Meet transcript, a Notion notes page, or the user pasting in rough text or bullet points from the meeting. Treat all of these the same way — read through for content, not format.

## Step 1: Answer the intake questions

Read the notes looking specifically for the answers to:

1. **What is this project about?** — a plain-language description of what's being built, changed, or delivered.
2. **Why are we doing it?** — the underlying motivation or business reason, not just "because we were asked to."
3. **What happens if we don't complete it?** — the cost of inaction: risk, missed opportunity, dependency on it, or a stated deadline/consequence.
4. **What does success look like?** — the observable outcome that would let the requestor say this is done and it worked, not just "we shipped it." If the notes only describe a deliverable and never say what it's supposed to achieve, that's worth flagging rather than restating the deliverable as if it were the success measure.
5. **What's the timeline or target date?** — any deadline, launch date, or time constraint mentioned, and whether it's a hard date (tied to an external event) or a soft target.
6. **What constraints or risks are already known?** — anything flagged upfront as a limitation, dependency, technical constraint, or risk to watch. This is about what's known going in, not a full risk register — a couple of sentences is normal, and "none mentioned" is a fine answer if the notes really don't raise any.
7. **What's still open or unresolved?** — questions the group didn't answer in the meeting, decisions still pending, or dependencies on something outside the requestor's control (another team's decision, a vendor, a prior project). This is distinct from constraints/risks: constraints are known facts to work around, open items are things nobody has settled yet.

Answer each in a tight paragraph (2-4 sentences, shorter is fine) using only what's actually in the notes. Don't pad a thin answer with generic project-management language to make it look complete — a short, honest answer is more useful than an inflated one.

**If the notes don't clearly answer one of these**, don't guess or infer a plausible-sounding answer. Write `**Not covered in the notes** — ask the requestor: ` followed by a specific question that would close the gap (e.g., "what's the deadline or consequence if this slips?"). This matters more than it might seem: the whole point of this step is that the PM can trust the overview reflects what was actually said, not a smoothed-over version of it. A flagged gap is a prompt for a follow-up; a fabricated answer is a silent error that surfaces much later. Questions 6 and 7 are the two most likely to legitimately come back empty ("none mentioned" / "nothing outstanding") — that's a real answer, not a gap, so don't force the "not covered" flag onto a topic the notes simply had nothing to say about. Reserve the flag for the questions this sponsor conversation would normally be expected to cover.

## Step 2: Build the team roster

Separately from the three questions, scan the same notes for any team, department, or named individual identified as needing to be involved — people invited to the meeting because their group is affected, teams mentioned as needing to review or build something, or anyone explicitly assigned a piece of the work.

List them by team/role where the notes support it (e.g., "Engineering — API integration," "Marketing — launch messaging"), and by name where a specific person was identified. If the notes don't identify anyone yet, say so plainly rather than inventing a generic list — an empty roster is a real, useful signal that team identification still needs to happen.

## Step 3: Assemble the content

Use exactly this structure — this is what gets written to Notion in Step 4 below, or handed to the user directly if Notion isn't available:

```markdown
# [Project Name]

## What is this project about?
[answer, or the "not covered" flag]

## Why are we doing it?
[answer, or the "not covered" flag]

## What happens if we don't complete it?
[answer, or the "not covered" flag]

## What does success look like?
[answer, or the "not covered" flag]

## Timeline
[answer, or the "not covered" flag]

## Known constraints or risks
[answer, or "None mentioned in the notes."]

## Open questions / dependencies
[answer, or "Nothing outstanding raised in the notes."]

## Team Roster
- [Team/Role — scope of involvement, or Name if specified]
- ...
(or: "Not yet identified in the notes — needs follow-up.")
```

If the notes don't give you a clear project name, propose a short working title based on the content and note in one line that it's a placeholder the PM should rename.

## Step 4: Publish to Notion

The overview isn't done until it's actually sitting in Notion as its own subpage — that's the whole point of the "entry point" in the methodology, and the PM shouldn't have to copy-paste it in by hand.

- **Ask for the destination.** If the user hasn't already given you the Notion URL, ask for the project node — the project's hub page (titled with the project name), not the overview itself. Don't guess at it, search for it, or assume a page based on the project name — writing to the wrong page is a real mistake, and a company this size has no shortage of similarly-named pages. If the node URL was already established earlier in this conversation — for instance, the PM just ran `pmo-project-registry` for this same project — reuse that link rather than asking a second time.
- **The overview always lives as a child subpage of the project node, never written onto the node page itself.** The node is meant to stay a clean hub — title, a project-manager property, the steps database, the project workbook, and this overview subpage as its children — consistent with how `pmo-project-registry` expects that page to be structured. Writing the overview directly onto the node instead of into its own subpage breaks that structure for every downstream check.
  - **Look for an existing overview subpage** under the node (e.g., titled "Project Overview"). If it's empty or clearly an unfilled template, write the content straight into it.
  - **If it already has real content** that isn't just a placeholder, stop and ask the user whether to replace it, append below what's there, or create a fresh subpage instead — don't silently overwrite existing work.
  - **If no overview subpage exists yet**, create a new child subpage under the project node, titled "Project Overview", and write the content there.
- **Confirm with a link.** Once it's written, give the user the direct Notion link to the subpage so they can check it immediately — "done" on its own isn't enough.
- **If Notion isn't connected in this session**, say so plainly rather than implying the write happened, and give the user the formatted overview from Step 3 so they can paste it in themselves.

## Explicitly out of scope

Do not schedule anything — no team kickoff call, no planning sessions, no calendar coordination. That's a separate stage of the PMO's process, handled by `pmo-kickoff-scheduler` once the team roster from this skill is confirmed. This skill stops at producing the overview and roster; if the user asks you to also line up meetings from the same notes, tell them that's `pmo-kickoff-scheduler`'s job, not this one's.

Similarly, don't build out the full project workbook (action items, risks, schedule of steps, etc.) — that's a later stage of the methodology and belongs to a different skill. This one is scoped to the entry-point overview only.
