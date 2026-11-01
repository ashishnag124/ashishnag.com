# M4 — DNS cutover checklist

Moves DNS for `ashishnag.com` from Squarespace to Cloudflare so Cloudflare Pages can later serve the apex (M5). The registration stays at Squarespace. Nothing on `ashishnag.com` should change for visitors: the root keeps redirecting to LinkedIn, and StoryStitch keeps working.

**Owner:** Ashish (dashboards). **Total time:** about 30 minutes of clicks spread over 2–3 days, mostly waiting.

## What's there today

Looked up on 2026-11-01 from public DNS and from the current authoritative nameservers. DNS can't be listed from outside, so **the Squarespace DNS panel is the source of truth**: if it shows a record that isn't here, carry it over too.

| Name | Type | Value | TTL | In Cloudflare |
| --- | --- | --- | --- | --- |
| `ashishnag.com` | NS | `ns-cloud-b1` … `b4.googledomains.com` | — | Replaced by Cloudflare's two nameservers (step 5) |
| `ashishnag.com` | DS (DNSSEC, at the .com registry) | `2561 8 2 13589ADC…4D4F3B97` | 86400 | **Must be removed before the switch** (step 1) |
| `ashishnag.com` | A ×4 | `198.49.23.144`, `198.49.23.145`, `198.185.159.144`, `198.185.159.145` (Squarespace) | 14400 | Delete; replaced by the redirect setup (step 4) |
| `storystitch` | CNAME | `storystitch-web.pages.dev` | 14400 | Keep, **DNS only** (grey cloud) |
| `staging.storystitch` | CNAME | `storystitch-web-staging.pages.dev` | 14400 | Keep, **DNS only** |
| `api-staging.storystitch` | CNAME | `y17fnxjl.up.railway.app` | 14400 | Keep, **DNS only** |
| `_railway-verify.api-staging.storystitch` | TXT | `railway-verify=4d8d6b57…aa1da0e8d` | 14400 | Keep exactly |
| `resend._domainkey` | TXT | `p=MIGfMA0G…IDAQAB` (Resend DKIM key) | — | Keep exactly |
| `send` | MX | `10 feedback-smtp.us-east-1.amazonses.com` | — | Keep (Resend bounce handling) |
| `send` | TXT | `v=spf1 include:amazonses.com ~all` | — | Keep exactly |

Not present today: `www`, an apex MX (no email is received at `@ashishnag.com`), `_dmarc`, `api.storystitch`, `basketball`, `flights`. CLAUDE.md mentions `_railway-verify` records for `storystitch` and `staging.storystitch`; none are visible publicly. Those two subdomains are on Cloudflare Pages, not Railway. If the Squarespace panel shows them anyway, carry them over.

Today the root redirect is Squarespace domain forwarding: `https://ashishnag.com` returns a **302** to `https://www.linkedin.com/in/ashish-nag/`.

## Steps

### 1. Turn off DNSSEC at Squarespace (day 1)

This step must come first. With DNSSEC on, the .com registry vouches for Google's nameservers. Switching to Cloudflare's nameservers while that's still in place makes the whole domain fail to resolve, StoryStitch included.

- [ ] Squarespace → **Domains** → `ashishnag.com` → **DNS** → **DNSSEC** → turn it **off**.
- [ ] Wait until the registry no longer has a DS record. This command must print nothing:
  ```bash
  dig +short DS ashishnag.com @a.gtld-servers.net
  ```
- [ ] Then wait **another 24 hours**. The DS record's TTL is 86400 seconds, so resolvers can keep the old one cached that long.

### 2. Add the zone to Cloudflare (any time, same day is fine)

- [ ] Cloudflare dashboard (the account that has the `ashishnag` Pages project) → **Add a domain** → `ashishnag.com` → **Quick scan for DNS records** → **Free** plan.
- [ ] Don't change nameservers yet. Leave the "Change your nameservers" page open, or note the two `*.ns.cloudflare.com` names it shows.

### 3. Compare records line by line

- [ ] Cloudflare → `ashishnag.com` → **DNS** → **Records**. Check every row of the table above against what was imported, and against the Squarespace DNS panel.
- [ ] Add anything missing by hand, copying values exactly. TXT values must match character for character.
- [ ] Set **every CNAME to DNS only** (grey cloud). Railway can't issue certificates behind the proxy, and the Pages subdomains keep working the way they do today.
- [ ] Delete the four Squarespace `A` records on the apex.

### 4. Recreate the LinkedIn redirect

Squarespace forwarding stops working once DNS moves, so Cloudflare takes it over. A redirect rule only runs on proxied traffic, so the apex needs a placeholder record.

- [ ] **DNS** → **Add record**: type `A`, name `@`, IPv4 `192.0.2.1`, **Proxied** (orange cloud). `192.0.2.1` is a reserved address that never receives traffic; Cloudflare answers before it would be used.
- [ ] **Rules** → **Redirect Rules** → **Create rule** → name it `Root to LinkedIn (until launch)`:
  - If: **Custom filter expression** → Field `Hostname` · equals · `ashishnag.com`
  - Then: **Static** · URL `https://www.linkedin.com/in/ashish-nag/` · Status **302** · leave "Preserve query string" off
  - **Deploy**
- [ ] Keep it a **302**, as today. Browsers cache a 301 indefinitely, which would keep sending visitors to LinkedIn after launch.

### 5. Switch nameservers at Squarespace (day 2 or 3, after step 1's wait)

- [ ] Check the DS record is still gone: `dig +short DS ashishnag.com @a.gtld-servers.net` prints nothing.
- [ ] Squarespace → **Domains** → `ashishnag.com` → **DNS** → **Domain nameservers** → **Use custom nameservers** → enter the two Cloudflare nameservers from step 2 → **Save**. Remove any other nameservers.
- [ ] Cloudflare → `ashishnag.com` → **Overview** → **Check nameservers now**. The zone turns **Active** within minutes to a few hours, and Cloudflare emails you when it does.

### 6. Verify (once the zone is Active)

Each command and what it should show:

```bash
dig +short NS ashishnag.com
```
Two `*.ns.cloudflare.com` names.

```bash
curl -sI https://ashishnag.com | grep -iE "^(HTTP|location)"
```
`302` and `location: https://www.linkedin.com/in/ashish-nag/`.

```bash
curl -sI https://storystitch.ashishnag.com | head -1
```
`HTTP/2 200`.

```bash
curl -sI https://staging.storystitch.ashishnag.com | head -1
```
`HTTP/2 200`, or whatever staging returned before, such as an access page.

```bash
curl -s https://api-staging.storystitch.ashishnag.com/health
```
The health JSON, with no certificate error.

```bash
dig +short TXT resend._domainkey.ashishnag.com
```
The same `p=MIGfMA0G…` key.

- [ ] In the browser, open StoryStitch production and staging. The padlock should show a valid certificate.
- [ ] Cloudflare Pages → the **storystitch-web** project → **Custom domains**: `storystitch.ashishnag.com` should say **Active**. If it asks to re-verify now that the zone is in the same account, click **Check DNS records** or **Activate domain** and follow its prompt. It may offer to switch the record to proxied, which is fine for a Pages domain. Do the same for **storystitch-web-staging**.
- [ ] Railway → the API staging service → **Settings** → **Networking**: `api-staging.storystitch.ashishnag.com` shows a valid certificate.
- [ ] Resend → **Domains**: the domain still shows **Verified**. Send one test email, such as a StoryStitch staging password reset.

**If something breaks:** change the nameservers at Squarespace back to the four `ns-cloud-b*.googledomains.com` names. The Squarespace records are untouched by all of this, so switching back restores today's setup within a few hours.

### 7. Optional: turn DNSSEC back on, on Cloudflare (a day or two later)

- [ ] Cloudflare → `ashishnag.com` → **DNS** → **Settings** → **DNSSEC** → **Enable**. Cloudflare shows a DS record.
- [ ] Squarespace → **Domains** → `ashishnag.com` → **DNS** → **DNSSEC** → add that DS record (key tag, algorithm, digest type, digest).

### 8. Basketball Tracker and Flights Overhead on Railway (whenever they're ready)

For each app (`basketball` and `flights`):

- [ ] Railway → the service → **Settings** → **Networking** → **Custom Domain** → `basketball.ashishnag.com` (or `flights.ashishnag.com`). Railway shows a CNAME target and a `_railway-verify…` TXT record.
- [ ] Cloudflare → **DNS** → add both records exactly as Railway shows them. Set the CNAME to **DNS only**.
- [ ] Wait for Railway to show the certificate as issued, then check `curl -sI https://basketball.ashishnag.com | head -1` returns `HTTP/2 200`.
- [ ] Tell Claude Code, which will switch that project's `liveStatus` to `live` and capture its screenshots.

## Done when

- `ashishnag.com` uses Cloudflare nameservers and the root still 302s to LinkedIn.
- StoryStitch production, staging and the staging API all load with valid certificates.
- Resend still shows the domain as verified.
- The Squarespace DNS panel no longer matters. Keep the registration and auto-renew on at Squarespace.

Launch (M5) then adds `ashishnag.com` as the Pages custom domain, deletes the redirect rule and the placeholder `A` record, and adds the `www` → root redirect.
