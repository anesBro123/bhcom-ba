import { LucideIcon } from '@lucide/angular';

export interface NavItem {
  labelKey: string;
  route: string;
  icon: LucideIcon;
  exact?: boolean;
}

export interface NavSection {
  titleKey: string;
  items: NavItem[];
}
