import type { Author } from '../types/discussion';

export const mockUsers: Record<string, Author> = {
  currentUser: {
    id: 'user-current',
    name: 'Login user',
  },
  user01: {
    id: 'user01',
    name: 'User 01',
  },
  user02: {
    id: 'user02',
    name: 'User 02',
  },
  user03: {
    id: 'user03',
    name: 'User 03',
  },
  user04: {
    id: 'user04',
    name: 'User 04',
  },
};

export const currentUser = mockUsers.currentUser;
