import type { AdminTitle, RegisterAdminPayload } from '../../../shared/core/auth/auth.model';

export type { AdminTitle, RegisterAdminPayload };

export interface RegisterAdminFormModel extends RegisterAdminPayload {
  passwordConfirm: string;
}
