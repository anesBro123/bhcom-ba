# Agent context — bhcom-ba

Angular 21 logistics SPA with **admin** and **user** portals. Before implementing UI, check `.cursor/rules/` (especially `portal-feature.mdc` for CRUD features, plus `theme-tokens.mdc` for surfaces/typography/hover, `entity-service-colors.mdc` for user service-type chrome, `forms.mdc` / `tables.mdc` / `table-filters.mdc` / `confirm.mdc` / `layout.mdc` / `guest.mdc` / `shared-constants.mdc` / `shared-utils.mdc` when touching those areas).

## App structure (`src/app/`)

```
src/app/
├── shared/          # auth, i18n, theme, constants/, form/, table/, confirm/, ui/
├── guest/           # public routes, shell, guards, login/register pages
└── portal/          # authenticated shell, configs, features, guards
    ├── shell/       # PortalShell, sidebar, SidebarSectionFlyout, topbar, SidebarService
    ├── common/      # models, PORTAL_CONFIG barrel, is-nav-section-active util
    ├── guards/      # portalMatchGuard
    ├── user/        # routes, nav, config, features/
    └── admin/       # routes, nav, config, features/ (dashboard, users, vehicles, warehouses)
```

Legacy folders (`core/`, `features/`, `layout/`) were removed — do not recreate them.

## Layer rule

| Folder | Meaning |
|--------|---------|
| `shared/` | Used by **both** guest and portal (auth, i18n, theme, form/table/confirm frameworks, shared UI) |
| `guest/` | Public / unauthenticated routes, shell, guards |
| `portal/` | Authenticated user + admin (shell, configs, features) |

Guest may import from `shared/**` only for URLs and auth. Do **not** import portal configs, features, or shell from guest.

## Testing

- **Do not add unit tests** — no `*.spec.ts`, Vitest suites, or test scaffolding unless the user explicitly asks for tests.
- Do not extend existing unit tests unless explicitly requested.
- Verify changes with `npm run build` and manual checks in the browser (`npm start`).

## Portals

| Portal | URL prefix | Routes file | Nav config | Features |
|--------|------------|-------------|------------|----------|
| User | `/` (e.g. `/home`) | `portal/user/user.routes.ts` | `portal/user/user-nav.config.ts` | `portal/user/features/**` (home, find, our-listings, offer, transport, freight, warehouse) |
| Admin | `/admin` (e.g. `/admin/dashboard`) | `portal/admin/admin.routes.ts` | `portal/admin/admin-nav.config.ts` | `portal/admin/features/**` (dashboard, settings, users, vehicles, warehouses) |

### Routing

- Root routes: `src/app/app.routes.ts` — guest routes + lazy portal trees with `portalMatchGuard`.
- Guest routes: `src/app/guest/guest.routes.ts` — two `GuestShellComponent` trees (root + `admin` prefix); landing, sign-in, login, register.
- URL constants: `shared/constants/guest-urls.ts`, `user-urls.ts`, `admin-urls.ts` (barrel: `app-urls.ts`) — **never hardcode route paths**; add new URLs to the domain file first (see `.cursor/rules/app-urls.mdc`).

| Guest path | Purpose |
|------------|---------|
| `/` | Landing |
| `/sign-in` | Portal picker |
| `/login` | User login |
| `/admin/login` | Admin login |
| `/register` | Company registration |

### Guards

| Guard | File | Role |
|-------|------|------|
| `guestGuard` | `guest/guards/guest.guard.ts` | All guest routes — unauthenticated allow; authenticated → session portal home |
| `portalMatchGuard` | `portal/guards/portal-match.guard.ts` | Lazy portal trees — require auth + matching portal |

- Auth: `shared/core/auth/` — session types (`AuthUser`, `Session`); `PortalKind` in `shared/constants/portal-kind.type.ts`; stub login until API; company registration stub in `guest/pages/register/register-company.service.ts`.
- Portal shell injects `PORTAL_CONFIG` only (not `AuthService` for nav).

**Do not** import `portal/admin/features/**` from user routes or vice versa. Both may use `shared/**`.

## HTTP services

- Feature API: colocate `*.service.ts` with the feature under `portal/{user|admin}/features/<domain>/`.
- Portal-wide (2+ features): `portal/{user|admin}/data/`.
- App infra: `shared/core/`.

## Quick entry points

- **Portal CRUD (canonical):** `portal/admin/features/vehicles/` — `data/`, `form/`, `table/`; list + create + edit; see `portal-feature.mdc`
- **Admin dashboard:** `portal/admin/features/dashboard/` — KPI row (`app-metric-card`, counts via `AdminDashboardService`) + Quick Actions (`app-quick-action-card`, grouped browse/create columns + settings row); see `new-page.mdc`, `layout.mdc`
- **Guest shell:** `src/app/guest/shell/`
- **Portal shell:** `src/app/portal/shell/` (`PortalShellComponent`, `SidebarService`, `PortalSidebarComponent`, `SidebarSectionFlyoutComponent`); topbar actions: theme → language → notifications → account; shared nav panel: `portal/shell/portal-sidebar/_sidebar-nav-panel.scss`
- **Sidebar nav:** `portal/common/models/nav.model.ts` (`NavSection.route` user flat links, `NavSection.items` admin groups); `user-nav.config.ts` (Home, Find, Our listings, Offer); `nav-link-active-options.ts` for hub `?tab=` active state; hub pages use `EntityTabsComponent` — see `entity-tabs.mdc`, `layout.mdc`
- **User home (hub):** `portal/user/features/home/` — company snapshot → **quick actions** (`home.actions.config.ts`, colored `QuickActionCardComponent` 3×2 grid) → **journey** (`IntentCardComponent` with `[entityTab]`) → browse footer; hub links via `userFindRoute()` / `userOurListingsRoute()` — see `entity-service-colors.mdc`, `new-page.mdc`
- **User find hub:** `portal/user/features/find/` — `.page-hub-header` (`styles/_page-hub-header.scss`) wraps `PageTitleComponent` + `EntityTabsComponent` + embedded marketplace tables (`/find?tab=`)
- **User our listings hub:** `portal/user/features/our-listings/` — `.page-hub-header` wraps `PageHeaderComponent` (tab-specific create CTA) + `EntityTabsComponent` + embedded our tables (`/our-listings?tab=`)
- **User offer picker:** `portal/user/features/offer/` — entity picker → create forms; page title `portal.user.pages.offer.title` (Offer service / Ponudite uslugu); entry via `USER_OFFER_URL`
- **User CRUD (reference):** `portal/user/features/transport/` — `data/`, `form/`, `table-all/`, `table-our/`, `detail/`; All vs Our list split; row click → detail page; list pages embedded in hub routes only
- **Stepper (create + edit):** `portal/admin/features/vehicles/form/` — `stepperMode`, `stepperDataReady`, `isEdit` pattern (see `forms.mdc`)
- **Stepper (create-only):** `guest/pages/register/`
- **Stepper UI/logic:** `shared/form/form-stepper/`, `shared/form/form-page/`, `form.utils.ts` — `ValidationState` (`notStarted` | `inProgress` | `valid` | `invalid`), free navigation, validate on leave/submit only, mobile current-title + chip rail at ≤768px
- **Guest login:** `guest/pages/login/user-login-page.*`, `admin-login-page.*`
- **Guest register:** `guest/pages/register/register-company-page.*` (+ `register-company.service.ts` stub)
- **App URLs:** `shared/constants/app-urls.ts` (barrel), `guest-urls.ts`, `user-urls.ts`, `admin-urls.ts`, `portal-kind.type.ts`
- **BiH cities:** `shared/constants/bih-cities.ts` — `BIH_CITY_OPTIONS` for autocomplete origin/destination fields
- **User entity status (interim):** `shared/constants/user-entity-status.ts` — `UserEntityStatus`; all entities will get their own status unions later — see `entity-status.mdc`
- **Entity service colors (user portal):** `src/styles/_entity-service-accent.scss` + `entityContextClass()` in `shared/constants/entity-context-class.ts` — transport/freight/warehouse context chrome on cards, tabs, **table controls cards**, form/detail titles; **not** status badges or sidebar accent — see `entity-service-colors.mdc`
- **Portal page icons:** `portal/admin/admin-page-icons.ts`, `portal/user/user-page-icons.ts` — sidebar link icons, page titles (`UserPageIcons.home` = `LucideHome`)
- **Date form utils:** `shared/utils/date-input.ts` — `DatePeriodValue`, calendar helpers, `notPastDateValidator`, `endDateOnOrAfterStartValidator`, `minDate` on field defs — see `shared-utils.mdc`
- **Date period picker:** `shared/ui/date-period-picker/` — `DatePeriodPickerComponent` for filter + form input; `type: 'datePeriod'` + `FormDatePeriodFieldComponent` in forms — see `forms.mdc`, `table-filters.mdc`, `layout.mdc`
- **Display date formatting:** `shared/utils/format-display-date.ts` — `formatDisplayDate()` for tables, date-range display, date period picker, detail pages
- **Shared UI frameworks:** `shared/form/`, `shared/table/`, `shared/confirm/` (`ConfirmService`, `ConfirmDialogComponent` in `app.html`)
- **Table filters (user + admin):** `shared/table/` flyout panel; **split-card chrome** (controls card: search + Filters toggle + chips band with top-right **Clear filters** link; data card: table/pagination — default `tableChromeVariant='splitCard'`); per-filter accordion (`table-filter-field/`); `buildFilterSummary()` / `buildFilterChips()`; **multi-select search autofocus**; **custom dual-thumb number-range** slider; **date-range** via `DatePeriodPickerComponent`; defs in `portal/user/features/*/data/*-table-filters.ts` — see `table-filters.mdc`, `theme-tokens.mdc`
- **Entity detail pages (user portal):** `shared/detail/` (`DetailViewComponent`, `defineDetail`, `buildDetailPageActions`); layout via `DetailPageLayoutComponent` + header `DetailActionBarComponent`; **`EntityDetailSummaryComponent`** summary band (location left, status right); static `subtitleFind` / `subtitleOur` via `resolveDetailSubtitleKey()` in `portal/user/common/entity-detail-navigation.ts`; row click + `viewDetails` → `userTransportDetailUrl()` / `userFreightDetailUrl()` / `userWarehouseDetailUrl()`; omit status/route/warehouse from `*.detail.ts` — see `detail-page.mdc`
- **Route display UI:** `shared/ui/route-display/` — `RouteDisplayComponent` (`app-route-display`) for origin → destination with neutral chips in tables
- **Date range display UI:** `shared/ui/date-range-display/` — `DateRangeDisplayComponent` (`app-date-range-display`) for **read-only** merged period / single-date table columns
- **Date period picker UI:** `shared/ui/date-period-picker/` — `DatePeriodPickerComponent` (`app-date-period-picker`) for **input** in filters + forms (`variant`: `'filter'` | `'form'`)
- **Vehicle display UI:** `shared/ui/vehicle-display/` — `VehicleDisplayComponent` (`app-vehicle-display`) for vehicle name + plate in tables
- **Warehouse display UI:** `shared/ui/warehouse-display/` — `WarehouseDisplayComponent` (`app-warehouse-display`) for warehouse name + city in storage tables
- **Status badge UI:** `shared/ui/status-badge/` — `StatusBadgeComponent` (`app-status-badge`); **only colored semantic pill in a table row** — do not reuse status colors on route/date/warehouse cells. Theme tokens `--status-*` in `styles.scss`. User transport/freight/warehouse today; **all listable entities will have `status`**
- **Table cell display (user transport/freight/warehouse):** reuse shared widgets per `tables.mdc` — `RouteDisplayComponent` (neutral chips), `DateRangeDisplayComponent` (merged period column, `width: '18rem'`), `VehicleDisplayComponent`, `WarehouseDisplayComponent` (name + city). Denormalize `vehicleName`/`vehiclePlate` and `warehouseName`/`warehouseCity` on create/update via portal `company-*.service.ts` `getDisplay()`.
- **Delete confirmation example:** `portal/admin/features/vehicles/table/vehicle-table-page.component.ts`
- **Shared UI widgets:** `shared/ui/` (brand-mark, **theme-picker** and **language-picker** — single-click toggles in topbar, language shows EN/BS), metric-card, quick-action-card, intent-card, page-title, page-back-link, page-header, primary-action-link, detail-page-layout, entity-detail-summary, detail-action-bar, route-display, date-range-display, **date-period-picker**, vehicle-display, warehouse-display, status-badge)
- **Dashboard KPI card:** `shared/ui/metric-card/` — `MetricCardComponent` (`app-metric-card`); inputs: `titleKey`, `value`, `subtitleKey`, `icon`, `variant`; wrap in `routerLink` on dashboard pages for clickable tiles; prefer `variant="default"` for neutral icon tint
- **Dashboard action tile:** `shared/ui/quick-action-card/` — `QuickActionCardComponent` (`app-quick-action-card`); inputs: `titleKey`, `descriptionKey`, `route`, `icon`, optional `queryParams`, optional `entityTab`; admin dashboard = neutral icons; **user home** passes `[entityTab]` for colored spine + icon — see `entity-service-colors.mdc`
- **User intent card:** `shared/ui/intent-card/` — `IntentCardComponent` (`app-intent-card`); optional `[entityTab]` for colored spine + icon; Home journey + Offer use `clickableCard` with single Continue action; Home `.home-page__journey-grid` caps at **24rem** per column, left-aligned — see `entity-service-colors.mdc`
- **Entity tabs (user hubs):** `shared/ui/entity-tabs/` — `EntityTabsComponent` (`app-entity-tabs`); active tab gets entity colors; config `portal/user/user-entity-tabs.config.ts`; Find/Our listings wrap title + tabs in `.page-hub-header` (`styles/_page-hub-header.scss`); programmatic nav: `userFindUrl()` / `userOurListingsUrl()`; template links: `userFindRoute()` / `userOurListingsRoute()` — see `entity-tabs.mdc`, `entity-service-colors.mdc`
- **Portal page title:** `PageTitleComponent` (`shared/ui/page-title/`, `app-page-title`) — flex row: bare decorative icon (20px) vertically centered beside `.page-title__text` (title + subtitle, `gap: 0.25rem`); optional `[entityTab]` tints icon on user entity create/edit/detail pages; subtitle `max-width: 42rem`; standalone pages get `border-bottom` header divider; hubs use `.page-hub-header` instead. `PageHeaderComponent` draws divider for title + create CTA rows. See `page-title.mdc`, `entity-service-colors.mdc`.
- **Form section header:** `FormSectionComponent` — same flex icon + text pattern as page title inside form cards; bare icons — see `forms.mdc`.
- **Form page back link:** `PageBackLinkComponent` (`shared/ui/page-back-link/`, `app-page-back-link`) — required on portal create/edit form pages above `PageTitleComponent`; inputs: `route` (list URL from `app-urls.ts`), `labelKey` (reuse `portal.*.nav.all*` or `portal.user.nav.our*`), `form` (dirty → `ConfirmService` + `shared.form.common.discardChanges.*`). Admin → entity list; user → `userOurListingsUrl(matchingEntity)`. See `page-title.mdc`.
- **Table page create CTA:** when a list page has a create route, compose `app-page-header` with `app-page-title` + `app-primary-action-link` — page owns `createUrl` / `createLabelKey`; not inside `PageTitleComponent` or `DataTableComponent`. See `page-title.mdc`, `portal-feature.mdc`.
- **Theme tokens:** `src/styles.scss`, `src/styles/_entity-service-accent.scss`, `src/styles/_table-chrome-split-card.scss`, `src/styles/_interaction.scss` — 4-layer surfaces (`--bg-chrome` → `--bg-app` → `--bg-surface` → `--bg-inset` / `--bg-control`), typography scale (`--font-size-*`), interaction mixins, entity service hues (`--entity-*`). Tables use **split-card chrome** by default (controls card + data card). See `theme-tokens.mdc`, `table-filters.mdc`, `entity-service-colors.mdc`.

## Cursor rules

| Rule | When it applies |
|------|-----------------|
| `00-project.mdc` | Always — stack, paths, commands, portals |
| `app-urls.mdc` | Always — route URLs via `shared/constants/app-urls.ts` only |
| `angular.mdc` | `src/**/*.{ts,html,scss}` |
| `guest.mdc` | `src/app/guest/**` |
| `theme-tokens.mdc` | `src/**/*.scss`, `src/styles/**` — surface layers, typography scale, hover/focus mixins; links to `entity-service-colors.mdc` |
| `layout.mdc` | `guest/shell/**`, `portal/shell/**`, `shared/ui/**` — sidebar sections, flyout, nav icon rules |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` — key namespaces |
| `forms.mdc` | `shared/form/**`, `*.form.ts` |
| `tables.mdc` | `shared/table/**`, `*.table.ts`, `*-table-page.component.*` — table defs + list pages (incl. create CTA) |
| `table-filters.mdc` | `shared/table/**`, `*-table-filters.ts` — advanced filter defs, panel/chips UX, persistence |
| `detail-page.mdc` | `shared/detail/**`, `shared/ui/detail-*`, `shared/ui/entity-detail-summary/**`, user `*/detail/*`, `entity-detail-navigation.ts` — detail pages, summary band, row click navigation |
| `confirm.mdc` | `shared/confirm/**`, destructive-action flows |
| `portal-feature.mdc` | `portal/**/features/**` — CRUD layout (vehicles reference) |
| `new-page.mdc` | `portal/**/features/**`, route files, nav configs, guest pages |
| `page-title.mdc` | Portal page templates + `shared/ui/page-title/` + `shared/ui/page-back-link/` — title, back link, icon, table create CTA |
| `shared-constants.mdc` | `bih-cities.ts`, `user-entity-status.ts`, `entity-context-class.ts`, `admin-page-icons.ts`, `user-page-icons.ts` |
| `entity-status.mdc` | Entity `status` field, `StatusBadgeComponent`, per-entity status conventions |
| `entity-service-colors.mdc` | User portal transport/freight/warehouse accent system — `_entity-service-accent.scss`, `entityTab` on shared widgets, home quick actions |
| `entity-tabs.mdc` | User Find / Our listings hub pages, `EntityTabsComponent`, tab URL builders |
| `shared-utils.mdc` | `date-input.ts`, `format-display-date.ts`, `normalize-for-search.ts` |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss` (`below-md`), `portal/shell/viewport.ts`; filter grid also uses `below-lg` (1100px) for 2-column layout
- **Tables (mobile):** card list inside `DataTableComponent` — not horizontal table scroll
