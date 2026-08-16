---
title: Slack/Notion Sync
stage: Cadence
order: 9
summary: Pull decisions, changes, risks, dependencies, and action items out of a Slack recap and add them as categorized rows in the Project Workbook, deduped against existing entries.
sourceFile: pmo-slack-notion-sync.md
related:
  - pmo-meeting-recap
  - pmo-step-schedule
---

## When it triggers

Use this whenever you have a Slack message or thread — most often the recap `pmo-meeting-recap` just posted — and want its contents synced into the project workbook instead of left to scroll away in Slack.

## What it does

- Reads the whole message or thread (not just the root message, since recaps are posted as threaded replies).
- If it's a `pmo-meeting-recap`-formatted post, maps each fixed section straight to the matching workbook category ("Things to know" becomes "Learnings"; every other heading matches a workbook view by name). For a plainer message, it categorizes the same way by hand and flags anything genuinely ambiguous instead of guessing.
- Checks the workbook's actual properties before writing anything — it never modifies the workbook's schema, views, or structure.
- Checks for existing rows referencing the same source message before adding anything, so re-running the sync after an edited recap doesn't create duplicates.
- Writes each item with its exact matching category tag, the content, a link back to the source Slack message, and the owner for action items.

## Inputs & outputs

- **You provide:** the Slack message or thread link, and the project workbook's Notion URL (pulled from the registry if `pmo-project-registry` has run for this project).
- **You get:** new rows added to the project workbook, grouped and reported by category, with anything skipped — duplicates, ambiguous items, schema mismatches — called out rather than glossed over.
