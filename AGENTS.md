# Agent context — bhcom-ba

Angular 21 logistics SPA with **admin** and **employee** portals. Before implementing UI, check `.cursor/rules/` (especially `forms.mdc` / `tables.mdc` / `layout.mdc` / `guest.mdc` when touching those areas).

## App structure (`src/app/`)

```
src/app/
├── shared/          # auth, i18n, theme, form/, table/, ui/
├── guest/           # public routes, shell, guards, login/register pages
└── portal/          # authenticated shell, configs, features, guards
    ├── common/      # models, URL constants, barrel index
    ├── shell/       # PortalShell, sidebar, topbar, SidebarService
    ├── pages/       # PagePlaceholderComponent
    ├── guards/      # portalMatchGuard
    ├── employee/    # routes, nav, config, features/
    └── admin/       # routes, nav, config (no features/ yet)
```

Legacy folders (`core/`, `features/`, `layout/`) were removed — do not recreate them.

## Layer rule

| Folder | Meaning |
|--------|---------|
| `shared/` | Used by **both** guest and portal (auth, i18n, theme, form/table frameworks, shared UI) |
| `guest/` | Public / unauthenticated routes, shell, guards |
| `portal/` | Authenticated employee + admin (shell, configs, features) |

Guest may import from `portal/common/` and portal configs for login URLs — that is intentional. Do **not** import portal features or shell from guest.

## Testing

- **Do not add unit tests** — no `*.spec.ts`, Vitest suites, or test scaffolding unless the user explicitly asks for tests.
- Do not extend existing unit tests unless explicitly requested.
- Verify changes with `npm run build` and manual checks in the browser (`npm start`).

## Portals

| Portal | URL prefix | Routes file | Nav config | Features |
|--------|------------|-------------|------------|----------|
| Employee | `/` (e.g. `/dashboard`) | `portal/employee/employee.routes.ts` | `portal/employee/employee-nav.config.ts` | `portal/employee/features/**` (fleet, shipments) |
| Admin | `/admin` (e.g. `/admin/dashboard`) | `portal/admin/admin.routes.ts` | `portal/admin/admin-nav.config.ts` | placeholders only — no `features/` yet |

### Routing

- Root routes: `src/app/app.routes.ts` — guest routes + lazy portal trees with `portalMatchGuard`.
- Guest routes: `src/app/guest/guest.routes.ts` — landing, sign-in, login, register.
- URL constants: `portal/common/constants/portal-urls.ts` (`EMPLOYEE_HOME_URL`, `ADMIN_LOGIN_URL`, etc.).

| Guest path | Purpose |
|------------|---------|
| `/` | Landing |
| `/sign-in` | Portal picker |
| `/login` | Employee login |
| `/admin/login` | Admin login |
| `/admin/register` | Admin company registration |

### Guards

| Guard | File | Role |
|-------|------|------|
| `publicGuestGuard` | `guest/guards/public.guest.guard.ts` | Landing/sign-in — redirect authenticated users to portal home |
| `guestGuard` | `guest/guards/guest.guard.ts` | Login/register — block same-portal re-login, cross-portal redirect |
| `portalMatchGuard` | `portal/guards/portal-match.guard.ts` | Lazy portal trees — require auth + matching portal |

- Auth: `shared/core/auth/` — single session + `portal`; stub login until API.
- Portal shell injects `PORTAL_CONFIG` only (not `AuthService` for nav).

**Do not** import `portal/admin/features/**` from employee routes or vice versa. Both may use `shared/**`.

## HTTP services

- Feature API: colocate `*.service.ts` with the feature under `portal/{employee|admin}/features/<domain>/`.
- Portal-wide (2+ features): `portal/{employee|admin}/data/`.
- App infra: `shared/core/`.

## Quick entry points

- **Guest shell:** `src/app/guest/shell/`
- **Portal shell:** `src/app/portal/shell/` (`PortalShellComponent`, `SidebarService`)
- **Placeholder page:** `src/app/portal/pages/page-placeholder/`
- **Form example:** `portal/employee/features/fleet/vehicles/`
- **Table example:** `portal/employee/features/shipments/`
- **Stepper form:** `portal/employee/features/shipments/create-shipment/`
- **Guest login:** `guest/pages/login/`
- **Shared UI frameworks:** `shared/form/`, `shared/table/`
- **Shared UI widgets:** `shared/ui/` (brand-mark, language-picker, theme-picker)

## Cursor rules

| Rule | When it applies |
|------|-----------------|
| `00-project.mdc` | Always — stack, paths, commands, portals |
| `angular.mdc` | `src/**/*.{ts,html,scss}` |
| `guest.mdc` | `src/app/guest/**` |
| `layout.mdc` | `guest/shell/**`, `portal/shell/**`, `shared/ui/**` |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` |
| `forms.mdc` | `shared/form/**`, `*.form.ts` |
| `tables.mdc` | `shared/table/**`, `*.table.ts` |
| `new-page.mdc` | `portal/**/features/**`, route files, nav configs, guest pages |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss`, `portal/shell/viewport.ts`
- **Tables (mobile):** card list inside `DataTableComponent` — not horizontal table scroll
