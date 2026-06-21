# Agent context — bhcom-ba

Angular 21 logistics SPA with **admin** and **user** portals. Before implementing UI, check `.cursor/rules/` (especially `portal-feature.mdc` for CRUD features, plus `forms.mdc` / `tables.mdc` / `table-filters.mdc` / `confirm.mdc` / `layout.mdc` / `guest.mdc` / `shared-constants.mdc` / `shared-utils.mdc` when touching those areas).

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
- **Portal shell:** `src/app/portal/shell/` (`PortalShellComponent`, `SidebarService`, `PortalSidebarComponent`, `SidebarSectionFlyoutComponent`); shared nav panel: `portal/shell/portal-sidebar/_sidebar-nav-panel.scss`
- **Sidebar nav:** `portal/common/models/nav.model.ts` (`NavSection.route` user flat links, `NavSection.items` admin groups); `user-nav.config.ts` (Home, Find, Our listings, Offer); `nav-link-active-options.ts` for hub `?tab=` active state; hub pages use `EntityTabsComponent` — see `entity-tabs.mdc`, `layout.mdc`
- **User home (journey hub):** `portal/user/features/home/` — scenario cards, company snapshot; hub links via `userFindRoute()` / `userOurListingsRoute()` on `[routerLink]`; `navigateByUrl(userFindUrl())` in TS
- **User find hub:** `portal/user/features/find/` — `.page-hub-header` (`styles/_page-hub-header.scss`) wraps `PageTitleComponent` + `EntityTabsComponent` + embedded marketplace tables (`/find?tab=`)
- **User our listings hub:** `portal/user/features/our-listings/` — `.page-hub-header` wraps `PageHeaderComponent` (tab-specific create CTA) + `EntityTabsComponent` + embedded our tables (`/our-listings?tab=`)
- **User offer picker:** `portal/user/features/offer/` — entity picker → create forms; page title `portal.user.pages.offer.title` (Offer service / Ponudite uslugu); entry via `USER_OFFER_URL`
- **User CRUD (reference):** `portal/user/features/transport/` — `data/`, `form/`, `table-all/`, `table-our/`; All vs Our list split; `listAll()` / `listOurs()` on service; list pages embedded in hub routes only
- **Stepper (create + edit):** `portal/admin/features/vehicles/form/` — `stepperMode`, `stepperDataReady`, `isEdit` pattern (see `forms.mdc`)
- **Stepper (create-only):** `guest/pages/register/`
- **Stepper UI/logic:** `shared/form/form-stepper/`, `shared/form/form-page/`, `form.utils.ts` — `ValidationState` (`notStarted` | `inProgress` | `valid` | `invalid`), free navigation, validate on leave/submit only, mobile current-title + chip rail at ≤768px
- **Guest login:** `guest/pages/login/user-login-page.*`, `admin-login-page.*`
- **Guest register:** `guest/pages/register/register-company-page.*` (+ `register-company.service.ts` stub)
- **App URLs:** `shared/constants/app-urls.ts` (barrel), `guest-urls.ts`, `user-urls.ts`, `admin-urls.ts`, `portal-kind.type.ts`
- **BiH cities:** `shared/constants/bih-cities.ts` — `BIH_CITY_OPTIONS` for autocomplete origin/destination fields
- **User entity status (interim):** `shared/constants/user-entity-status.ts` — `UserEntityStatus`; all entities will get their own status unions later — see `entity-status.mdc`
- **Portal page icons:** `portal/admin/admin-page-icons.ts`, `portal/user/user-page-icons.ts` — sidebar link icons, page titles (`UserPageIcons.home` = `LucideHome`)
- **Date form utils:** `shared/utils/date-input.ts` — `notPastDateValidator`, `endDateOnOrAfterStartValidator`, `minDate`/`maxDate` on field defs
- **Display date formatting:** `shared/utils/format-display-date.ts` — `formatDisplayDate()` for tables, date-range display, detail modal
- **Shared UI frameworks:** `shared/form/`, `shared/table/`, `shared/confirm/` (`ConfirmService`, `ConfirmDialogComponent` in `app.html`)
- **Table filters (user portal):** `shared/table/` filter bar, chips, collapsible panel, multi-select/date/number-range controls; per-page defs in `portal/user/features/*/data/*-table-filters.ts`; see `table-filters.mdc`. References: `transport-table-filters.ts`, `freight-table-filters.ts`, `warehouse-table-filters.ts`
- **Route display UI:** `shared/ui/route-display/` — `RouteDisplayComponent` (`app-route-display`) for origin → destination with neutral chips in tables
- **Date range display UI:** `shared/ui/date-range-display/` — `DateRangeDisplayComponent` (`app-date-range-display`) for merged period / single-date columns
- **Vehicle display UI:** `shared/ui/vehicle-display/` — `VehicleDisplayComponent` (`app-vehicle-display`) for vehicle name + plate in tables
- **Warehouse display UI:** `shared/ui/warehouse-display/` — `WarehouseDisplayComponent` (`app-warehouse-display`) for warehouse name + city in storage tables
- **Status badge UI:** `shared/ui/status-badge/` — `StatusBadgeComponent` (`app-status-badge`); **only colored semantic pill in a table row** — do not reuse status colors on route/date/warehouse cells. Theme tokens `--status-*` in `styles.scss`. User transport/freight/warehouse today; **all listable entities will have `status`**
- **Table cell display (user transport/freight/warehouse):** reuse shared widgets per `tables.mdc` — `RouteDisplayComponent` (neutral chips), `DateRangeDisplayComponent` (merged period column, `width: '18rem'`), `VehicleDisplayComponent`, `WarehouseDisplayComponent` (name + city). Denormalize `vehicleName`/`vehiclePlate` and `warehouseName`/`warehouseCity` on create/update via portal `company-*.service.ts` `getDisplay()`.
- **Delete confirmation example:** `portal/admin/features/vehicles/table/vehicle-table-page.component.ts`
- **Shared UI widgets:** `shared/ui/` (brand-mark, language-picker, theme-picker, metric-card, quick-action-card, intent-card, page-title, page-back-link, page-header, primary-action-link, route-display, date-range-display, vehicle-display, warehouse-display, status-badge)
- **Dashboard KPI card:** `shared/ui/metric-card/` — `MetricCardComponent` (`app-metric-card`); inputs: `titleKey`, `value`, `subtitleKey`, `icon`, `variant`; wrap in `routerLink` on dashboard pages for clickable tiles; prefer `variant="default"` for neutral icon tint
- **Dashboard action tile:** `shared/ui/quick-action-card/` — `QuickActionCardComponent` (`app-quick-action-card`); inputs: `titleKey`, `descriptionKey`, `route`, `icon`; monochrome Lucide icon (no colored badge); `routerLink` card for portal quick actions
- **User intent card:** `shared/ui/intent-card/` — `IntentCardComponent` (`app-intent-card`); static panel, icon + title header, text-link actions with `→` and optional `queryParams`; optional `clickableCard` for Offer (whole-card link, hover border)
- **Entity tabs (user hubs):** `shared/ui/entity-tabs/` — `EntityTabsComponent` (`app-entity-tabs`); config `portal/user/user-entity-tabs.config.ts`; Find/Our listings wrap title + tabs in `.page-hub-header` (`styles/_page-hub-header.scss`); programmatic nav: `userFindUrl()` / `userOurListingsUrl()`; template links: `userFindRoute()` / `userOurListingsRoute()` — see `entity-tabs.mdc`, `page-title.mdc`
- **Portal page title:** `PageTitleComponent` (`shared/ui/page-title/`, `app-page-title`) — required `titleKey` + `subtitleKey` + `pageIcon` on the page component; entity icon (20px) in rounded `--bg-surface` container; subtitle `max-width: 42rem`. `PageHeaderComponent` vertically centers create CTA with title block. See `page-title.mdc`.
- **Form page back link:** `PageBackLinkComponent` (`shared/ui/page-back-link/`, `app-page-back-link`) — required on portal create/edit form pages above `PageTitleComponent`; inputs: `route` (list URL from `app-urls.ts`), `labelKey` (reuse `portal.*.nav.all*` or `portal.user.nav.our*`), `form` (dirty → `ConfirmService` + `shared.form.common.discardChanges.*`). Admin → entity list; user → `userOurListingsUrl(matchingEntity)`. See `page-title.mdc`.
- **Table page create CTA:** when a list page has a create route, compose `app-page-header` with `app-page-title` + `app-primary-action-link` — page owns `createUrl` / `createLabelKey`; not inside `PageTitleComponent` or `DataTableComponent`. See `page-title.mdc`, `portal-feature.mdc`.

## Cursor rules

| Rule | When it applies |
|------|-----------------|
| `00-project.mdc` | Always — stack, paths, commands, portals |
| `app-urls.mdc` | Always — route URLs via `shared/constants/app-urls.ts` only |
| `angular.mdc` | `src/**/*.{ts,html,scss}` |
| `guest.mdc` | `src/app/guest/**` |
| `layout.mdc` | `guest/shell/**`, `portal/shell/**`, `shared/ui/**` — sidebar sections, flyout, nav icon rules |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` — key namespaces |
| `forms.mdc` | `shared/form/**`, `*.form.ts` |
| `tables.mdc` | `shared/table/**`, `*.table.ts`, `*-table-page.component.*` — table defs + list pages (incl. create CTA) |
| `table-filters.mdc` | `shared/table/**`, `*-table-filters.ts` — advanced filter defs, panel/chips UX, persistence |
| `confirm.mdc` | `shared/confirm/**`, destructive-action flows |
| `portal-feature.mdc` | `portal/**/features/**` — CRUD layout (vehicles reference) |
| `new-page.mdc` | `portal/**/features/**`, route files, nav configs, guest pages |
| `page-title.mdc` | Portal page templates + `shared/ui/page-title/` + `shared/ui/page-back-link/` — title, back link, icon, table create CTA |
| `shared-constants.mdc` | `bih-cities.ts`, `user-entity-status.ts`, `admin-page-icons.ts`, `user-page-icons.ts` |
| `entity-status.mdc` | Entity `status` field, `StatusBadgeComponent`, per-entity status conventions |
| `entity-tabs.mdc` | User Find / Our listings hub pages, `EntityTabsComponent`, tab URL builders |
| `shared-utils.mdc` | `date-input.ts`, `format-display-date.ts`, `normalize-for-search.ts` |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss` (`below-md`), `portal/shell/viewport.ts`; filter grid also uses `below-lg` (1100px) for 2-column layout
- **Tables (mobile):** card list inside `DataTableComponent` — not horizontal table scroll
