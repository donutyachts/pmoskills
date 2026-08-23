---
name: pmo-link-harvest
description: >-
  Scan a Slack channel over a date range — reading every thread in full, not just parents — for links to real documents (Docs/Sheets, Notion pages, Jira tickets, sites) never logged in the project's Notion Project Workbook, then add each as a row: Recorded = message date, Name = the document's real title, Summary (≤40 words) naming who shared it with a link back to the source message, URL, Category (Jira for Atlassian links, Doc otherwise). Use when the workbook needs to catch up on links shared in a channel — e.g. "scan #proj-mwp-rebuild since Monday for links we haven't logged," "check the migration channel this week for docs people shared," "did anyone drop a link in the channel we missed." Skips links pointing only to other Slack messages — only genuine documents count. Always checks existing workbook URLs first. Part of the pmo- family with pmo-slack-notion-sync (which pulls decisions/risks/action items from one message — this sweeps a whole channel over time instead).
---

# PMO Link Harvest

## Why this exists

People share documents in Slack the moment they're relevant, then move on — the link scrolls out of view and nobody goes back to log it. `pmo-slack-notion-sync` catches structured content out of a single recap message, but plenty of genuinely useful links (a tracker spreadsheet, a spec, a ticket) get shared mid-conversation or buried in a thread reply, outside any recap. This skill's job is to sweep a channel over a stretch of time and catch those before they're forgotten, so the Project Workbook stays a reliable index of "every document anyone shared about this project," not just what happened to make it into a recap.

## Inputs

- **The Slack channel** (required) — a name or ID. Resolve a name to an ID with the channel search tool if needed.
- **The date range** (required) — at minimum a start date ("since Monday," "starting Aug 17"). If the user doesn't give an end date, use now. Convert relative dates using the user's stated timezone.
- **The Project Workbook's Notion URL** (required, but don't always ask for it) — check the project node's "Data Repositories" section first (written by `pmo-project-registry`). If there's no known project node, no registry section, or it doesn't list a workbook, ask the user directly rather than guessing at a URL.

## Step 1: Pull the channel history

Read the channel from the start of the range forward. Channel history tools typically page at around 100 messages — for anything longer than a few days, expect to paginate rather than assume one call covers it.

## Step 2: Read every thread, not just parents

A channel-history read returns thread parent messages but not their replies. Any parent message that has replies needs its own thread-read call — links shared deep in a reply are just as much a miss as one in a parent message, and in practice they're common (someone asks a question, the actual document shows up three replies later). This is the step most likely to get shortcut under time pressure; don't skip it. If the channel is thread-heavy, this will be the majority of your tool calls — that's expected, not a sign something's wrong.

## Step 3: Filter for genuine document links

Not every URL in a Slack message is a document worth logging. Slack messages routinely link to *other Slack messages* — "per the decision here: `<link>`," "as discussed in this thread" — and those cross-references aren't documents, they're internal pointers that would just clutter the workbook with entries that have no real content of their own. Keep links to things like Google Docs/Sheets/Slides, Notion pages, Jira/Atlassian tickets, Confluence pages, external websites, and attached files. Drop links whose target is itself a `slack.com/archives/...` message permalink.

If a link's nature is genuinely unclear (a shortened URL, an internal tool link you can't identify), don't guess — note it separately when you report back rather than silently including or excluding it.

## Step 4: Resolve each document's real name and date

For each candidate link, note:

- **Who shared it and when** — the sender and timestamp of the specific message containing the link (the reply's timestamp if it was shared in a thread reply, not the thread parent's timestamp — they're often different days).
- **What it's actually called** — don't reuse whatever text the sender happened to link (e.g. "here's the tracker"). Open the document (or fetch its metadata — a Google Drive `get_file_metadata` call, a Notion page fetch, a Jira issue lookup) and use its real title. This matters because the workbook is meant to be a name-searchable index; "here's the tracker" as an entry name defeats that.

## Step 5: Check the workbook before writing anything

Query the Project Workbook's existing rows and their URL property before adding anything — every entry you're about to add must be checked against what's already there, not just skimmed. Compare more than raw string equality where you can: a URL with a different query string (`?usp=sharing` vs none, a `?tab=` fragment) or trailing slash can still point at the same document, so where possible, compare the underlying identifier (a Google Drive file ID, a Notion page ID, a Jira issue key) rather than the literal string. If a document is already logged under any URL variant, skip it. If you're not sure whether two URLs are the same resource, say so when reporting back rather than silently adding a probable duplicate.

Also check the workbook's actual `Category` property options before writing (don't assume — schemas drift). This skill expects a `Doc` option and a `Jira` option; if either is missing or named differently, use the closest existing match and flag the mismatch rather than creating a new tag.

## Step 6: Decide the category

- A link to an Atlassian/Jira issue (`*.atlassian.net/browse/...` or similar) → Category **Jira**.
- Everything else that survived Step 3's filter (Google Docs/Sheets, Notion pages, external sites, attached files) → Category **Doc**.

## Step 7: Write the entries

For each new, non-duplicate document link, add a row with:

- **Recorded**: the date of the message that shared the link (not today's date, and not the thread parent's date if it differs from the reply that actually contained the link).
- **Name**: the document's real title, resolved in Step 4.
- **Summary**: 40 words or fewer. State who shared it by name, and include a link back to the source Slack message so anyone can trace the entry to its origin — e.g. "List of Wave Zero customers shared by Andres Santamaria in [this Slack message](<permalink>)." Keep it factual and specific to what the document actually is, not a generic restatement of the category.
- **URL**: the document link itself.
- **Category**: Doc or Jira per Step 6.

Double check any date property actually landed on the date you intended rather than today — some Notion date properties default to the creation timestamp if the write didn't take, so it's worth a follow-up read after writing to confirm the Recorded date matches the message date rather than silently trusting the write.

## Step 8: Confirm

Report back everything added, plus everything skipped and why: duplicates (with which existing row they matched), links dropped as Slack-internal cross-references, and anything ambiguous that needs the PM's judgment call. A clean "added 3 links" report that quietly drops the ambiguous ones is worse than a slightly longer report that surfaces them.

## Explicitly out of scope

Don't touch the Steps database or propose milestones — that's `pmo-planning-synthesis` and `pmo-step-schedule`'s territory.

Don't pull decisions, risks, action items, or other recap-style structured content out of plain conversation — that's `pmo-slack-notion-sync`'s job on a specific message. This skill only cares about document links, full stop; if a message has both a shareable document and a decision worth logging, log the link here and leave the decision for that other skill (or flag it for the PM).

Don't create the Project Workbook or modify its schema, properties, or views. If it doesn't look like it can hold what you're about to add, stop and say so rather than improvising a new field.
