---
name: pmo-project-registry
description: Locate and validate a project's four Notion/Slack data repositories — the project node page, steps database, project workbook database, and Slack channel — then record them in a "Data Repositories" section on the project node page, following the HostPapa PMO methodology. Use whenever the user wants to register, record, or confirm where a project's data lives, or asks where a specific repository is for a project — e.g. "set up the project registry for the WordPress migration," "register the data repositories for this project," "confirm the steps database and Slack channel are set up right for X," "where does this project's workbook live." Runs real validation checks (naming patterns, database vs. page, expected views, public vs. private channel) rather than trusting a URL at face value. Part of the pmo- family; `pmo-project-overview`, `pmo-team-member-intake`, `pmo-step-schedule`, and `pmo-slack-notion-sync` all check this registry's "Data Repositories" section before falling back to asking the PM directly.
---

# PMO Project Registry

## Why this exists

Every pmo-* skill so far asks for its own Notion destination URL each time it runs. That works, but it means the same links get requested repeatedly, and nothing stops a wrong or stale URL from being trusted just because it was typed in. This skill exists to do that verification once per project: find the project's four data repositories, actually check that each one looks like what it claims to be, and record the confirmed links in one place on the project node page — so that place becomes the thing to trust, not any individual URL someone hands over later.

Validation is the point of this skill, not a nice-to-have. A registry that records an unverified link is worse than no registry, because everything downstream will treat it as ground truth.

## The four repositories and how to recognize each one

1. **Project node page**
   - Its title is the project name.
   - It contains at least two child databases and at least one child subpage — expected to be the steps database, the project workbook database, and a project overview subpage, respectively.
   - It has a page property displaying a project manager's name.

2. **Steps database**
   - Is an actual database (not a plain page).
   - Its name begins with "Steps".

3. **Project workbook database**
   - Is an actual database.
   - Its name is exactly "Project Workbook".
   - Has multiple views, with names like "Changes", "Problems", "Docs", "Decisions" (the same family as Risks, Action Items, Dependencies, Milestones, Bugs, Learnings). A database with a single default view, or views that don't resemble any of these, isn't the real workbook.

4. **Slack channel**
   - Is public, not private.
   - Is referenced or linked somewhere on the project node page — a valid-looking channel that isn't actually connected to the project node fails this check.
   - Its name begins with "#proj-". The full pattern is "#proj-project-name", but the "#proj-" prefix is the non-negotiable part; don't reject a channel purely because the suffix doesn't match the project name exactly if everything else checks out — flag the mismatch instead.

## Step 1: Get and validate the project node

Ask for the Notion URL of the project node page if it isn't already given — don't guess or search for it. Open it and check all three things above: title, the two-databases-plus-subpage structure, and the PM property.

If any of those checks fails — wrong title, missing structure, no PM property — stop and tell the user exactly which one, rather than proceeding on a guess. This page anchors the other three checks, so a bad project node makes everything after it unreliable.

If there's a property that might be the PM but under an ambiguous label (e.g., "Owner" instead of "Project Manager"), ask the user to confirm which property it is rather than assuming.

## Step 2: Locate and validate the steps database

Look among the project node's child databases for one whose name begins with "Steps". If exactly one matches, that's it. If none match, or nothing there looks like a real database, ask the user directly for its URL and run the same two checks (is a database, name begins with "Steps") before accepting it.

## Step 3: Locate and validate the project workbook

Look among the project node's child databases for one named exactly "Project Workbook", and confirm it has multiple views with names from the expected family (Changes, Problems, Docs, Decisions, Risks, Action Items, Dependencies, Milestones, Bugs, Learnings). If it can't be found among the project node's children, ask the user for its URL directly and run the same checks. A database that's a single flat view, or whose views don't resemble this family at all, doesn't pass — flag it rather than accepting it as-is.

## Step 4: Locate and validate the Slack channel

Look for a Slack channel referenced somewhere on the project node page itself — that reference is part of what makes it the right channel, not an optional extra. Confirm the name starts with "#proj-" and that the channel is public. If nothing's referenced on the page, or what's referenced doesn't fit, ask the user for the channel directly and validate it the same way.

## Step 5: Record the registry

Once all four are found and validated (or the user has explicitly confirmed an exception to a failed check), write or update a "Data Repositories" section on the project node page:

```markdown
## Data Repositories
- **Project Node:** [link]
- **Steps Database:** [link]
- **Project Workbook:** [link]
- **Slack Channel:** #proj-... — [link, if the platform supports one]
```

If this section already exists on the page, update it in place rather than creating a duplicate.

Report back to the user what was recorded, and call out anything that didn't pass validation cleanly — even if they approved proceeding anyway. A registry section that silently reflects an overridden failure defeats the point of validating at all; the record should show what was actually confirmed versus what was accepted on the user's say-so.

If Notion or Slack isn't connected in this session, say so plainly and give the user the validated (or flagged) findings as text instead of writing anything.

## Explicitly out of scope

Don't create any of the four repositories if they don't exist. This skill records and validates what's already there — it doesn't stand up a new database, page, or Slack channel as a stand-in. If something is missing entirely, tell the user it needs to be created first, whether by hand or by a future project-scaffolding skill.

Don't assume the downstream skills (`pmo-project-overview`, `pmo-team-member-intake`, `pmo-step-schedule`, `pmo-slack-notion-sync`) require this registry to have been run — they all fall back to asking the PM directly if a project isn't registered yet. This registry makes those asks unnecessary once it's run; it isn't a hard dependency for any of them.
