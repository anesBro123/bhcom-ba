import { LucideIcon } from '@lucide/angular';

export interface NavItem {
  labelKey: string;
  route: string;
  exact?: boolean;
  icon?: LucideIcon;
}

export interface NavSection {
  titleKey: string;
  icon?: LucideIcon;
  items: NavItem[];
}
