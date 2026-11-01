# ashishnag.com — build plan

Working copy of the planning doc (https://claude.ai/artifact/8w33WdoxxFtDrXj5UubX7X), as of 2026-11-01. Copy lives in `docs/content.md`; rules and stack in `CLAUDE.md`.

## Goal

In under ten seconds, a reader should get: a product leader who also founds and ships things. LinkedIn covers the résumé; this site covers judgment, range, and proof of building.

Primary readers: hiring managers and recruiters for senior product roles, then prospective clients, collaborators and founders. Each should leave with a one-line identity, a sense of trajectory, live projects to click, and an easy next step (LinkedIn, email, résumé).

## Visual direction

Editorial, not techy — a well-set annual letter, with product screenshots as the only real imagery.

| Token | Value |
| --- | --- |
| Heading font | Source Serif 4 or Newsreader (pick one in M1) |
| Body / UI font | Inter |
| Body size / measure / leading | 18–19px · ~68ch · 1.6 |
| Background (light) | #FAFAF7 |
| Text (light) | #1A1A1A |
| Accent | Deep oxblood (default) or ink blue — links and the timeline only |
| Dark mode | Mirror the tokens under `prefers-color-scheme: dark`; keep AA contrast |

Visuals that earn their place: project screenshots in a minimal device frame; an inline-SVG career timeline (horizontal on desktop, vertical on mobile); an optional portrait; the Selective Sips and Settld logos on the Ventures cards.

## Milestones

Owner: **CC** = Claude Code in this repo, **AN** = Ashish (dashboards, assets, approvals). Each CC milestone is one PR, reviewed on its Pages preview URL.

### M0 — Setup

- [ ] (CC) Create the public repo `ashishnag124/ashishnag.com`, commit `CLAUDE.md`, `docs/PLAN.md`, `docs/content.md` and a short `README.md` to `main`, push
- [ ] (AN, can trail) Add assets to `src/assets/`: screenshots, logos, portrait (optional), `public/resume.pdf`
- [ ] (AN, can trail) Fill `[TODO]`s in `docs/content.md`; needed before M2 ships, not before M1

### M1 — Scaffold and design system (CC)

- [ ] Astro project with pnpm, `pnpm check` script, content collection for projects
- [ ] Design tokens, type scale, light/dark, base layout and sticky header
- [ ] GitHub → Cloudflare Pages: CC writes exact dashboard steps; AN connects it
- Done when: preview URL shows an empty but styled page in both themes

### M2 — Home page (CC)

- [ ] Hero, About + SVG timeline, Ventures, Projects, Contact — copy from `docs/content.md` only
- [ ] "Coming soon" state for projects whose live URL isn't up yet
- [ ] Meta tags, favicon, 1200×630 social preview image
- Done when: every section renders with real copy or a visible `[TODO]`; Lighthouse mobile 95+ (performance, accessibility)

### M3 — Case studies (CC drafts, AN approves)

- [ ] Project page template
- [ ] StoryStitch case study drafted from its repo's brief and acceptance criteria
- [ ] Settld case study (if AN confirms)

### M4 — DNS cutover prep (AN, CC writes the checklist)

Cloudflare Pages can only serve the apex domain if the zone is on Cloudflare ([docs](https://developers.cloudflare.com/pages/platform/custom-domains/)), so DNS moves off Squarespace first. Same pattern as selectivesips.com.

1. Add `ashishnag.com` as a free Cloudflare zone; let it import records.
2. Compare against Squarespace line by line. Must carry over: `storystitch`, `staging.storystitch`, `api-staging.storystitch`, `_railway-verify` TXT records, Resend records if added, any MX/email records.
3. Railway CNAMEs DNS-only (grey cloud) at first.
4. Create a Cloudflare redirect rule: root → https://www.linkedin.com/in/ashish-nag/ (Squarespace forwarding stops once nameservers move).
5. Switch nameservers at Squarespace. Registration stays there.
6. Confirm `storystitch.ashishnag.com` and the staging API still resolve with valid certificates.
7. Deploy Basketball Tracker and Flights Overhead on Railway at `basketball.ashishnag.com` and `flights.ashishnag.com`; add their CNAMEs (DNS-only).

### M5 — Launch (AN, CC verifies)

- [ ] Lighthouse 95+ mobile on performance and accessibility
- [ ] Every Live and GitHub link resolves; no dead links
- [ ] Checked on iPhone Safari, Android Chrome, desktop — light and dark
- [ ] One person outside tech can say what Ashish does in one sentence after reading it
- [ ] Delete the LinkedIn redirect rule; add `ashishnag.com` as the Pages custom domain; 301 `www` → root
- [ ] Update LinkedIn website field, résumé and email signature

### After launch

Case studies for Basketball Tracker and Flights Overhead; a new card whenever something ships; a 15-minute quarterly review of the "Currently" line and project list.
