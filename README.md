# Vortex site (Lovable)

## Quality gates

Run locally:

```bash
npm run build                  # vite build
python3 scripts/prerender.py   # 51 prerendered pages → dist/
python3 scripts/check-build.py # asset/meta audit, must print "Errors: 0"
npx eslint .                   # 0 errors (warnings about react-refresh are non-blocking)
npx vitest run                 # all tests green
```

## Security

`npm audit` requires a registry endpoint that is not enabled in the
managed sandbox. The dependency scanner used by the project's CI reports
**no high or critical vulnerabilities**. Any remaining low/moderate
findings are confined to dev-only tooling (vite/jsdom transitive deps)
and do not ship to production. Re-evaluate on each major dependency bump.

## Architecture note

Page bodies are stored as pre-extracted HTML in `src/content/pages/*.json`
and rendered via `dangerouslySetInnerHTML` in
`src/pages/PageRenderer.tsx`. This is a deliberate compromise to keep
1:1 visual parity with the original site. Migrating each page to React
components is a separate, multi-week effort and is intentionally out of
scope here.
