# Site copy

Source of truth for all text on the site. `[TODO: …]` marks a fact only Ashish can supply; build with the placeholder visible rather than inventing text.

## Hero

- Name: Ashish Nag
- Positioning: Product leader who builds. I turn messy problems into shipped systems — at work, in my own company, and in products I build end to end.
- Currently: Director of Product Management at Vida Health · San Francisco
- Buttons: LinkedIn (https://www.linkedin.com/in/ashish-nag/) · Email (ashishnag94@gmail.com)

## About

I've spent 10 years as a product manager in the Bay Area, most recently at Vida Health. I like problems where the constraints are real and the deadline is close.

Outside my day job I founded Selective Sips, a wine cellar consultancy for private collectors. Running it taught me sales, service design, and how small teams make decisions with incomplete information.

I also build software myself. Using modern AI tooling, I take ideas from brief to production — specs, acceptance criteria, staging, release — and ship them at near-zero running cost. The projects below are the result.

> Note: consider "10 years in product management" in place of "10 years as a product manager" to match the Director title. Ashish to decide.

## Ventures

### Selective Sips

Founder & Lead Consultant. Cellar strategy, sourcing, and collection management for private clients in California, delivered by a team of three WSET Level 3–certified consultants.
Link: https://selectivesips.com · Asset: Selective Sips logo, `src/assets/ventures/selectivesips-logo.svg` (reversed version for dark mode)

### Settld

Founder. Settld turns decisions scattered across meetings, Slack, email, and Teams into one searchable record, with an owner and deadline for each, and flags when a new decision contradicts an old one. Live with free, Team, and Business plans.
Link: https://www.itssettld.com/ (no GitHub link — private repo)

## Projects

| Order | Project | One-line problem | Card description | Tags | Live | Code |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | StoryStitch | Story collages take too long to lay out by hand. | Pick up to 8 photos; StoryStitch proposes layouts, finds each photo's subject on the device, and crops so faces stay whole. Exports a post-ready 1080×1920 image. Your photos never leave your phone. | React · On-device ML · Cloudflare · Railway | https://storystitch.ashishnag.com | https://github.com/ashishnag124/storystitch |
| 2 | Basketball Tracker | Following one college team means hopping between apps. | One page for any college basketball team: schedule, roster, stats, and live game view, with your team remembered on return visits. | Next.js · Live data · Railway | https://basketballhome.ashishnag.com | https://github.com/ashishnag124/basketballhome |
| 3 | Flights Overhead | "What plane is that?" | A live map of every aircraft within 25 nautical miles, with flight details on tap. Built in a day as a data-visualization experiment. | Leaflet · ADS-B · Express | https://casablancaflights.ashishnag.com | https://github.com/ashishnag124/casablancaflights |

Screenshots: StoryStitch, Selective Sips, Settld, Basketball Tracker and Flights Overhead captured from the live sites.

## Case study: StoryStitch (write first)

Angles to cover, using the template in `CLAUDE.md`. Source material: `docs/product-brief.md` and `docs/acceptance-criteria.md` in the storystitch repo.

- Positioning against Fotor: layouts built for 9:16 and automatic subject-aware cropping, versus manual line stitching.
- Privacy as a product decision: all image processing in the browser; v1 runs for $0.
- Explainable ranking: layouts scored by an optimal assignment over a photo × cell cost matrix, with named weights.
- Process maturity: written brief, acceptance criteria tied to tests, staging/production split, gated releases. Show the brief and criteria, not just the app.

[TODO: Ashish to approve the draft]

## Case study: Settld (second candidate)

Privacy by design (no bot joins calls; content processed only when a user sends it) and human review of every conflict are the product decisions worth explaining. [TODO: confirm Ashish wants a Settld case study]

## Contact

I can be reached at ashishnag94@gmail.com.

## Meta

- Title: Ashish Nag — Product leader and founder
- Description: Product leader specializing in turning messy problems into scaled systems. Builder at heart.
- Social preview image: 1200×630, name + positioning line on the site's background color
