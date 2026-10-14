# Kujo Beatdown — browser rhythm prototype

This directory contains a self-contained, desktop/mobile-friendly rhythm-game demo linked from the project hub. It is an original prototype—not a Beat Saber custom map or a release package.

## Play locally

Open `game/index.html` in a modern browser, or serve the repository root over HTTP (for example, `python3 -m http.server 8000`) and visit `/game/`. No build step, account, framework, external asset, or network connection is required.

## Controls

- **A** or **←**: blue side
- **L** or **→**: red side
- **Touch/click** the corresponding half of the playfield: same controls on mobile
- **Pause button**, **Escape**, or **Space**: pause/resume during a run
- **♫**: toggle synthesized audio

Press the matching side as its block reaches the bright strike line. The arrow is a directional visual cue. Timed cuts award points and build a combo; a missed block breaks the combo. A run lasts one minute.

## Implementation

The note sequence is generated deterministically in `game.js` from short four-beat patterns at 90 BPM. Canvas renders a perspective arena and notes; Web Audio synthesizes a new, simple pulse/drum/bass backing after the player starts. Progress, score, combo, accuracy, pause/resume, replay, mute, touch, reduced-motion CSS, keyboard operation, and live announcements are included.

## Content and rights boundary

No official recording, lyrics, copied music, or third-party game assets are included. The synthesized demo mix and chart are original prototype material and do not represent Ren's song or an official Beat Saber chart. The prototype does not establish permission to distribute the underlying recording or a future map; see [`../docs/RIGHTS-AND-PROVENANCE.md`](../docs/RIGHTS-AND-PROVENANCE.md).
