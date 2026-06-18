import type { NavSection } from '../models/nav.model';

export function isNavSectionActive(section: NavSection, url: string): boolean {
  return section.items.some((item) =>
    item.exact ? url === item.route : url.startsWith(item.route),
  );
}
