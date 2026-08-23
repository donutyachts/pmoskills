---
title: Link Harvest
stage: Cadence
order: 10
summary: Sweep a Slack channel over a date range — including thread replies — for document links never logged in the Project Workbook, and add each as a categorized, deduped row.
sourceFile: pmo-link-harvest.md
related:
  - pmo-slack-notion-sync
---

## When it triggers

Use this when the Project Workbook needs to catch up on links shared in a channel over some stretch of time — a tracker spreadsheet, a spec, a ticket — that scrolled past without getting logged. Unlike `pmo-slack-notion-sync`, which pulls structured content out of one recap message, this skill sweeps an entire channel across a date range, catching links shared mid-conversation or buried in thread replies that never made it into a recap.

## What it does

- Pulls the full channel history for the given date range, paginating as needed, then reads every thread with replies in full — links shared deep in a reply count as much as ones in a parent message.
- Filters out links that just point back to other Slack messages, keeping only genuine documents: Docs/Sheets/Slides, Notion pages, Jira/Atlassian tickets, Confluence pages, external sites, attached files.
- Resolves each candidate link's real title and the exact sender/timestamp that shared it (the reply's timestamp, not the thread parent's), rather than reusing whatever text the sender happened to link.
- Checks the workbook's existing rows and URL property first, comparing underlying identifiers rather than raw strings so a `?usp=sharing` variant of an already-logged link doesn't get re-added.
- Categorizes each new link as **Jira** (Atlassian issue links) or **Doc** (everything else that survived filtering), using the workbook's actual Category options rather than assuming.
- Writes each new row with the message date, resolved title, a summary (≤40 words) naming who shared it with a link back to the source message, the URL, and category — then re-reads to confirm the date actually landed.

## Inputs & outputs

- **You provide:** the Slack channel (name or ID), the date range (at least a start date), and the Project Workbook's Notion URL (pulled from the registry if `pmo-project-registry` has run for this project, otherwise asked for directly).
- **You get:** new rows added to the Project Workbook, plus a report of everything skipped and why — duplicates (with the matching existing row), Slack-internal cross-references dropped, and anything ambiguous flagged for the PM's judgment call rather than silently resolved.
