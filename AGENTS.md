# Agent context — bhcom-ba

Angular 21 logistics admin. Before implementing UI, check `.cursor/rules/` (especially `forms.mdc` / `tables.mdc` / `layout.mdc` when touching those areas).

## Quick entry points

- **Layout / shell:** `src/app/layout/` + `src/app/core/layout/sidebar.service.ts`
- **Form example:** `src/app/features/fleet/vehicles/`
- **Table example:** `src/app/features/shipments/` (desktop table + mobile cards via `DataTableComponent`)
- **Complex stepper form:** `src/app/features/shipments/create-shipment/`

## Cursor rules

| Rule | When it applies |
|------|-----------------|
| `00-project.mdc` | Always — stack, paths, commands, layout overview |
| `angular.mdc` | `src/**/*.{ts,html,scss}` — components, responsive breakpoint |
| `layout.mdc` | `layout/**`, `core/layout/**` — shell, sidebar, topbar, mobile drawer |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` |
| `forms.mdc` | `core/form/**`, `*.form.ts` |
| `tables.mdc` | `core/table/**`, `*.table.ts` — includes mobile card rows |
| `new-page.mdc` | `features/**`, routes, sidebar nav |

## Responsive conventions

- **Breakpoint:** 768px — `src/styles/_breakpoints.scss`, `src/app/core/layout/viewport.ts`
- **SCSS:** `@use 'styles/breakpoints' as *;` then `@include below-md { ... }` (`angular.json` → `stylePreprocessorOptions.includePaths: ["src"]`)
- **Tables (mobile):** card list inside `DataTableComponent` (`isMobileLayout` + column `mobile.primary` / `mobile.hidden`) — not horizontal table scroll
- **Forms / shell:** responsive rules live in core components; feature SCSS only for unique layouts (e.g. create-shipment review step)
