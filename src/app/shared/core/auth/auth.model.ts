import type { Portal } from './portal.type';

export type AdminTitle = 'mr' | 'ms';

export interface RegisterAdminPayload {
  title: AdminTitle;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  vatId: string;
  country: string;
  city: string;
  postcode: string;
  address: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

export interface Session {
  accessToken: string;
  portal: Portal;
  user: AuthUser;
}
