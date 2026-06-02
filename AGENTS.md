# Agent context — bhcom-ba

Angular 21 logistics SPA with **admin** and **employee** portals. Before implementing UI, check `.cursor/rules/` (especially `forms.mdc` / `tables.mdc` / `layout.mdc` when touching those areas).

## Testing

- **Do not add unit tests** — no `*.spec.ts`, Vitest suites, or test scaffolding unless the user explicitly asks for tests.
- Do not extend existing unit tests unless explicitly requested.
- Verify changes with `npm run build` and manual checks in the browser (`npm start`).

## Portals

| Portal | URL prefix | Routes file | Nav config | Features |
|--------|------------|-------------|------------|----------|
| Employee | `/` (e.g. `/dashboard`) | `src/app/routes/employee.routes.ts` | `layout/sidebar/employee-nav.config.ts` | `features/employee/**` |
| Admin | `/admin` (e.g. `/admin/dashboard`) | `src/app/routes/admin.routes.ts` | `layout/sidebar/admin-nav.config.ts` | `features/admin/**` (placeholders OK) |

- Root routes: `src/app/app.routes.ts` — login routes + lazy `loadChildren` with `portalMatchGuard`.
- Login: `/login` (employee), `/admin/login` (admin) — shared `LoginPageComponent`, `PORTAL_CONFIG` on route.
- Guards: `portalMatchGuard`, `guestGuard` in `core/portal/` (no `auth.guard.ts`).
- Auth: `core/auth/` — single session + `portal`; stub login until API.
- Shell/sidebar use `PORTAL_CONFIG` only (not `AuthService`).

**Do not** import `features/admin/**` from employee routes or vice versa. Both may use `features/shared/**`.

## Quick entry points

- **Layout / shell:** `src/app/layout/` + `src/app/core/layout/sidebar.service.ts`
- **Form example:** `src/app/features/employee/fleet/vehicles/`
- **Table example:** `src/app/features/employee/shipments/`
- **Stepper form:** `src/app/features/employee/shipments/create-shipment/`
- **Shared UI frameworks:** `src/app/features/shared/form/`, `features/shared/table/`

## Cursor rules

| Rule | When it applies |
|------|-----------------|
| `00-project.mdc` | Always — stack, paths, commands, portals |
| `angular.mdc` | `src/**/*.{ts,html,scss}` |
| `layout.mdc` | `layout/**`, `core/layout/**` |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` |
| `forms.mdc` | `features/shared/form/**`, `*.form.ts` |
| `tables.mdc` | `features/shared/table/**`, `*.table.ts` |
| `new-page.mdc` | `features/**`, route files, nav configs |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss`, `src/app/core/layout/viewport.ts`
- **Tables (mobile):** card list inside `DataTableComponent` — not horizontal table scroll
