---
title: Meeting Recap
stage: Cadence
order: 8
summary: Reconcile a PM's own meeting notes against Gemini/AI notes and the transcript into a strict-format recap, then post it to the project's Slack channel after approval.
sourceFile: pmo-meeting-recap.md
related:
  - pmo-planning-synthesis
  - pmo-slack-notion-sync
---

## When it triggers

Use this after any meeting where you kept light scratch notes and want them reconciled against the Gemini/AI notes and transcript, written up, and posted — a weekly sync, a working session, any recurring meeting on the project.

## What it does

- Works through the meeting's agenda item by item, starting from your scratch notes and filling in anything missed using the Gemini notes and Notion AI meeting notes, if available.
- Flags it plainly if an agenda item was never actually addressed, and flags it directly to you if two sources genuinely conflict, rather than silently picking one version.
- Sorts everything reconciled into a fixed set of categories — Decisions, Changes, Problems, Risks, Dependencies, Action items, Things to know — leaving out any section that has nothing in it.
- Shows you the full assembled recap and waits for explicit approval — including your edits, reclassifications, or removals — before it goes anywhere.
- Posts the approved recap as a threaded reply under the meeting's agenda message in Slack (or as a new message if there wasn't one).

## Inputs & outputs

- **You provide:** your own scratch notes, the Gemini Notes link, the Notion AI meeting notes entry (if there is one), the agenda, and the Slack link to the agenda message.
- **You get:** a recap posted in the project's Slack channel — the same recap `pmo-slack-notion-sync` later reads to populate the project workbook.
