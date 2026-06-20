import type { NavSection } from '../models/nav.model';

function navPath(url: string): string {
  return url.split('?')[0]?.split('#')[0] ?? url;
}

function isRouteActive(route: string, exact: boolean | undefined, path: string): boolean {
  return exact ? path === route : path.startsWith(route);
}

export function isNavSectionActive(section: NavSection, url: string): boolean {
  const path = navPath(url);

  if (section.route) {
    return isRouteActive(section.route, section.exact, path);
  }

  return (section.items ?? []).some((item) => isRouteActive(item.route, item.exact, path));
}
