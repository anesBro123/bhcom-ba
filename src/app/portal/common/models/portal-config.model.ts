import { InjectionToken } from '@angular/core';
import type { Portal } from '../../../shared/core/auth/portal.type';
import type { NavSection } from './nav.model';

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
