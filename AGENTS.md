# Agent context — bhcom-ba

Angular 21 logistics admin. Before implementing UI, check `.cursor/rules/` (especially `forms.mdc` / `tables.mdc` when touching those areas).

## Quick entry points

- Form example: `src/app/features/fleet/vehicles/`
- Table example: `src/app/features/shipments/`
- Complex stepper form: `src/app/features/shipments/create-shipment/`

## Cursor rules

| Rule | When it applies |
|------|-----------------|
| `00-project.mdc` | Always — stack, paths, commands |
| `angular.mdc` | `src/**/*.{ts,html,scss}` |
| `i18n.mdc` | TS/HTML + `public/assets/*.json` |
| `forms.mdc` | `core/form/**`, `*.form.ts` |
| `tables.mdc` | `core/table/**`, `*.table.ts` |
| `new-page.mdc` | `features/**`, routes, sidebar nav |
