# Agent context — bhcom-ba

Angular 21 logistics SPA with **admin** and **user** portals. Before implementing UI, check `.cursor/rules/` (especially `portal-feature.mdc` for CRUD features, plus `forms.mdc` / `tables.mdc` / `confirm.mdc` / `layout.mdc` / `guest.mdc` when touching those areas).

## App structure (`src/app/`)

```
src/app/
├── shared/          # auth, i18n, theme, constants/, form/, table/, confirm/, ui/
├── guest/           # public routes, shell, guards, login/register pages
└── portal/          # authenticated shell, configs, features, guards
    ├── common/      # models, PORTAL_CONFIG barrel (nav + portal-config)
    ├── shell/       # PortalShell, sidebar, topbar, SidebarService
    ├── pages/       # PagePlaceholderComponent
    ├── guards/      # portalMatchGuard
    ├── user/    # routes, nav, config, features/
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
| User | `/` (e.g. `/dashboard`) | `portal/user/user.routes.ts` | `portal/user/user-nav.config.ts` | `portal/user/features/**` (fleet, shipments) |
| Admin | `/admin` (e.g. `/admin/dashboard`) | `portal/admin/admin.routes.ts` | `portal/admin/admin-nav.config.ts` | `portal/admin/features/**` (dashboard, users, vehicles, warehouses) |

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
- **Portal shell:** `src/app/portal/shell/` (`PortalShellComponent`, `SidebarService`)
- **Placeholder page:** `src/app/portal/pages/page-placeholder/`
- **Single-step form:** `portal/user/features/fleet/vehicles/`
- **Table (mock loader):** `portal/user/features/shipments/`
- **Stepper (strict):** `portal/user/features/shipments/create-shipment/`, `guest/pages/register/`
- **Stepper (create + edit):** `portal/admin/features/vehicles/form/` — `stepperMode`, `stepperDataReady`, `isEdit` pattern (see `forms.mdc`)
- **Stepper UI/logic:** `shared/form/form-stepper/`, `shared/form/form-page/`, `form.utils.ts` — `ValidationState` (`notStarted` | `inProgress` | `valid` | `invalid`), free navigation, validate on leave/submit only, mobile current-title + chip rail at ≤768px
- **Guest login:** `guest/pages/login/user-login-page.*`, `admin-login-page.*`
- **Guest register:** `guest/pages/register/register-company-page.*` (+ `register-company.service.ts` stub)
- **App URLs:** `shared/constants/app-urls.ts` (barrel), `guest-urls.ts`, `user-urls.ts`, `admin-urls.ts`, `portal-kind.type.ts`
- **Shared UI frameworks:** `shared/form/`, `shared/table/`, `shared/confirm/` (`ConfirmService`, `ConfirmDialogComponent` in `app.html`)
- **Delete confirmation example:** `portal/admin/features/vehicles/table/vehicle-table-page.component.ts`
- **Shared UI widgets:** `shared/ui/` (brand-mark, language-picker, theme-picker, metric-card, quick-action-card, page-title, page-header, primary-action-link)
- **Dashboard KPI card:** `shared/ui/metric-card/` — `MetricCardComponent` (`app-metric-card`); inputs: `titleKey`, `value`, `subtitleKey`, `icon`, `variant`; wrap in `routerLink` on dashboard pages for clickable tiles; prefer `variant="default"` for neutral icon tint
- **Dashboard action tile:** `shared/ui/quick-action-card/` — `QuickActionCardComponent` (`app-quick-action-card`); inputs: `titleKey`, `descriptionKey`, `route`, `icon`; monochrome Lucide icon (no colored badge); `routerLink` card for portal quick actions
- **Portal page title:** `PageTitleComponent` (`shared/ui/page-title/`, `app-page-title`) — required `titleKey` input; place at top of every portal page template above table/form/dashboard content; import by direct path into page `imports`; see `page-title.mdc`. Not for guest pages. `DataTableComponent` / `FormPageComponent` do not render page titles.
- **Table page create CTA:** when a list page has a create route, compose `app-page-header` with `app-page-title` + `app-primary-action-link` — page owns `createUrl` / `createLabelKey`; not inside `PageTitleComponent` or `DataTableComponent`. See `page-title.mdc`, `portal-feature.mdc`.

## Cursor rules

| Rule | When it applies |
|------|-----------------|
| `00-project.mdc` | Always — stack, paths, commands, portals |
| `app-urls.mdc` | Always — route URLs via `shared/constants/app-urls.ts` only |
| `angular.mdc` | `src/**/*.{ts,html,scss}` |
| `guest.mdc` | `src/app/guest/**` |
| `layout.mdc` | `guest/shell/**`, `portal/shell/**`, `shared/ui/**` |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` — key namespaces |
| `forms.mdc` | `shared/form/**`, `*.form.ts` |
| `tables.mdc` | `shared/table/**`, `*.table.ts`, `*-table-page.component.*` — table defs + list pages (incl. create CTA) |
| `confirm.mdc` | `shared/confirm/**`, destructive-action flows |
| `portal-feature.mdc` | `portal/**/features/**` — CRUD layout (vehicles reference) |
| `new-page.mdc` | `portal/**/features/**`, route files, nav configs, guest pages |
| `page-title.mdc` | Portal page templates + `shared/ui/page-title/` — title + table create CTA pattern |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss`, `portal/shell/viewport.ts`
- **Tables (mobile):** card list inside `DataTableComponent` — not horizontal table scroll
