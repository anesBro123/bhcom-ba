export interface UserFormModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  jmbg: string;
  canCreateShipment: boolean;
  canAcceptShipment: boolean;
  canCreateRoute: boolean;
  canAcceptRoute: boolean;
}

export interface User extends UserFormModel {
  id: string;
}
