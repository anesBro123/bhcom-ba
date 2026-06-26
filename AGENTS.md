# Agent context — bhcom-ba

Angular 21 logistics SPA with **admin** and **user** portals. Before implementing UI, check `.cursor/rules/` (especially `portal-feature.mdc` for CRUD features, plus `theme-tokens.mdc` for surfaces/typography/hover, `entity-service-colors.mdc` for user service-type chrome, `forms.mdc` / `tables.mdc` / `table-filters.mdc` / `confirm.mdc` / `layout.mdc` / `guest.mdc` / `shared-constants.mdc` / `shared-utils.mdc` when touching those areas).

## App structure (`src/app/`)

```
src/app/
├── shared/          # auth, i18n, theme, shell/, constants/, form/, table/, confirm/, ui/
├── guest/           # unauthenticated routes, guards, portal-picker/login/register pages
└── portal/          # configs, guards, features
    ├── common/      # models (PORTAL_CONFIG, TopbarNavItem)
    ├── guards/      # portalMatchGuard
    ├── user/        # routes, config, topbar nav, features/
    └── admin/       # routes, config, features/
```

Legacy folders (`core/`, `features/`, `layout/`) were removed — do not recreate them.

## Layer rule

| Folder | Meaning |
|--------|---------|
| `shared/` | Used by **both** guest and portal (auth, i18n, theme, form/table/confirm frameworks, shared UI) |
| `guest/` | Unauthenticated routes, guards, auth pages |
| `portal/` | Authenticated user + admin (configs, features) |

Guest may import from `shared/**` only for URLs and auth. Do **not** import portal configs, features, or shell from guest.

## Testing

- **Do not add unit tests** — no `*.spec.ts`, Vitest suites, or test scaffolding unless the user explicitly asks for tests.
- Do not extend existing unit tests unless explicitly requested.
- Verify changes with `npm run build` and manual checks in the browser (`npm start`).

## Portals

| Portal | URL prefix | Routes file | Topbar nav | Features |
|--------|------------|-------------|------------|----------|
| User | `/` (e.g. `/home`) | `portal/user/user.routes.ts` | `user-topbar-nav.config.ts` — empty (`topbarNav: []`) | `portal/user/features/**` |
| Admin | `/admin` (e.g. `/admin/home`) | `portal/admin/admin.routes.ts` | empty (`topbarNav: []`) — in-page hub tabs | `portal/admin/features/**` |

### Routing

- Root routes: `src/app/app.routes.ts` — `AppShellComponent` wraps guest + lazy portal trees with `portalMatchGuard`.
- Guest routes: `src/app/guest/guest.routes.ts` — flat pages under app shell.
- URL constants: `shared/constants/guest-urls.ts`, `user-urls.ts`, `admin-urls.ts` (barrel: `app-urls.ts`) — **never hardcode route paths**; add new URLs to the domain file first (see `.cursor/rules/app-urls.mdc`).

| Guest path | Purpose |
|------------|---------|
| `/` | Portal picker (user vs admin) |
| `/login` | User login |
| `/admin/login` | Admin login |
| `/register` | Company registration |

### Guards

| Guard | File | Role |
|-------|------|------|
| `guestGuard` | `guest/guards/guest.guard.ts` | All guest routes — unauthenticated allow; authenticated → session portal home |
| `portalMatchGuard` | `portal/guards/portal-match.guard.ts` | Lazy portal trees — require auth + matching portal |

- Auth: `shared/core/auth/` — session types (`AuthUser`, `Session`); `PortalKind` in `shared/constants/portal-kind.type.ts`; stub login until API; company registration stub in `guest/pages/register/register-company.service.ts`.
- Portal config: `PORTAL_CONFIG` on lazy branches in `app.routes.ts`; `AppTopbarComponent` reads `topbarNav` + `shell.homeUrl`.

**Do not** import `portal/admin/features/**` from user routes or vice versa. Both may use `shared/**`.

## HTTP services

- Feature API: colocate `*.service.ts` with the feature under `portal/{user|admin}/features/<domain>/`.
- Portal-wide (2+ features): `portal/{user|admin}/data/`.
- App infra: `shared/core/`.

## Quick entry points

- **Portal CRUD (canonical):** `portal/admin/features/vehicles/` — `data/`, `form/`, `table/`; list + create + edit; see `portal-feature.mdc`
- **Admin home hub:** `portal/admin/features/home/` — company management hub at `/admin/home?tab=` with `EntityTabsComponent` (`accentMode="neutral"`) + embedded tables; row click → detail; create via topbar `EntityCreateMenuComponent` — see `entity-tabs.mdc`, `detail-page.mdc`, `portal-feature.mdc`
- **App shell:** `src/app/shared/shell/` (`AppShellComponent`, `AppTopbarComponent`); topbar: theme → language → notifications → account (when authenticated); **brand:** plain BHCOM (user) or BHCOM + neutral **ADMIN** suffix (admin); guest-only portal accents on picker/login/register — see `layout.mdc`
- **Topbar create menu:** `shared/shell/app-topbar/entity-create-menu/` — `EntityCreateMenuComponent` (`+` beside brand); user options from `user-offer-options.config.ts` (`shared.topbar.offer.openMenu`); admin from `admin-create-options.config.ts` (`shared.topbar.create.openMenu`)
- **User topbar:** brand (plain BHCOM) → marketplace (**Tržište**); account **Moje objave** / **My listings** (`LucideListChecks`) → `userOurListingsUrl()`
- **User marketplace home:** `portal/user/features/home/` — **Tržište** / **Marketplace**; `.page-hub-header` + tab publish CTA + `EntityTabsComponent` + embedded `*AllTablePageComponent`; icon `UserPageIcons.marketplace` (`LucideLayoutGrid`); tab sync via `syncHubEntityTab()` in `shared/utils/hub-tab-sync.ts`
- **User my listings:** `portal/user/features/our-listings/` — **Moje objave** / **My listings**; same hub pattern + embedded `*OurTablePageComponent`; icon `UserPageIcons.ourListings` (`LucideListChecks`)
- **User CRUD (reference):** `portal/user/features/transport/` — `data/`, `form/`, `transport.table.ts` (`buildTransportTable`), `table-all/`, `table-our/`, `detail/`; All vs Our list split; row click → detail page; list pages embedded in hub routes only
- **Stepper (create + edit):** `portal/admin/features/vehicles/form/` — `stepperMode`, `stepperDataReady`, `isEdit` pattern (see `forms.mdc`)
- **Stepper (create-only):** `guest/pages/register/`
- **Stepper UI/logic:** `shared/form/form-stepper/`, `shared/form/form-page/`, `form.utils.ts` — `ValidationState` (`notStarted` | `inProgress` | `valid` | `invalid`), free navigation, validate on leave/submit only, mobile current-title + chip rail at ≤768px
- **Guest login:** `guest/pages/user-login/`, `guest/pages/admin-login/`
- **Guest register:** `guest/pages/register/register-company-page.*` (+ `register-company.service.ts` stub)
- **App URLs:** `shared/constants/app-urls.ts` (barrel), `guest-urls.ts`, `user-urls.ts`, `admin-urls.ts`, `portal-kind.type.ts`
- **BiH cities:** `shared/constants/bih-cities.ts` — `BIH_CITY_OPTIONS` for autocomplete origin/destination fields
- **User entity status (interim):** `shared/constants/user-entity-status.ts` — `UserEntityStatus`; all entities will get their own status unions later — see `entity-status.mdc`
- **Entity service colors (user portal):** `src/styles/_entity-service-accent.scss` + `entityContextClass()` in `shared/constants/entity-context-class.ts` — transport/freight/warehouse context chrome on tabs, **table controls + data cards** (identical rest spine), form/detail titles; **table row cards (mobile + desktop card view): no left spine**; **not** status badges — see `entity-service-colors.mdc`
- **Portal page icons:** `portal/admin/admin-page-icons.ts`, `portal/user/user-page-icons.ts` — hub icons: `marketplace` (`LucideLayoutGrid`), `ourListings` (`LucideListChecks`); entity icons: `transport`, `freight`, `warehouse`; admin hub: `home`, `settings`
- **Date form utils:** `shared/utils/date-input.ts` — `DatePeriodValue`, calendar helpers, `notPastDateValidator`, `endDateOnOrAfterStartValidator`, `minDate` on field defs — see `shared-utils.mdc`
- **Hub tab sync:** `shared/utils/hub-tab-sync.ts` — `syncHubEntityTab(route, destroyRef, parseTab, activeTab)` for `?tab=` query param on hub pages
- **Date period picker:** `shared/ui/date-period-picker/` — `DatePeriodPickerComponent` for filter + form input; `type: 'datePeriod'` + `FormDatePeriodFieldComponent` in forms — see `forms.mdc`, `table-filters.mdc`, `layout.mdc`
- **Display date formatting:** `shared/utils/format-display-date.ts` — `formatDisplayDate()` for tables, date-range display, date period picker, detail pages
- **Shared UI frameworks:** `shared/form/`, `shared/table/`, `shared/confirm/` (`ConfirmService`, `ConfirmDialogComponent` in `app.html`)
- **Table filters (user + admin):** `shared/table/` flyout panel; **split-card chrome** (controls card: search + **view toggle** (desktop: `LayoutGrid`/`List`, left of Filters) + **Filters** toggle (`Funnel` icon) + chips band — desktop: chips + top-right **Clear filters**; mobile: Clear top-right then full-width compact chips, icon-only filter toggle with active dot); data card: table or **card grid** (desktop card view: 2 cols, 3 cols ≥1100px) + pagination — default `tableChromeVariant='splitCard'`); per-filter accordion (`table-filter-field/`); shared user filter partials in `shared/table/user-list-filter-partials.ts` (`routeCityFilters`, `entityStatusFilter`); `buildFilterSummary()` / `buildFilterChips()` with mobile `compact` truncation; **multi-select search autofocus**; **option tiles** (`BOOLEAN_FILTER_OPTIONS`, enums, `showOptionIcons` / `showStatusBadges`); **custom dual-thumb number-range** slider; **date-range** via `DatePeriodPickerComponent` (`titleKey: shared.table.filters.period`; vehicle admin dates use entity-specific filter titles); view mode persisted via `table-filter-storage.ts`; mock services use `applyTableFilters()` from `shared/table/apply-table-filters.ts`; defs in `portal/{user|admin}/features/*/data/*-table-filters.ts` + `filterStorageKey` on feature `*.table.ts` (`build*Table` factories) — see `table-filters.mdc`, `tables.mdc`, `theme-tokens.mdc`
- **Entity detail pages:** `shared/detail/` + `EntityDetailSummaryComponent`; `buildDetailPageActions(portal, entity, options)` unified API in `detail-page.constants.ts`; user detail origin `EntityDetailOrigin = 'marketplace' | 'our'` via `entity-detail-navigation.ts`; shared subtitles `portal.user.pages.listingDetail.subtitleSearch` / `.subtitleOur` via `resolveDetailSubtitleKey()`; back **Tržište** / **Moje objave** via `resolveDetailBack()` — see `detail-page.mdc`
- **Route display UI:** `shared/ui/route-display/` — `RouteDisplayComponent` (`app-route-display`) for origin → destination with neutral chips in tables
- **Date range display UI:** `shared/ui/date-range-display/` — `DateRangeDisplayComponent` (`app-date-range-display`) for **read-only** merged period / single-date table columns
- **Date period picker UI:** `shared/ui/date-period-picker/` — `DatePeriodPickerComponent` (`app-date-period-picker`) for **input** in filters + forms (`variant`: `'filter'` | `'form'`)
- **Vehicle display UI:** `shared/ui/vehicle-display/` — `VehicleDisplayComponent` (`app-vehicle-display`) for vehicle make + plate in user transport tables and admin vehicle list
- **Warehouse display UI:** `shared/ui/warehouse-display/` — `WarehouseDisplayComponent` (`app-warehouse-display`) for warehouse name + city in user warehouse tables and admin warehouse list
- **Status badge UI:** `shared/ui/status-badge/` — `StatusBadgeComponent` (`app-status-badge`); **only colored semantic pill in a table row** — do not reuse status colors on route/date/warehouse cells. Theme tokens `--status-*` in `styles.scss` (`open` green, `in_progress` blue, `canceled` red, `closed` amber). User transport/freight/warehouse today; **all listable entities will have `status`**
- **Table cell display (user transport/freight/warehouse):** reuse shared widgets per `tables.mdc` — `RouteDisplayComponent` (neutral chips), `DateRangeDisplayComponent` (merged period column, `width: '18rem'`), `VehicleDisplayComponent`, `WarehouseDisplayComponent` (name + city). Denormalize `vehicleName`/`vehiclePlate` and `warehouseName`/`warehouseCity` on create/update via portal `company-*.service.ts` `getDisplay()`.
- **Admin hub table cells:** users — combined `firstName lastName` custom cell (`mobile.primary`); vehicles — `VehicleDisplayComponent` (`marka` + `registarskaOznaka`); warehouses — `WarehouseDisplayComponent` (`name` + `city`); all with `entityTab` on `DataTableComponent` — see `tables.mdc`, `entity-service-colors.mdc`
- **Delete confirmation example:** `portal/admin/features/vehicles/table/vehicle-table-page.component.ts`
- **Shared UI widgets:** `shared/ui/` (brand-mark, **theme-picker** and **language-picker** — single-click toggles in topbar, language shows EN/BS), entity-tabs, page-title, page-back-link, page-header, primary-action-link, detail-page-layout, entity-detail-summary, detail-action-bar, route-display, date-range-display, **date-period-picker**, vehicle-display, warehouse-display, status-badge)
- **Entity tabs (user hubs):** `EntityTabsComponent` at `/home` (marketplace) and `/our-listings` (my listings); `userMarketplaceUrl()` / `userOurListingsUrl()` — see `entity-tabs.mdc`
- **Entity tabs (admin hub):** `EntityTabsComponent` with `accentMode="neutral"` at `/admin/home`; `adminHomeUrl()`; row click → `admin*DetailUrl()` — see `entity-tabs.mdc`, `detail-page.mdc`
- **Portal page title:** `PageTitleComponent` (`shared/ui/page-title/`, `app-page-title`) — flex row: bare decorative icon (20px) vertically centered beside `.page-title__text` (title + subtitle, `gap: 0.25rem`); optional `[entityTab]` tints icon on user entity create/edit/detail pages; subtitle `max-width: 42rem`; standalone pages get `border-bottom` header divider; hubs use `.page-hub-header` instead. `PageHeaderComponent` draws divider for title + create CTA rows. See `page-title.mdc`, `entity-service-colors.mdc`.
- **Form section header:** `FormSectionComponent` — same flex icon + text pattern as page title inside form cards; bare icons — see `forms.mdc`.
- **Form page back link:** `PageBackLinkComponent` — user create/edit → `userOurListingsUrl(matchingEntity)` + `portal.user.nav.ourListings` (`OUR_LISTINGS_BACK_LABEL_KEY`)
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
| `layout.mdc` | `shared/shell/**`, `shared/ui/**` — app topbar, account menu, hub header |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` — key namespaces |
| `forms.mdc` | `shared/form/**`, `*.form.ts` |
| `tables.mdc` | `shared/table/**`, `*.table.ts`, `*-table-page.component.*` — table defs + list pages (incl. create CTA) |
| `table-filters.mdc` | `shared/table/**`, `*-table-filters.ts` — advanced filter defs, panel/chips UX, persistence |
| `detail-page.mdc` | `shared/detail/**`, `shared/ui/detail-*`, `shared/ui/entity-detail-summary/**`, user `*/detail/*`, `entity-detail-navigation.ts` — detail pages, summary band, row click navigation |
| `confirm.mdc` | `shared/confirm/**`, destructive-action flows |
| `portal-feature.mdc` | `portal/**/features/**` — CRUD layout (vehicles reference) |
| `new-page.mdc` | `portal/**/features/**`, route files, nav configs, guest pages |
| `page-title.mdc` | Portal page templates + `shared/ui/page-title/` + `shared/ui/page-back-link/` — title, back link, icon, table create CTA |
| `shared-constants.mdc` | `bih-cities.ts`, `boolean-filter-options.ts`, `user-entity-status.ts`, `entity-context-class.ts`, `admin-page-icons.ts`, `user-page-icons.ts` |
| `entity-status.mdc` | Entity `status` field, `StatusBadgeComponent`, per-entity status conventions |
| `entity-service-colors.mdc` | User portal transport/freight/warehouse accent system — `_entity-service-accent.scss`, `entityTab` on shared widgets, hub tables |
| `entity-tabs.mdc` | User marketplace / my listings hub pages, `EntityTabsComponent`, tab URL builders |
| `shared-utils.mdc` | `date-input.ts`, `format-display-date.ts`, `normalize-for-search.ts`, `hub-tab-sync.ts` |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss` (`below-md`), `portal/shell/viewport.ts`; desktop card grid uses **3 columns** from `1100px` (`_table-chrome-split-card.scss`)
- **Tables (mobile):** card list inside `DataTableComponent` — not horizontal table scroll
- **Tables (desktop):** default HTML table; optional card grid via toolbar view toggle (persisted per table)
