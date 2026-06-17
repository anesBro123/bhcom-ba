import type { User } from './user.model';

export const USER_MOCK_DATA: User[] = [
  {
    id: 'usr-001',
    firstName: 'Amir',
    lastName: 'Hadžić',
    email: 'amir.hadzic@example.com',
    phone: '+387 61 123 456',
    dateOfBirth: '1990-03-15',
    jmbg: '1503901123456',
    canCreateRoute: false,
    canAcceptRoute: false,
  },
  {
    id: 'usr-002',
    firstName: 'Lejla',
    lastName: 'Kovačević',
    email: 'lejla.kovacevic@example.com',
    phone: '+387 62 234 567',
    dateOfBirth: '1985-07-22',
    jmbg: '2207852123456',
    canCreateRoute: true,
    canAcceptRoute: true,
  },
  {
    id: 'usr-003',
    firstName: 'Marko',
    lastName: 'Petrović',
    email: 'marko.petrovic@example.com',
    phone: '+387 63 345 678',
    dateOfBirth: '1992-11-08',
    jmbg: '0811922123456',
    canCreateRoute: false,
    canAcceptRoute: false,
  },
];
