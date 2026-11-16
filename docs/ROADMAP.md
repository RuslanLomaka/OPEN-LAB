# Roadmap

## Prototype (current)
Static GitHub Pages site with sample tool listings, categories, search, free-entry filter, saved favorites and workflow cards. No server, accounts or automatic updates.

## Next
1. Move listing data to a separately maintained JSON file or simple CMS.
2. Model each offer: provider, product, type, URL, region, eligibility, free limits, card requirement, commercial rights, published date, verified_at, expires_at, status and evidence URL.
3. Build a safe verification workflow using official pricing and offer pages; human review for unclear terms.
4. Mark expired or uncertain deals; never imply live validity without checking.
5. Add editorial workflow tutorials, tags and user reports.
6. Add testing and CI, then optional email alerts and subscription features only if worthwhile.

## Deployment
Repository root is a GitHub Pages static site. Choose Settings → Pages → Deploy from a branch → main → / (root). No Node dependencies.
