export interface EmployeeFormModel {
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

export interface Employee extends EmployeeFormModel {
  id: string;
}
