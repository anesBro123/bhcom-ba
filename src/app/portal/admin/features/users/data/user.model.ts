export interface UserFormModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  jmbg: string;
  canCreateRoute: boolean;
  canAcceptRoute: boolean;
}

export interface User extends UserFormModel {
  id: string;
}
