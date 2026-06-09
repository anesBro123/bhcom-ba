# Agent context — bhcom-ba

Angular 21 logistics SPA with **admin** and **employee** portals. Before implementing UI, check `.cursor/rules/` (especially `portal-feature.mdc` for CRUD features, plus `forms.mdc` / `tables.mdc` / `confirm.mdc` / `layout.mdc` / `guest.mdc` when touching those areas).

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
    ├── employee/    # routes, nav, config, features/
    └── admin/       # routes, nav, config, features/ (vehicles)
```

Legacy folders (`core/`, `features/`, `layout/`) were removed — do not recreate them.

## Layer rule

| Folder | Meaning |
|--------|---------|
| `shared/` | Used by **both** guest and portal (auth, i18n, theme, form/table/confirm frameworks, shared UI) |
| `guest/` | Public / unauthenticated routes, shell, guards |
| `portal/` | Authenticated employee + admin (shell, configs, features) |

Guest may import from `shared/**` only for URLs and auth. Do **not** import portal configs, features, or shell from guest.

## Testing

- **Do not add unit tests** — no `*.spec.ts`, Vitest suites, or test scaffolding unless the user explicitly asks for tests.
- Do not extend existing unit tests unless explicitly requested.
- Verify changes with `npm run build` and manual checks in the browser (`npm start`).

## Portals

| Portal | URL prefix | Routes file | Nav config | Features |
|--------|------------|-------------|------------|----------|
| Employee | `/` (e.g. `/dashboard`) | `portal/employee/employee.routes.ts` | `portal/employee/employee-nav.config.ts` | `portal/employee/features/**` (fleet, shipments) |
| Admin | `/admin` (e.g. `/admin/dashboard`) | `portal/admin/admin.routes.ts` | `portal/admin/admin-nav.config.ts` | `portal/admin/features/**` (vehicles) |

### Routing

- Root routes: `src/app/app.routes.ts` — guest routes + lazy portal trees with `portalMatchGuard`.
- Guest routes: `src/app/guest/guest.routes.ts` — two `GuestShellComponent` trees (root + `admin` prefix); landing, sign-in, login, register.
- URL constants: `shared/constants/app-urls.ts` — **never hardcode route paths**; add new URLs here first (see `.cursor/rules/app-urls.mdc`).

| Guest path | Purpose |
|------------|---------|
| `/` | Landing |
| `/sign-in` | Portal picker |
| `/login` | Employee login |
| `/admin/login` | Admin login |
| `/register` | Company registration |

### Guards

| Guard | File | Role |
|-------|------|------|
| `guestGuard` | `guest/guards/guest.guard.ts` | All guest routes — unauthenticated allow; authenticated → session portal home |
| `portalMatchGuard` | `portal/guards/portal-match.guard.ts` | Lazy portal trees — require auth + matching portal |

- Auth: `shared/core/auth/` — session types (`AuthUser`, `Session`); `PortalKind` in `shared/constants/portal-kind.type.ts`; stub login until API; company registration stub in `guest/pages/register/register-company.service.ts`.
- Portal shell injects `PORTAL_CONFIG` only (not `AuthService` for nav).

**Do not** import `portal/admin/features/**` from employee routes or vice versa. Both may use `shared/**`.

## HTTP services

- Feature API: colocate `*.service.ts` with the feature under `portal/{employee|admin}/features/<domain>/`.
- Portal-wide (2+ features): `portal/{employee|admin}/data/`.
- App infra: `shared/core/`.

## Quick entry points

- **Portal CRUD (canonical):** `portal/admin/features/vehicles/` — `data/`, `form/`, `table/`; list + create + edit; see `portal-feature.mdc`
- **Guest shell:** `src/app/guest/shell/`
- **Portal shell:** `src/app/portal/shell/` (`PortalShellComponent`, `SidebarService`)
- **Placeholder page:** `src/app/portal/pages/page-placeholder/`
- **Single-step form:** `portal/employee/features/fleet/vehicles/`
- **Table (mock loader):** `portal/employee/features/shipments/`
- **Stepper (strict):** `portal/employee/features/shipments/create-shipment/`, `guest/pages/register/`
- **Stepper (strict + free edit):** `portal/admin/features/vehicles/form/` — `stepperNavigation` input on `FormPageComponent`
- **Stepper UI/logic:** `shared/form/form-stepper/`, `shared/form/form-page/`, `form.utils.ts` (`StepperNavigationMode`, `canNavigateToStep`, visited + valid pill state)
- **Guest login:** `guest/pages/login/employee-login-page.*`, `admin-login-page.*`
- **Guest register:** `guest/pages/register/register-company-page.*` (+ `register-company.service.ts` stub)
- **App URLs:** `shared/constants/app-urls.ts`, `shared/constants/portal-kind.type.ts`
- **Shared UI frameworks:** `shared/form/`, `shared/table/`, `shared/confirm/` (`ConfirmService`, `ConfirmDialogComponent` in `app.html`)
- **Delete confirmation example:** `portal/admin/features/vehicles/table/vehicle-table-page.component.ts`
- **Shared UI widgets:** `shared/ui/` (brand-mark, language-picker, theme-picker)

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
| `tables.mdc` | `shared/table/**`, `*.table.ts` |
| `confirm.mdc` | `shared/confirm/**`, destructive-action flows |
| `portal-feature.mdc` | `portal/**/features/**` — CRUD layout (vehicles reference) |
| `new-page.mdc` | `portal/**/features/**`, route files, nav configs, guest pages |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss`, `portal/shell/viewport.ts`
- **Tables (mobile):** card list inside `DataTableComponent` — not horizontal table scroll
