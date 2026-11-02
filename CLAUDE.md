# ashishnag.com

Personal site for Ashish Nag: a writing-led portfolio that shows a product leader who also founds and ships things. It replaces the current root redirect to LinkedIn.

- Plan, design direction and build phases: `docs/PLAN.md`
- All site copy, with open placeholders: `docs/content.md`
- Shared planning doc (for discussion with others): https://claude.ai/artifact/8w33WdoxxFtDrXj5UubX7X. `docs/PLAN.md` is the working copy for builds; if they disagree, ask.

## Stack

- Astro, static output, no client framework. Plain CSS with design tokens on `:root` (light + dark via `prefers-color-scheme`).
- Case studies are Markdown in `src/content/projects/` (Astro content collection with a zod schema).
- Images through `astro:assets` (WebP/AVIF). Screenshots live in `src/assets/projects/<slug>/`.
- Hosting: Cloudflare Pages, Git-connected to this repo (`ashishnag124/ashishnag.com`, public). Every branch gets a preview URL.
- Analytics: Cloudflare Web Analytics snippet only. No cookies, no consent banner, no other trackers.
- Cost target: $0.

## Site structure

- `/` — one page, five sections in this order: Hero, About, Ventures, Projects, Contact. Sticky header with four anchor links: About, Ventures, Projects, Contact.
- `/projects/<slug>` — one case study per project, template: Problem → Who it's for → Key decisions and trade-offs → What I built → Results or status → What's next. 300–500 words, 2–3 screenshots.
- Out of scope for v1: blog, testimonials, skill bars, an on-page résumé, contact form.

## What goes where

| Item | Section | Live link | Code link |
| --- | --- | --- | --- |
| Selective Sips | Ventures | https://selectivesips.com | none |
| Settld | Ventures | https://www.itssettld.com/ | none — private repo, never link GitHub |
| StoryStitch (flagship) | Projects, first | https://storystitch.ashishnag.com | https://github.com/ashishnag124/storystitch |
| Basketball Tracker | Projects | https://basketballhome.ashishnag.com | https://github.com/ashishnag124/basketballhome |
| Flights Overhead | Projects | https://casablancaflights.ashishnag.com | https://github.com/ashishnag124/casablancaflights |

- AudioBooth is a fork Ashish didn't write. Never list it.
- A project whose live URL doesn't resolve yet shows a "Coming soon" state instead of a dead link. Don't remove the card.
- LinkedIn: https://www.linkedin.com/in/ashish-nag/

## Rules

- **Never invent facts.** Titles, dates, metrics, employers, customers and traction come only from `docs/content.md` or from Ashish. A `[TODO: …]` placeholder stays visible in the build and is listed in your summary; don't paper over it with plausible text.
- **Tone:** confident and specific, never salesy. No superlatives, no buzzwords. If copy needs changing to fit a layout, propose the edit; don't silently rewrite.
- **Visual restraint:** serif headings, sans body, one accent color, generous whitespace. No stock photos, gradient blobs, emoji, typing effects or animated counters. The only motion is a subtle fade-in that respects `prefers-reduced-motion`.
- **Accessibility and speed are acceptance criteria:** semantic HTML, visible focus states, AA contrast in both themes, Lighthouse 95+ on mobile for performance and accessibility.
- Work on a branch and open a PR with `gh pr create`; Ashish reviews on the Pages preview URL before merging.
- `pnpm check` (astro check + build) must pass before you say a task is done.

## What only Ashish does

You don't have, and shouldn't ask for, access to these. When a step needs one, stop and give him exact instructions:

(GitHub is the exception: you can create branches, PRs and repo settings with `gh`.)

- Cloudflare dashboard: creating the Pages project, adding the `ashishnag.com` zone, redirect rules, custom domains.
- Squarespace: switching nameservers (the domain registration stays there).
- Railway: deploying Basketball Tracker and Flights Overhead with their custom domains.
- Supplying screenshots and portrait (drop them in `src/assets/`).

**DNS warning:** `storystitch.ashishnag.com`, `staging.storystitch`, `api-staging.storystitch` and their `_railway-verify` TXT records already exist at Squarespace. Any DNS checklist you write must carry them over to Cloudflare unchanged.

## Commands (once scaffolded)

`pnpm dev` (local, http://localhost:4321) · `pnpm build` · `pnpm check` · `pnpm preview`
