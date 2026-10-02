# Apple Design

A pixel-inspired static re-creation of the Apple India storefront experience, built as a
multi-page front-end project with pure HTML, CSS, and vanilla JavaScript. The site mimics
Apple's signature design language — SF-style typography, glassy nav bars, hero product
tiles, and smooth scroll-driven animations.

## Pages

- `index.html` — Home page: announcement ribbon, hero product tiles (iPhone, Mac, iPad,
  Watch, AirPods), store highlights, and footer.
- `iphone.html` — iPhone product page with model configurator (`js/configurator.js`).
- `store.html` — Storefront-style grid of product categories and accessories.
- `accessories.html` — Accessories showcase (cases, bands, chargers, keyboard, Pencil).
- `environment.html` — Environment / sustainability story page.

## Features

- IntersectionObserver-driven reveal animations and sticky-bar effects
  (`js/main.js`)
- Product configurator with live model/option selection (`js/configurator.js`)
- Responsive navigation with mobile drawer (`js/nav.js`)
- Design-token-driven CSS: `css/tokens.css` (colors, spacing, type scale),
  `css/components.css` (buttons, cards, chips), `css/reset.css`, `css/global.css`
- Product imagery shipped locally under `assets/` — works fully offline
- Generated favicon set (SVG + PNG + ICO) via `make_favicons.py` / `generate_icons.py`
- `scraped_apple_in.json` — reference data captured from apple.com/in during research

## Tech stack

- HTML5, CSS3 (custom properties, flex/grid layouts), vanilla JavaScript (ES modules)
- Python 3 (Pillow) for favicon generation only — not needed at runtime

## Quick start

No build step, no dependencies. Open `index.html` directly in a browser, or serve it
statically:

```bash
# any static server, e.g.
npx serve .
# then open http://localhost:3000
```

## Project structure

```
Apple-Design/
├── index.html            # Home page
├── iphone.html           # iPhone page + configurator
├── store.html            # Storefront grid
├── accessories.html      # Accessories page
├── environment.html      # Environment story page
├── css/                  # tokens, reset, global, components
├── js/                   # main, nav, configurator
├── assets/               # product imagery + logo
├── favicon.svg / .ico    # favicon set
├── generate_icons.py     # favicon generation script
├── make_favicons.py      # favicon generation script
├── scraped_apple_in.json # research reference data
├── task.md               # build notes
└── implementation_plan.md # design plan
```

## Deploy

Fully static — deploy anywhere that serves static files:

- GitHub Pages: enable Pages on the `main` branch at `/`
  (live at https://girishlade111.github.io/Apple-Design/)
- Or Netlify / Cloudflare Pages with no build command (publish directory `.`)

---

Built by Girish Lade — https://ladestack.in
