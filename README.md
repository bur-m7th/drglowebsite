# dr.glo — brand website

Static site with no framework. English is at `/`, Arabic at `/ar/`.

- **Live site:** https://drgloglobal.com
- **Hosting:** GitHub Pages
- **Domain:** registered at Namecheap

## How publishing works

Every push to `main` runs [.github/workflows/pages.yml](.github/workflows/pages.yml). It does three things:

1. Runs `node tools/build.mjs https://drgloglobal.com/`. This builds the Arabic page, the SEO tags, the sitemap and robots.txt.
2. Copies only the public files into the published site. `tools/`, this README and `drglologo.png` are never published.
3. Deploys to GitHub Pages.

## Editing content

- **English text:** edit `index.html`.
- **Arabic text, products, quiz and map:** edit `js/data.js`.
- **To publish:** commit and push. The workflow rebuilds `ar/index.html`, so don't edit that file by hand.
- **To preview locally first:** run `node tools/build.mjs`, then `python3 -m http.server`, and open http://localhost:8000.

## One-time setup

### 1. GitHub (repo `bur-m7th/drglowebsite`)

1. Go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
2. Push `main`. The **Actions** tab shows the deploy.
3. Go to **Settings → Pages → Custom domain**, enter `drgloglobal.com` and save.
4. Once the DNS check passes and the certificate is issued (this can take up to an hour), tick **Enforce HTTPS**.
5. Recommended: verify the domain at **GitHub profile → Settings → Pages → Add a domain**. Add the TXT record it gives you at Namecheap. This stops anyone else from claiming the domain on GitHub.

### 2. Namecheap (Domain List → drgloglobal.com → Advanced DNS)

First, delete Namecheap's default parking records: the `CNAME www → parkingpage.namecheap.com` record and the `URL Redirect @` record.

Then add these records:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | bur-m7th.github.io. |

With these in place, `www.drgloglobal.com` redirects to `drgloglobal.com` automatically. DNS changes usually take effect within 30 minutes, and occasionally up to 48 hours.

### 3. After the site is live

1. Add `https://drgloglobal.com` to Google Search Console and submit `https://drgloglobal.com/sitemap.xml`. Do the same in Bing Webmaster Tools.
2. Check the structured data with Google's Rich Results Test.
