# Apple Design System — Full Website Implementation

Build a pixel-faithful, multi-page Apple-style website that implements every design token, component, and layout pattern described in the specification. The site will showcase the design system across 5 surfaces: **Homepage**, **Store**, **iPhone 17 Pro Buy Page**, **Accessories**, and **Environment**.

## Proposed Changes

### Project Structure

```
Apple-Design/
├── index.html              ← Homepage (product tile grid)
├── store.html              ← Store landing
├── iphone.html             ← iPhone 17 Pro buy/configurator
├── accessories.html        ← Accessories grid
├── environment.html        ← Environment editorial
├── css/
│   ├── tokens.css          ← All design tokens (colors, typography, spacing, radius, shadows)
│   ├── reset.css           ← Minimal CSS reset
│   ├── global.css          ← Global layout, nav, footer, tile system
│   └── components.css      ← All component styles (buttons, cards, chips, inputs, sticky bar)
├── js/
│   ├── nav.js              ← Mobile hamburger toggle, sub-nav scroll behavior
│   ├── configurator.js     ← iPhone configurator chip selection logic
│   └── main.js             ← Intersection Observer lazy-load, smooth scroll, sticky bar
└── assets/
    └── (generated images)
```

---

### 1. Design Tokens — `css/tokens.css`

#### [NEW] [tokens.css](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/css/tokens.css)

All design tokens as CSS custom properties on `:root`:

- **Colors**: Every token from the spec — `--color-primary` (#0066cc), `--color-primary-focus` (#0071e3), `--color-primary-on-dark` (#2997ff), all 3 surface tiles, parchment, pearl, ink, body, muted variants, hairline, divider-soft, chip-translucent
- **Typography**: Font family stacks (Inter variable as SF Pro substitute with `font-feature-settings: "ss03"`), size/weight/line-height/letter-spacing for all 17 type tokens
- **Spacing**: 8px base — xxs through section (4px → 80px)
- **Border Radius**: none/xs/sm/md/lg/pill/full
- **Elevation**: The single product shadow + hairline border + backdrop blur values
- **Breakpoint reference comments** (CSS custom properties can't do breakpoints, but we'll document them)

---

### 2. CSS Reset — `css/reset.css`

#### [NEW] [reset.css](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/css/reset.css)

Minimal modern reset: box-sizing border-box, margin/padding zero, font inheritance, img block, smooth scroll.

---

### 3. Global Styles — `css/global.css`

#### [NEW] [global.css](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/css/global.css)

- **`global-nav`**: 44px black bar, 12px nav links, Apple logo SVG (inline), search/bag icons, hamburger at ≤833px
- **`sub-nav-frosted`**: 52px frosted bar, backdrop-filter blur(20px) saturate(180%), parchment at 80% opacity, product name left, links + buy CTA right
- **Product tile system**: `.tile-light`, `.tile-parchment`, `.tile-dark`, `.tile-dark-2`, `.tile-dark-3` — full-bleed, 80px vertical padding, centered content stack
- **Footer**: Parchment background, 5-column dense link grid (17px / 2.41 line-height), legal fine-print row
- **Responsive breakpoints**: All 8 breakpoints via `@media` queries implementing the collapsing strategy

---

### 4. Component Styles — `css/components.css`

#### [NEW] [components.css](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/css/components.css)

Every component from the spec:

- **Buttons**: `button-primary` (blue pill), `button-secondary-pill` (ghost pill), `button-dark-utility`, `button-pearl-capsule`, `button-store-hero` (18px/300), `button-icon-circular` — all with `scale(0.95)` active state and focus ring
- **Cards**: `store-utility-card` (18px radius, hairline border, 24px padding), `configurator-option-chip` + selected state, `environment-quote-card`
- **Inputs**: `search-input` (pill-shaped, 44px height)
- **`floating-sticky-bar`**: Fixed bottom, frosted glass, price + Add to Bag CTA
- **Text links**: `text-link` (action blue) and `text-link-on-dark` (sky blue)

---

### 5. HTML Pages

#### [NEW] [index.html](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/index.html) — Homepage

- Global nav + sub-nav (Apple / Store / Mac / iPad / iPhone / Watch / etc.)
- Alternating product tiles: iPhone 17 Pro (dark) → MacBook Air (light) → iPad Pro (dark-2) → Apple Watch (parchment) → AirPods (dark-3) → Mac (light)
- Each tile: headline + tagline + two pill CTAs + product render with product shadow
- Footer with 5-column link grid + legal row

#### [NEW] [store.html](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/store.html) — Store

- Store sub-nav with "Store" category name
- Hero tile with `button-store-hero` (18px/300 weight CTA)
- Utility card grid (4-5 columns) with store products
- Search input (pill-shaped)

#### [NEW] [iphone.html](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/iphone.html) — iPhone 17 Pro

- Product sub-nav with "iPhone 17 Pro" + inline links + "Buy" CTA
- Hero product photography
- Configurator section: color chips, storage chips, trade-in options — all pill-shaped with selected state (2px blue border)
- Floating sticky bar at bottom (frosted glass, running price + "Add to Bag")

#### [NEW] [accessories.html](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/accessories.html) — Accessories

- Accessories sub-nav
- Search input at top
- Accessory grid: 1:1 square product cards with 18px radius, hairline border
- Category filtering

#### [NEW] [environment.html](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/environment.html) — Environment

- Environment sub-nav
- Dark photographic hero (`environment-quote-card`) with Apple 2030 logo
- Editorial content sections with `lead-airy` typography (24px/300)
- Light/dark alternating editorial tiles
- Narrower max-width (~980px) for reading comfort

---

### 6. JavaScript

#### [NEW] [nav.js](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/js/nav.js)
- Hamburger menu toggle at ≤833px
- Sub-nav link collapse behavior
- Active page highlighting

#### [NEW] [configurator.js](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/js/configurator.js)
- Chip selection logic (radio-style within groups)
- Price calculation based on selections
- Sticky bar price update

#### [NEW] [main.js](file:///c:/Users/Girish%20Lade/OneDrive/Desktop/Apple-Design/js/main.js)
- Intersection Observer for lazy-loading images and fade-in animations
- Smooth scroll behavior
- Sticky bar show/hide on scroll

---

### 7. Generated Assets

Product imagery will be generated using the image generation tool to create:
- iPhone 17 Pro hero render
- MacBook Air render
- iPad Pro render
- Apple Watch render
- AirPods render
- Mac render
- Store hero image
- Environment hero photograph (mountain vista)
- Accessory product thumbnails
- Apple logo SVG (inline)

---

## Key Design Decisions

> [!IMPORTANT]
> **Font Substitution**: Using Inter (Google Fonts, variable) as the SF Pro substitute with `font-feature-settings: "ss03"`, tightened letter-spacing by `-0.01em` on display sizes, and line-height adjusted from 1.47 → 1.44 for body text per the spec's substitution guidance.

> [!IMPORTANT]
> **No framework**: Pure HTML/CSS/JS — no build tools, no bundler. This keeps the implementation transparent and directly maps to the design tokens. You can open `index.html` in any browser.

> [!NOTE]
> **Product imagery**: Will be AI-generated to approximate Apple's product photography style. These are stand-in renders, not official Apple assets.

## Open Questions

> [!IMPORTANT]
> **Scope of pages**: The spec describes 5 surfaces. Should I build all 5 pages (Homepage, Store, iPhone 17 Pro, Accessories, Environment), or start with a subset? Building all 5 will give the fullest demonstration of the design system.

> [!IMPORTANT]
> **Live server**: Would you like me to set up a local dev server (e.g., via `npx serve`) so you can preview the site in-browser, or is opening the HTML files directly sufficient?

## Verification Plan

### Manual Verification
- Open each page in browser and visually compare against the spec
- Test responsive breakpoints at 419px, 640px, 734px, 833px, 1068px, 1440px
- Verify button active states (`scale(0.95)`) and focus rings
- Check tile alternation rhythm (light ↔ dark)
- Confirm the single product shadow appears only on product renders
- Test hamburger nav at mobile breakpoints
- Verify configurator chip selection and sticky bar on iPhone page
