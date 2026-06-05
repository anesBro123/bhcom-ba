import { InjectionToken } from '@angular/core';
import { NavSection } from '../../layout/sidebar/nav.model';

export type Portal = 'admin' | 'employee';

export interface PortalConfig {
  portal: Portal;
  homeUrl: string;
  loginUrl: string;
  registerUrl?: string;
  nav: NavSection[];
  login: {
    titleKey: string;
    subtitleKey?: string;
    badgeKey: string;
  };
  shell: {
    brandSuffixKey: string;
  };
}

export const PORTAL_CONFIG = new InjectionToken<PortalConfig>('PORTAL_CONFIG');
