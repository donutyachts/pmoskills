# PMO Skills

Claude Agent Skills encoding the HostPapa PMO's project-management methodology — from project intake through planning, scheduling, meeting recaps, and Notion/Slack sync.

Each skill is a single Markdown file (Claude's Skill format: a description that controls when it triggers, plus the instructions Claude follows once invoked).

## Skills in this family

| File | Stage | Purpose |
|---|---|---|
| `pmo-project-overview.md` | Intake | Turn notes from the PM's initial one-on-one with the project sponsor into a structured project overview + team roster, published as a Notion subpage. |
| `pmo-project-registry.md` | Intake | Locate and validate a project's four data repositories (Notion project node, Steps database, Project Workbook database, Slack channel) and record them on the project node page. |
| `pmo-team-member-intake.md` | Team onboarding | Turn a PM's 1:1 notes with a contributing team member into a structured capture of commitments and needs, written to Notion, flagging conflicts against the Project Overview. |
| `pmo-step-schedule.md` | Scheduling prep | Prep the Steps database ahead of team 1:1s by carrying forward applicable steps/learnings from similar past projects; later keeps the schedule current from weekly Slack sync notes. |
| `pmo-kickoff-scheduler.md` | Scheduling | Propose and send calendar invites for the sponsor+team kickoff call, and later the planning-session block plus recurring weekly sync — always shown as a full batch for approval before sending. |
| `pmo-planning-synthesis.md` | Planning | Turn planning-session transcripts into a documented strategy and plan (WBS) against the Steps database, write confirmed team deliverables as step rows, and propose milestones. |
| `pmo-meeting-recap.md` | Cadence | Reconcile a PM's own meeting notes against Gemini/AI notes and the transcript into a strict-format recap, then post it to the project's Slack channel after approval. |
| `pmo-slack-notion-sync.md` | Cadence | Pull decisions, changes, risks, dependencies, and action items out of a Slack recap and add them as categorized rows in the Project Workbook, deduped against existing entries. |
| `pmo-link-harvest.md` | Cadence | Scan a whole Slack channel over a date range for document links (Docs/Sheets, Notion, Jira, sites) never logged in the Project Workbook, and add each as a row, deduped against existing URLs. |

## Sequence

```
pmo-project-overview
        │
        ▼
pmo-project-registry ──► pmo-team-member-intake ──► pmo-step-schedule (prep)
        │                        │
        ▼                        ▼
                        pmo-kickoff-scheduler ──► pmo-planning-synthesis
                                                          │
                                                          ▼
                                        pmo-meeting-recap ──► pmo-slack-notion-sync
                                              (repeats weekly)      │
                                                                    ▼
                                                            pmo-link-harvest
                                                    (periodic channel sweep, independent
                                                       of any single recap message)
```

## Status

`pmo-kickoff-scheduler` is explicitly the one automation still being prototyped by the PMO — it stays conservative by design (never sends a single invite without showing the full proposed batch for approval first). The rest reflect an actively used process.

## Note on structure

These are flattened to one `.md` file per skill for readability/publishing. If you want Claude to load any of these as an installable Skill again, it expects a folder per skill containing `SKILL.md` (e.g. `pmo-project-overview/SKILL.md`), not a flat file — rename/wrap accordingly if that's needed later.
