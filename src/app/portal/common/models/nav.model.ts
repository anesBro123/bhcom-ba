import { LucideIcon } from '@lucide/angular';

export interface NavItem {
  labelKey: string;
  route: string;
  exact?: boolean;
}

export interface NavSection {
  titleKey: string;
  icon?: LucideIcon;
  items: NavItem[];
}
