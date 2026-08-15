---
name: pmo-slack-notion-sync
description: Pull decisions, changes, problems, risks, dependencies, action items, and learnings out of a Slack message or thread — typically a pmo-meeting-recap post — and add them as new rows in the project workbook database in Notion, tagged by category with a link back to the source message. Use whenever the user has a Slack message or thread and wants its contents synced into the workbook — e.g. "sync this recap into the workbook," "pull the decisions and action items from this thread into Notion," "add what's in this Slack message to the project workbook." Recognizes pmo-meeting-recap's fixed headings directly; falls back to best-effort categorization for plainer messages, flagging anything ambiguous instead of guessing. Checks for duplicates before adding and never modifies the workbook's schema. Part of the pmo- family, downstream of pmo-meeting-recap.
---

# PMO Slack → Notion Sync

## Why this exists

Decisions and action items that only live in Slack aren't reusable — they're not query-able, and they're easy to lose in scroll-back. The PMO's practice is to keep Slack as the daily layer and Notion as the durable record, bridged by pulling structured content out of Slack messages into the project workbook rather than maintaining two separate copies of the same information by hand. This is the tedious manual step that's easy to let slide; this skill is what keeps the workbook actually current without the PM re-typing anything.

## Inputs

- **A Slack message or thread link** (required) — most often the recap `pmo-meeting-recap` just posted, but any message or thread with categorizable content works.
- **The project workbook's Notion URL** (required) — check the project node's "Data Repositories" section first (written by `pmo-project-registry`, if it's run for this project); it records the Project Workbook link directly. If there's no known project node, or the node has no registry section, or it doesn't list one, ask the user directly rather than guessing.

## Step 1: Read the source

Open the Slack message. If it's a thread link, read the whole thread, not just the root message — content worth syncing might be in a reply rather than the first message (this matters especially for recaps, which `pmo-meeting-recap` posts as a threaded reply under the agenda message, not as the root).

## Step 2: Extract and categorize

**If the message follows `pmo-meeting-recap`'s fixed format** (the `:writing_hand:` recap with bolded Decisions / Changes / Problems / Risks / Dependencies / Action items / Things to know sections), this is straightforward — each section's bullets belong to the matching category. Map "Things to know" to the workbook's **Learnings** view; every other heading, including Dependencies, matches a workbook view by name directly. Leave the Conclusions section alone — it's meeting-level narrative summary, not new categorized data, and its content should already be represented in the other sections where it was actionable. Re-extracting from Conclusions on top of the categorized sections would double up entries that are already captured.

**If the message doesn't follow that format** (an ad hoc Slack message or a plainer note), read it for the same categories — decisions made, changes to scope/plan, problems raised, risks flagged, dependencies surfaced, action items assigned, and non-obvious learnings — the same way `pmo-meeting-recap` does its own categorization. If something is genuinely ambiguous (could be a risk or could be a problem, or isn't clearly one of these categories at all), don't force a guess — flag it and ask, or list it separately as "not synced, unclear category" so nothing gets silently dropped or silently mis-filed.

For every item, keep the exact Slack permalink to the message it came from (or to the specific reply, if it's a thread) — this becomes the source reference on the workbook row, in keeping with the PM's habit of linking back to the original message rather than duplicating it into a separate document.

## Step 3: Check the workbook before writing

Open the project workbook database and look at its actual properties before assuming a schema — don't invent fields that aren't there. Confirm it has something that functions as a category/type field (matching the view names) and a text field for the content; if it doesn't look like it can hold what you're about to add, stop and tell the user rather than trying to restructure the database. This skill writes rows into an existing workbook — it doesn't modify the workbook's schema, views, or structure.

## Step 4: Avoid duplicates

Before adding an item, check whether a row already exists referencing the same source message/link with substantially the same content — if the PM reruns this sync (say, after editing the recap), it shouldn't produce duplicate entries. Skip anything that's clearly already there; if it's unclear whether it's a duplicate or a genuine update, ask rather than guessing.

## Step 5: Write the entries

For each new item, add a row to the workbook with the category property set to the exact matching tag — not a paraphrase, not the recap's heading verbatim if it differs from the workbook's own tag name. Use precisely:

- Decisions section → category **Decisions**
- Changes section → category **Changes**
- Problems section → category **Problems**
- Risks section → category **Risks**
- Dependencies section → category **Dependencies**
- Action items section → category **Action items**
- Things to know section → category **Learnings** (the one deliberate rename — the workbook has no "Things to know" tag, so this is the mapping, not a guess)

Getting this exact is what makes each view actually show the row — a decision filed under the wrong tag (or a near-miss like "Decision" instead of "Decisions") won't surface in the Decisions view even though it's technically in the database, which defeats the point of tagging at all. If the workbook's category property uses a select/tag field, use its existing option that matches rather than typing a new one that's almost the same — check the property's existing options first and reuse the exact one, don't create a near-duplicate tag.

Along with the category, add: the content itself, the source Slack link, and today's date if the workbook has a date field. For action items specifically, capture the owner if one was named in the source.

## Step 6: Confirm

Report back what was added, grouped by category, with a link to the workbook. Call out anything skipped — duplicates, ambiguous items that need the PM's input, or anything the workbook's schema couldn't accommodate — rather than reporting a clean success if something didn't go in.

If Notion or Slack isn't connected in this session, say so plainly and give the user the categorized items as text so they can add them manually.

## Explicitly out of scope

Don't create the project workbook or modify its schema, properties, or views — that's out of this skill's hands entirely; if the workbook doesn't exist or doesn't look right, say so rather than working around it.

Don't touch the steps database, even if the source message mentions a step being completed — that belongs to `pmo-step-schedule`. Flag it as a status update worth applying there instead of writing it into the workbook as a substitute.

Don't schedule anything or reference future meetings — same boundary as the rest of the pmo- family.
