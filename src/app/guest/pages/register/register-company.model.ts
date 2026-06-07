export type PersonTitle = 'mr' | 'ms';

export interface RegisterCompanyPayload {
  title: PersonTitle;
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

export interface RegisterCompanyFormModel extends RegisterCompanyPayload {
  passwordConfirm: string;
}
