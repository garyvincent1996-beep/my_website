# Working agreement

Read PLAN.md and PROGRESS.md before changing this project. Inspect current files and Git status; the documents may lag behind actual work.

## Purpose

Launch an author-first personal website on December 1, 2026. Retain the current visual foundation. Books are works in progress; a separate book wiki is future work. Keep the developer section secondary. Do not invent biographical claims, book descriptions, publication status, contact details, or an author name.

## Learning together

The owner has intermediate coding experience and wants a mix of hands-on coding and explained implementation. Propose small, reviewable tasks. Explain the purpose of a change and the concept behind it. Let the owner lead routine exercises; help implement larger changes when requested. Avoid completing unrelated roadmap tasks during a focused learning session.

## Project conventions

- Plain HTML, CSS, and JavaScript; no framework or dependency installation needed.
- Only front_end/ is deployable. Do not deploy the repository root.
- Use Node.js 24 for node scripts/preview.mjs and node scripts/validate.mjs.
- Preserve readable content and navigation without JavaScript.
- Use relative links that work under a GitHub Pages repository path.
- Keep credentials, private manuscripts, and browser profiles out of Git.
- Do not assume a fixed absolute checkout path or shared chat history.

## Session handoff

Start by checking the branch, remote, and working tree. Pull with --ff-only only when the tree is clean and a remote exists; resolve divergence before editing. At the end, update PROGRESS.md with changes, verification, remaining work, and the exact next task. Commit code and notes together when authorized. Push to the configured remote when available and authorized; explicitly state when work is local only. Never claim that a second device or deployment was tested without evidence.
