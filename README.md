# 🗡️ Beat Saber Custom Map Project: Ren - "Kujo Beatdown"

## Loptr Lab mission and participation

Loptr Lab is a pre-seed, people-over-profit, accessibility-first venture working toward a self-sustaining model within a capitalist economy. Money sustains the work; meaningful change for people is its purpose. We accept funding only on terms that keep people and accessibility first. Our long-term vision includes universal basic income. We aim to bring change to life and leave a transparent record of what we tried, what worked, and what failed so others can carry it forward. This mission governs our projects, funding decisions, and partnerships; it is not a temporary marketing position.

Current open review and contribution opportunities are voluntary and unpaid. Before work begins, agree in writing on scope, time, what will be public, credit preferences, and an exit path. You can stop at any point. Participation does not promise employment, ownership, revenue share, academic credit, or future pay. Any paid commission or other formal arrangement requires a separate signed agreement before work begins. External assistance or benefits belong to the participant and are not compensation from Loptr Lab.

Financial support is optional and sustains infrastructure, maintenance, accessibility work, and documented development. Paying does not buy contributor status, canon authority, approvals, ownership, or employment. Participation and accessibility are not sponsorship rewards. Project-specific licenses and existing signed agreements continue to apply.

[Full mission and participation terms](https://github.com/ibloud/ibloud.github.io/blob/main/MISSION.md).


Welcome to the collaborative Beat Saber mapping repository for Ren's **"Kujo Beatdown."**

This repo is meant to help contributors plan, map, light, test, and review a custom level together. The goal is to make it easy for a first-time contributor to understand what to pick up, where to put their work, and what a ready-to-review contribution should include.

---

## Brief project overview

- **Song:** Kujo Beatdown
- **Artist:** Ren
- **Target contributions:** beatmap difficulties, lightshow work, playtesting, and project docs
- **Primary workflow:** claim an issue, make the change in the right place, test it, and open a PR

This repository currently includes project docs, issue templates, and PR guidance. Difficulty folders such as `Hard/`, `Expert/`, `ExpertPlus/`, and `Lightshow/` are the intended locations for map content as contributors add or update it.

---

## 🚀 Start here if you're new

If this is your first time contributing, follow this path:

1. **Open the Issues tab** and choose one task.
2. **If there are no open issues yet, create a new issue** describing the work you want to do.
3. **Comment on the issue to claim it** before you start.
4. **Set up a Beat Saber editor** such as ChroMapper or MediocreMapAssistant2.
5. **Create or update files only in the folder for that task** (`Hard/`, `Expert/`, `ExpertPlus/`, `Lightshow/`, `docs/`, or `references/`).
6. **Test your change** in the editor and in-game if possible.
7. **Open a pull request** with the linked issue, what you changed, and how you tested it.

If you only remember one thing: **pick one issue, keep your changes scoped to that issue, and explain your testing in the PR.**

---

## 🛠️ Required tools

You do not need every tool below for every issue, but new contributors will usually want:

- **A Beat Saber mapping editor**
  - **ChroMapper**
  - **MediocreMapAssistant2**
- **A way to preview or playtest the map**
  - in-editor preview at minimum
  - in-game playtest when possible
- **Git + GitHub**
  - branch from `main`
  - open a pull request when your change is ready

Helpful extras:

- Notes about song timing, offsets, or section references
- Screen recordings or timestamps for tricky mapping feedback

---

## 🗺️ Repository layout

### What is already in this repository

- `README.md` — contributor-facing project overview
- `CONTRIBUTING.md` — branch, PR, and review guidance
- `docs/` — project docs such as [`docs/parent-tracking-issue.md`](docs/parent-tracking-issue.md)
- `.github/ISSUE_TEMPLATE/` — issue templates for planning, setup, drafts, playtests, and polish

### Where contribution files should go

Use or create these folders as needed for the issue you are working on:

- `Hard/` — Hard difficulty map files
- `Expert/` — Expert difficulty map files
- `ExpertPlus/` — Expert+ difficulty map files
- `Lightshow/` — lighting or Chroma-specific files
- `references/` — timing notes, references, or source notes that are safe to share
- `docs/` — process docs, specs, and contributor-facing notes

If your issue needs a new top-level folder, explain why in the PR.

### Sample layout

```text
.
├── README.md
├── CONTRIBUTING.md
├── docs/
├── references/
├── Hard/
├── Expert/
├── ExpertPlus/
└── Lightshow/
```

---

## 🧩 Step-by-step mapping workflow

### 1) Claim an issue

- Pick one open issue.
- If there are no open issues yet, create a new issue describing the task you want to work on.
- Leave a comment so other contributors know it is taken.
- Keep one PR focused on one issue whenever possible.

### 2) Set up your editor

- Open the song in ChroMapper, MMA2, or your preferred compatible editor.
- Confirm the BPM, timing, and offset before placing notes.
- Check the issue, PR history, or `references/` for timing or style notes.

### 3) Edit the correct folder

- Difficulty work belongs in `Hard/`, `Expert/`, or `ExpertPlus/`.
- Lighting-only work belongs in `Lightshow/`.
- Notes, specs, or planning updates belong in `docs/` or `references/`.

### 4) Map or revise your assigned section

- Match the target difficulty.
- Keep patterns readable and intentionally placed.
- Fix obvious timing problems before opening a PR.
- Avoid unrelated cleanup outside the issue you claimed.

### 5) Test your work

- Check the changed section in your editor.
- Playtest in-game if possible.
- Revisit any awkward flow, broken swings, or readability problems.

### 6) Open a pull request

Include:

- the linked issue
- a short summary of what changed
- how you tested it
- any follow-up notes or known limitations

For full contributor guidance, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 🧪 Sample workflow

Here is a simple end-to-end example for a new contributor:

1. Open a new issue for an Expert section cleanup if none exists.
2. Branch from `main`.
3. Open the map in your editor and revise only the assigned Expert section.
4. Save the updated map files in `Expert/`.
5. Test the section in-editor and do an in-game check if available.
6. Open a PR that says what section you changed, what issue it closes, and what testing you completed.

That is enough for a valid first contribution.

---

## ✅ Expected output checklist

A contribution is usually ready for review when it includes:

- [ ] The work matches one claimed issue
- [ ] Files are in the correct folder
- [ ] The changed section is playable and not obviously broken
- [ ] Timing was checked in-editor
- [ ] In-game testing was done when possible
- [ ] The PR explains what changed and how it was tested

---

## 🔎 Definition of done for a contribution

Before requesting review, make sure:

- [ ] Your changes stay within the issue scope
- [ ] No clearly unplayable patterns were introduced
- [ ] Timing was sanity-checked for touched sections
- [ ] Paths and naming are consistent
- [ ] Any known follow-up work is called out in the PR

The project tracking template in [`docs/parent-tracking-issue.md`](docs/parent-tracking-issue.md) is a planning aid for issue organization. It is not a live “everything here is currently in progress” status board by itself.

---

> **Rights boundary:** The map/chart is a contributor-created representation. It does not itself license the underlying recording or composition. See [docs/RIGHTS-AND-PROVENANCE.md](docs/RIGHTS-AND-PROVENANCE.md).

## ⚖️ Licensing & copyright

This is a non-commercial fan mapping project.

- Do **not** monetize map distribution.
- Prefer sharing compiled map packages through recognized community channels.
- Expect normal platform copyright-claim behavior for gameplay videos.

---

## 👥 Project lead & contributors

- **Project Lead / Concept:** [@ibloud](https://github.com/ibloud)
- **Contributors:** mappers, lighters, playtesters, and reviewers are all welcome through issues and pull requests

---

> *"I'm a blood-sucking titan from the streets of Brighton..."*
> Let’s build a map worthy of the track.
