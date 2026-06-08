import { InjectionToken } from '@angular/core';
import type { PortalKind } from '../../../shared/constants/portal-kind.type';
import type { NavSection } from './nav.model';

export interface PortalConfig {
  portalKind: PortalKind;
  nav: NavSection[];
  shell: {
    brandSuffixKey: string;
    homeUrl: string;
  };
}

export const PORTAL_CONFIG = new InjectionToken<PortalConfig>('PORTAL_CONFIG');
