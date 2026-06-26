import { InjectionToken } from '@angular/core';
import type { PortalKind } from '../../../shared/constants/portal-kind.type';

export interface TopbarNavItem {
  labelKey: string;
  route: string;
  exact?: boolean;
}

export interface PortalConfig {
  portalKind: PortalKind;
  topbarNav: TopbarNavItem[];
  shell: {
    brandSuffixKey: string;
    homeUrl: string;
  };
}

export const PORTAL_CONFIG = new InjectionToken<PortalConfig>('PORTAL_CONFIG');
