# Author website launch plan

Launch: **December 1, 2026**. Time: **5–10 hours/week**. Learning: owner-led small tasks with explained help on larger changes.

## November 12–15: Portable foundation

- [ ] Preserve the source in an initial Git commit (blocked here by read-only .git permissions).
- [x] Add project instructions, setup instructions, plan, and progress notes.
- [x] Add dependency-free local preview and validation commands.
- [x] Give the homepage the hosting entry name index.html and update links.
- [ ] Connect a GitHub repository and push code and notes.
- [ ] Clone outside OneDrive on each laptop; preview on a second device.
- [ ] Confirm the public author name, bio, contact address, and book details.

Acceptance: a fresh clone can be previewed and validated, and another Codex session can identify the next task from these documents.

## November 16–22: Real content and reader journeys

- [ ] Put the author's identity and writing first on Home and About.
- [ ] Give each actual work a short description and accurate status; excerpts are optional.
- [ ] Keep book information readable without carousel interaction.
- [ ] Make Career a concise, factual secondary section.
- [ ] Add a visible public contact address and working mailto link.
- [ ] Review consistent navigation and remove unneeded placeholder copy.

Acceptance: a visitor can identify the author, understand the writing, explore a work, and find contact details. Keep the current design unless testing identifies a problem.

## November 23–29: Publishing rehearsal and testing

- [x] Prepare a GitHub Pages workflow that uploads only front_end/.
- [x] Add distinct page descriptions, a favicon, and a missing-page response.
- [ ] Configure GitHub Pages and rehearse deployment by November 27.
- [ ] Test mobile/desktop, keyboard, reduced motion, search, carousel, and JavaScript-disabled reading.
- [ ] Ask one or two visitors to find a book and contact the author; fix observed issues.
- [ ] Practice reverting a change and redeploying a previous version.

Acceptance: verified live HTTPS site, working assets/links, understandable navigation, and a known rollback procedure. A rehearsal deployment is publicly accessible.

## November 30–December 1: Launch

- [ ] Freeze features November 30; finish content and launch-blocking fixes.
- [ ] Verify the live homepage, books, contact, and phone navigation December 1.
- [ ] Announce the site and record follow-up improvements.

## Defaults and boundaries

Use GitHub as the shared source of truth and independent clones outside cloud-sync folders. Default to the GitHub Pages address; purchasing a domain can follow. Use plain HTML/CSS/JavaScript. Defer the wiki, accounts, newsletter, backend, contact form, and manuscript synchronization. Never commit private manuscripts. Publish only front_end/.
