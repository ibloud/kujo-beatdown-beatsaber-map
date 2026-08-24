# 🗡️ Beat Saber Custom Map Project: Ren - "Kujo Beatdown"

Welcome to the collaborative mapping repository for Ren's aggressive, theatrical masterpiece: **"Kujo Beatdown"**.

This project is organized so multiple mappers, lighters, and playtesters can work together on a shared Beat Saber custom level.

---

## 🚀 Quick Start

If you're new to the project, start here:

1. Check the open **Issues** and pick one that matches your skill or interest.
2. Comment on the issue to claim it before starting work.
3. Fork this repo and create a branch from `main`.
4. Work only in the relevant difficulty or lightshow folder.
5. Add notes about timing, style, and testing in your PR.
6. Open a Pull Request and link the issue you completed.

Project tracking template:
- [`docs/parent-tracking-issue.md`](docs/parent-tracking-issue.md)

---

## 🎵 Track Specifications

- **Song:** Kujo Beatdown
- **Artist:** Ren
- **BPM:** ~90
- **Target Difficulties:** Hard, Expert, Expert+
- **Environment:** Dark, high-contrast lighting with sharp reds/grays and heavy strobe moments

---

## 🛠️ Recommended Tools

Recommended editors:
- **ChroMapper**
- **MediocreMapAssistant2**

Helpful workflow tools:
- A Beat Saber custom song editor
- A stable way to preview lighting and gameplay in-game
- A notes/timing reference for the song structure

Suggested mapping settings:
- **NJS for Expert / Expert+:** `16` to `18`
- Keep any timing or offset notes in issue comments or `docs/`

---

## 🗺️ Repository Layout

Use these directories consistently:

- `docs/` → planning docs, tracking docs, guides
- `references/` → timing notes, references, non-distributable source material
- `Hard/` → Hard difficulty map files
- `Expert/` → Expert difficulty map files
- `ExpertPlus/` → Expert+ difficulty map files
- `Lightshow/` → lighting/chroma-specific files
- `exports/` → packaged test or release outputs, if needed

If a directory is missing, create it in your PR with a brief README or `.gitkeep` as needed.

---

## 🧩 How to Create the Map

If you're contributing a map section or difficulty, use this general workflow:

### 1) Choose the work item
- Open an issue for the difficulty, section, or lightshow task you want to work on.
- Claim the issue in a comment so others know it is being handled.

### 2) Set up your editor project
- Open the song in your mapping editor.
- Verify the song timing, BPM, and offset.
- Import or recreate any reference timing notes from `references/` or issue comments.

### 3) Work in the correct folder
- Put Hard mapping changes in `Hard/`
- Put Expert mapping changes in `Expert/`
- Put Expert+ mapping changes in `ExpertPlus/`
- Put lighting-only changes in `Lightshow/`

### 4) Map the section
- Keep note placement readable and intentional.
- Match note density to the target difficulty.
- Use patterns that fit the music’s phrasing and intensity.
- Avoid introducing unplayable swings, awkward hand strain, or accidental crossovers unless the section calls for them.

### 5) Add lighting and polish
- Use the lightshow folder for custom lighting work.
- Keep lighting support consistent with the song’s mood.
- Test that lighting does not obscure gameplay readability.

### 6) Test before opening a PR
- Check the section in-editor.
- If possible, test in-game.
- Fix timing issues, impossible patterns, or awkward flow before requesting review.

---

## 🎚️ Difficulty & Mapping Goals

| Difficulty | Target NPS | Style & Focus | Status |
| :--- | :--- | :--- | :--- |
| **Hard** | ~3.2 | Casual: focus on heavy bass kicks & primary lyric flow. Avoid complex crossovers. | 🟡 Claimed (WIP needed) |
| **Expert** | ~5.0 | Regular: match vocal flow, add light streams and basic wrist-flick patterns. | 🟢 Open |
| **Expert+** | ~7.5+ | Enthusiast: syllable-matching rap streams, intense crossovers, dodging. | 🔴 In Progress |
| **Chroma Lightshow** | -- | Full custom lightshow using modern V3 lighting structures. | 🟢 Open |

---

## 🤝 Contribution Workflow

For full guidance, see [`CONTRIBUTING.md`](CONTRIBUTING.md).

Short version:
1. Claim work in Issues.
2. Fork and branch from `main`.
3. Keep changes scoped to one issue.
4. Open a PR with:
   - linked issue
   - summary of changes
   - testing/playtest notes
   - known follow-ups

---

## ✅ PR Requirements (before merge)

- [ ] Linked to a relevant issue
- [ ] Files placed in the correct repository directory
- [ ] No broken or unplayable sections introduced
- [ ] Timing checked in-editor and in-game, where applicable
- [ ] Notes added for any known limitations or next steps

---

## 📦 Expected Output

A completed contribution should usually include:
- a playable map section or full difficulty
- cleaned-up timing and note placement
- optional lighting/chroma work if applicable
- notes in the PR describing what was mapped and how it was tested

---

## ⚖️ Licensing & Copyright

This is a non-commercial fan mapping project.

- Do **not** monetize map distribution.
- Prefer sharing compiled map packages through recognized community channels.
- Expect standard platform copyright-claim behavior for gameplay videos.

If needed, keep deeper policy/legal notes in `docs/` instead of expanding this README further.

---

## 👥 Project Lead & Contributors

- **Project Lead / Concept:** [@ibloud](https://github.com/ibloud)
- **Mappers / Lighters / Playtesters:** Join via Issues and PRs

---

> *"I'm a blood-sucking titan from the streets of Brighton..."*
> Let’s build a map worthy of the track. Grab your sabers!
