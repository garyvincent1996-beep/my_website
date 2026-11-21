# Project handoff

Updated: **November 20, 2026**. Target launch: **December 1, 2026**.

## Current state

The site is local only. Git was initialized on main, but there is **no initial commit, remote, push, or deployment**. This Codex session could not write .git/index.lock because the environment makes .git read-only. No global Git configuration was changed; safe.directory was supplied only to individual commands because the sandbox user differs from the folder owner.

The working copy is still in OneDrive. Do not move or delete it yet. After the first successful push, create independent clones outside OneDrive and verify them before retiring this copy.

## Completed in this session

- Inspected all five pages, styles, search, carousel, and existing validation script.
- Created AGENTS.md, PLAN.md, README.md, and this handoff file.
- Added Git ignores and cross-platform line-ending rules. Original backup, library documentation, and browser experiment folders remain on disk and are excluded from Git.
- Renamed front_end/homePage.html to front_end/index.html and updated HTML/JavaScript homepage references.
- Added distinct page descriptions, a favicon, and a self-contained 404 page.
- Added a Node-only preview server and static validator; no packages were installed.
- Updated the optional Python validator to account for index.html and the separate 404 page.
- Prepared GitHub Actions validation and **manual** Pages deployment of front_end/ only. Deployment adapts the 404 home link to the actual Pages base path.

## Verification evidence

- Node 24.19.0 and Git 2.54.0.windows.1 are available. Python and GitHub CLI are not on PATH.
- `node scripts/validate.mjs`: passed all six HTML pages, local links, metadata, IDs/landmarks, CSS asset references, and CSS brace balance.
- Node syntax checks: passed preview, validator, site.js, betterTrans.js, and booksPage.js.
- Local HTTP smoke test: passed homepage, books, CSS, JavaScript, favicon, and background-image responses.
- Passed nested 404/home-link handling, non-site file exclusion, encoded traversal rejection, unsupported-method handling, and HEAD handling. Temporary preview server was stopped afterward.
- Not performed: visual browser QA, interactive carousel/search testing, screen-reader testing, second-device clone, Python validator execution, GitHub workflow execution, rollback rehearsal, or live deployment.

## Next task: save and share the project

1. Validation and local preview have now passed in the owner's Node 26.13.0 environment (see November 20 checkpoint). Resume by staging PROGRESS.md and reviewing the staged summary before the initial commit.
2. After validation passes, stage this updated handoff with `git add PROGRESS.md`, review the staged changes, and follow the initial commit commands in README.md. No baseline commit has been reported; save code and notes together.
3. Confirm the owner's GitHub account and create/connect the empty repository using README.md. Push main.
4. On a second laptop, clone outside OneDrive, run validation and preview, and ask Codex to resume using the repository documents.
5. Update this file with the real repository URL, successful push/clone evidence, and the next content task. Never record credentials.

## Owner-led Git lesson checkpoint (November 15)

- Owner confirmed Git installation in their PowerShell terminal: `git version 2.56.0.windows.4`.
- Owner's `git status` showed branch `main`, no commits yet, and untracked project files. `git remote -v` returned no output, so no remote was configured.
- Reviewed `.gitignore` together, including exclusions for local browser experiments, backups, editor state, and common credential files. Private manuscripts must stay out of staged project content.
- Owner ran `git add .` successfully. Explained staging as selecting the next commit's contents, and LF/CRLF warnings as line-ending normalization rather than failures.
- Owner supplied `git diff --cached --stat`: 25 files, 2,181 insertions, including site files, scripts, project notes, and the Pages workflow. The background PNG is 10,484,490 bytes; performance review is deferred.
- Paused before the owner ran Node version and validation commands. No initial commit, push, second-device test, or deployment has been reported.
- During this handoff update, Git was still unavailable on the agent terminal's PATH, so current Git status could not be independently rechecked. The checkpoint above is based on the owner's pasted terminal output. Earlier verification evidence belongs to the November 12 session and does not establish Node availability in the owner's current terminal.
- This handoff update is local only and has not been staged by the agent.

## Owner-led learning checkpoint (November 20)

- Agent rechecked Git: main has no commits, no remote, 25 staged files, and additional unstaged PROGRESS.md changes. Work remains local only; no pull was applicable.
- Owner supplied terminal evidence of Node 26.13.0 and successful static validation of all six pages and CSS checks. An initial MODULE_NOT_FOUND error was resolved by moving from front_end/ to the repository root with `cd ..`.
- Owner ran the local preview and reported that it looks good and everything is running smoothly. This is owner-reported local browser evidence, not a full accessibility, interaction, second-device, or deployment test.
- Explained current directories, relative paths, Get-Command, Node version managers versus npm, and reasons for consistent Node versions. No version manager or package was installed.
- Agreed to continue with the installed Node version after checking validation and preview. Documentation still specifies Node 24; support for Node 26 has not been formally adopted or tested in CI.
- Exact next task: owner stops preview with Ctrl+C if needed, runs `git add PROGRESS.md`, then `git diff --cached --stat`, and shares the summary before making the initial commit. Review staged contents for private material before committing. Then connect an empty GitHub repository and push; second-device and launch-content work remain outstanding.
- This notes update is unstaged. No commit or push was performed by the agent.

## Content needed from the owner

The existing Field Notes branding and generic copy have been retained. Do not infer an author identity from Git's commit identity.

- Public author name and whether Field Notes remains the site title.
- A short reader-facing introduction and accurate biography.
- Public contact email (a mailto link is the launch default).
- Which existing book titles are real, their spelling, one short description per work, and current status. Excerpts are optional. Current titles are Self A, Self B, Self C, Falling Star, and Family Apoccalypse Story; confirm rather than invent corrections.
- Accurate developer experience or projects for the secondary Career page.

The contact page still has no working contact method, and the books still lack descriptions/statuses. These are launch blockers, not completed work. The separate book wiki and custom domain are deferred.

## Learning preferences and decisions

Intermediate coding experience. Mix owner-led implementation with explained help on larger changes. Keep tasks small, review results together, and record lessons as they occur. The owner likes the current design but is concerned about navigation, so evaluate it with real tasks before redesigning. Availability is 5–10 hours/week. Keep the public site author-first, with developer work secondary.
