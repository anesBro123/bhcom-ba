import type { PortalKind } from '../../constants/portal-kind.type';

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  companyId: string;
}

export interface Session {
  accessToken: string;
  portalKind: PortalKind;
  user: AuthUser;
}
