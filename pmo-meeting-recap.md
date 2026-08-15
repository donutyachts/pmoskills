---
name: pmo-meeting-recap
description: Reconcile a PM's own light meeting notes against the Gemini/AI notes and transcript, write a strict-format recap (Conclusions, Decisions, Changes, Problems, Risks, Dependencies, Action items, Things to know), get the PM's approval, then post it as a threaded reply under that meeting's agenda message in the project's Slack channel — following the HostPapa PMO's meeting cadence. Use whenever the user has their own scratch notes from a meeting plus Gemini/Google Meet notes or a transcript and wants a reconciled recap written up and posted — e.g. "cross-check my notes against the Gemini notes and post the recap," "here's my scratch notes and the AI transcript, write up this meeting," "post the recap for today's sync." The point is catching what the PM missed while staying present in the meeting, not just summarizing a transcript. Never posts without explicit approval. Part of the pmo- family; the recap it posts is exactly what pmo-slack-notion-sync later mines for the workbook.
---

# PMO Meeting Recap

## Why this exists

The PM's practice is to stay light on notes during the meeting — a few words under a handful of headings — so attention stays on running the meeting, not transcribing it. That only works if what happens afterward is reliable: going back through the agenda, writing an actual conclusion for each item, and cross-checking against the Gemini/AI notes to catch anything missed. That reconciliation step, done well, is also a comprehension check — writing the conclusion yourself is how the PM confirms they understood what happened, not just attended it.

This skill is that reconciliation-and-write-up step, not the meeting itself. It has no way to help with facilitating the discussion or staying present — that's entirely the PM's job, and the reason light notes are viable in the first place. What it can do is make sure the after-the-fact part is fast and consistent enough that it never becomes the reason to fall back to heavier note-taking live, or to skip the cross-check when time is short.

The recap's category headings (Decisions, Changes, Problems, Risks, Dependencies, Action items) aren't arbitrary — they match the project workbook's own tabs. That's deliberate: this is what `pmo-slack-notion-sync` reads later to populate the workbook, so writing in that shape now is what makes the next step possible.

## Inputs

- **The PM's own scratch notes** from the meeting — typically short, a few words per topic, not full sentences.
- **Gemini Notes transcript and notes** — every meeting runs on Google Meet with Gemini Notes enabled by default, so this always exists, as a Google Doc attached to the meeting's calendar invite. Ask the PM directly for the link. Don't go searching Calendar for the right invite yourself — picking the correct meeting out of everyone's calendar is exactly the kind of ambiguous lookup this skill avoids elsewhere, same as the agenda link below.
- **Notion's AI meeting notes** — a second, independent transcript/notes source, captured by Notion's own AI meeting tool. It isn't a standalone doc; it's an entry in the project workbook, tagged **Meetings** in the Category property. Ask the PM directly for the link to this specific entry rather than searching the workbook for it — the workbook likely holds many meetings' worth of entries, and guessing which one matches is a search problem, not a lookup. Use it as a second cross-check source alongside the Gemini notes when it's available.
- **The meeting's agenda** — needed to structure the reconciliation. If it isn't provided, ask for it before proceeding — don't reconstruct an agenda from the notes themselves.
- **The Slack URL of the agenda message** — always ask the user for this directly. Don't search the channel for it and don't guess which message it is; that precision is a later refinement, not something to attempt now.

## Step 1: Get the agenda message URL

Ask the user for the Slack link to this meeting's agenda message before doing anything else. If they confirm there genuinely wasn't a formal agenda posted for this meeting, note that and plan to post the recap as a new message instead (see Step 5) — but don't go looking for the link yourself either way.

## Step 2: Reconcile the notes

Work through the agenda item by item to build the **Conclusions**:

1. Start from the PM's scratch notes for what was decided or concluded on that topic.
2. Check the Gemini notes/transcript, and the Notion AI meeting notes if that entry is available, for that same topic — fill in anything the scratch notes missed, and note if any of the sources genuinely conflict (not just differ in wording). A real conflict is worth flagging to the PM directly rather than silently picking one version — this applies whether it's scratch-notes-vs-AI or the two AI sources disagreeing with each other.
3. Write one concise bullet per item — what was decided or where things landed, not a blow-by-blow of the discussion.
4. If an agenda item never actually got addressed, say so plainly (`Not addressed in this meeting`) rather than skipping it — a topic that didn't get covered is itself useful information, not a gap to paper over.

Then go back through the same reconciled material — both what came from agenda items and anything substantive that came up off-agenda — and sort anything that fits into these categories, regardless of which agenda item it came from:

- **Decisions** — something the group actually decided.
- **Changes** — a change to scope, plan, timeline, or approach.
- **Problems** — an issue or blocker that surfaced.
- **Risks** — something flagged as a risk to watch, not yet a problem.
- **Dependencies** — a new dependency on another team, vendor, or external factor that surfaced — something the project now relies on that it didn't clearly rely on before, or a known dependency that got confirmed or changed.
- **Action items** — a task assigned to someone, ideally with who owns it.
- **Things to know** — a learning, or something new and non-obvious that came up that isn't already common knowledge on the project.

A single moment in the meeting can show up in more than one place — a decision that resolves a risk belongs under both Conclusions (as part of that agenda item) and Decisions. Only include a category if something genuinely fits it; don't force content into a bucket just to fill it out. Don't manufacture content out of small talk or tangents.

## Step 3: Assemble the recap

Use exactly this structure — the emoji, the bold labels, and the section order are all fixed, not stylistic choices to vary:

```markdown
:writing_hand: Brief notes from today's sync

**Conclusions**
- [one bullet per agenda item, or "Not addressed in this meeting" for any that weren't covered]

**Decisions**
- [bullet per decision — omit this section entirely if none applied]

**Changes**
- [bullet per change — omit this section entirely if none applied]

**Problems**
- [bullet per problem — omit this section entirely if none applied]

**Risks**
- [bullet per risk — omit this section entirely if none applied]

**Dependencies**
- [bullet per dependency — omit this section entirely if none applied]

**Action items**
- [bullet per action item — omit this section entirely if none applied]

**Things to know**
- [bullet per learning/non-obvious item — omit this section entirely if none applied]
```

Only the "Conclusions" section is always present — it's the one part of the recap that always has something to say, even if only "Not addressed in this meeting" entries. Every section after it is genuinely optional and should be left out entirely (not included with "None") when nothing in the meeting fits it.

## Step 4: Get approval before posting anything

Always show the assembled recap to the user and ask for explicit approval before it goes to Slack — this is not optional and there's no version of this skill that posts without it. Treat this as a real review, not a formality: let the user edit wording, add or remove bullets, reclassify something into a different section, or reject a bullet outright, and re-assemble based on their changes. Only proceed to Step 5 once they've clearly approved the content as ready to post.

## Step 5: Post to Slack

- **Thread under the agenda message** from Step 1, using the link the user gave you.
- **If there's no agenda message** (the user confirmed none existed), post the recap as a new message in the project channel instead.
- **Confirm with a link** to the posted message once it's up.
- **If Slack isn't connected in this session**, say so plainly and give the user the approved recap so they can post it themselves.

## Explicitly out of scope

Don't write anything into Notion or the project workbook — that's `pmo-slack-notion-sync`'s job, working from the recap this skill posts. This skill stops at Slack. Reading the workbook's Meetings-tagged entry as a cross-check source (per Inputs) is fine; writing to the workbook is still entirely out of scope.

Don't resolve a genuine conflict between the scratch notes and the AI notes yourself — flag it and let the PM decide, since silently picking a version is exactly the kind of smoothing-over this methodology is trying to avoid.

Don't search for any of this meeting's three links yourself — the Slack agenda message, the Gemini Notes doc, or the Notion AI meeting notes entry. Ask the PM directly for all three. Each one requires picking the right item out of many similar ones (the right channel message, the right calendar invite, the right workbook entry), and the PM already knows which one applies without any lookup at all. Don't post without the user's explicit approval of the content, either — both rules are firm boundaries, not defaults to fall back from when convenient.

Don't schedule anything or reference future meetings — same boundary as the rest of the pmo- family.
