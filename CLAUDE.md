# Project instructions

Read README.md and CLAUDE_CODE_HANDOFF.md first.

- This package is a standalone public edition. Do not contact, modify, or deploy over the original private Site.
- Root npm scripts operate on the public edition. No install is required; use Node 22+.
- Preserve the established dark pixel-art palette, penguin/panda, map proportions and interactions.
- Track first visits only. Do not introduce repeat-trip history unless explicitly requested.
- Keep every public visitor's data isolated. Do not wire public visitors to one global household record.
- Do not trust client-provided identity headers. The hosted reference relies on a private platform dispatcher and cannot safely be exposed directly.
- Never commit credentials, personal backups, private photos, generated local browser profiles or .env files.
- Run npm test and npm run build after changes. Verify browser behavior for UI/storage changes.
- Get the user's GitHub repository destination before pushing. Never publish travel data as demo fixtures.
- Review unresolved dataset attribution in LICENSE-NOTES.md before asserting a license for the entire project.
