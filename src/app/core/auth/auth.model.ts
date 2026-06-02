import { Portal } from '../portal/portal.model';

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
