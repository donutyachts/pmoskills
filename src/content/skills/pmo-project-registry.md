---
title: Project Registry
stage: Intake
order: 3
summary: Locate and validate a project's four data repositories (Notion project node, Steps database, Project Workbook database, Slack channel) and record them on the project node page.
sourceFile: pmo-project-registry.md
related:
  - pmo-project-overview
  - pmo-team-member-intake
---

## When it triggers

Use this when you want to confirm — once, per project — where everything actually lives: the project node, the steps database, the project workbook, and the Slack channel. Once it's run, every other skill in this family checks the recorded registry first instead of asking you to hand over the same links again.

## What it does

- Checks the project node page for the right shape: title, child databases and subpage, and a project-manager property.
- Confirms the steps database is really a database and its name starts with "Steps".
- Confirms the project workbook is named exactly "Project Workbook" and has the expected views (Changes, Problems, Decisions, and the rest of that family) — not just a single flat view.
- Confirms the Slack channel is public, named with the "#proj-" prefix, and actually referenced on the project node page.
- Records the four confirmed links in a "Data Repositories" section on the node, and calls out anything that didn't pass validation cleanly — even if you approved proceeding anyway.

## Inputs & outputs

- **You provide:** the Notion URL of the project node. If a repository can't be found among the node's children, you'll be asked for its link directly.
- **You get:** a "Data Repositories" section on the project node listing all four confirmed links, plus a clear report of anything that failed validation.
