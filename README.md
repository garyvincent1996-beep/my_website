# Author website

An author-first personal website targeting **December 1, 2026**. Start with [PLAN.md](PLAN.md) and [PROGRESS.md](PROGRESS.md). Codex working instructions are in [AGENTS.md](AGENTS.md).

## Tools and local preview

Install Git and Node.js 24 on each laptop. This setup was checked with Git 2.54.0 and Node 24.19.0 on Windows; no npm packages or Python are needed for the primary workflow.

From the repository root:

```sh
node scripts/validate.mjs
node scripts/preview.mjs
```

Open http://127.0.0.1:8080. Stop the preview with Ctrl+C. For another port use `node scripts/preview.mjs 8081`. The preview serves only front_end/ and is bound to this device. The validator checks static structure and local references; it does not replace browser or accessibility testing.

## One-time GitHub setup

1. Make the initial local commit from your own terminal. Git was initialized here, but Codex could not write the Git index under its current permissions. Check `git status --short` and inspect the files before staging. The ignored folders listed below should not appear.

```sh
git add .gitattributes .gitignore AGENTS.md PLAN.md PROGRESS.md README.md front_end scripts test/validate_site.py .github
git commit -m "Prepare portable author website launch workflow"
```

2. Create an empty GitHub repository called `my-website`, without a generated README, license, or .gitignore. Choose public if using GitHub Free with Pages; only share material you intend to make public.
3. Copy its HTTPS URL. In this local repository run the commands below, replacing OWNER with your GitHub username. Sign in through Git's credential prompt if requested; do not put tokens in commands or files.

```sh
git remote add origin https://github.com/OWNER/my-website.git
git push -u origin main
```

If origin already exists, inspect `git remote -v` before changing it. There is no remote until this setup is completed.

## Each additional laptop

Clone to a normal local development folder **outside OneDrive or other sync folders**. Use your actual repository URL:

```sh
git clone https://github.com/OWNER/my-website.git
cd my-website
node scripts/validate.mjs
node scripts/preview.mjs
```

For this laptop too, make a fresh clone outside OneDrive once the initial push succeeds. Preserve the original folder until the clone is verified. Do not copy or synchronize .git between machines. Open the clone as your Codex working folder.

## Switching devices

Work on one device at a time. At session start:

```sh
git status
git pull --ff-only
```

Pull only with a clean working tree and configured remote. If there are local changes, inspect and preserve them first. If Git reports divergence, stop and resolve it with help; do not reset or force-push.

At session end, run validation, update PROGRESS.md, inspect `git diff`, stage the intended files with `git add <paths>`, then:

```sh
git commit -m "Describe the completed step"
git push
```

Before switching laptops, ensure the push succeeded. Unfinished work may be saved in a clearly labeled checkpoint commit with its limitations in PROGRESS.md. Offline work stays on that device until pushed. Chat history is supplementary; code and progress notes carry the handoff.

Resume prompt for Codex:

> Read AGENTS.md, PLAN.md, and PROGRESS.md. Check the current Git state. Help me continue the next task, explaining as we go.

## What belongs where

- `front_end/`: published HTML, CSS, JavaScript, and images.
- `scripts/`: local preview and portable validation.
- `test/validate_site.py`: optional legacy Python validator.
- `.github/workflows/`: validation and GitHub Pages deployment.
- Existing `docs/`, `design-backup/`, and browser experiment folders remain local and ignored. Here docs/ contains Flickity documentation, not this website's publishing source.

## Publishing and rollback

After pushing, use repository **Settings → Pages → Source → GitHub Actions**. The workflow validates pushes and pull requests. Deployments are started manually from **Actions → Validate and deploy website → Run workflow** on main; pushing alone does not publish changes. Only front_end/ is uploaded. The deployment job reports the actual Pages URL. A rehearsal is public too.

For each intended release: review the content, run the browser checklist in PLAN.md, start the deployment workflow, and verify the live root page, links, styles, books, contact, and HTTPS. Until a remote and Pages are configured, no live site exists. GitHub setup details: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

To undo a bad change without rewriting shared history, identify its commit with `git log --oneline`, use `git revert <commit>`, validate, and push. Run the deployment workflow again if the change was live. Practice with a harmless change before launch.
