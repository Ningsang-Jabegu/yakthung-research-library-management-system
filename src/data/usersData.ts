
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Author' | 'User';
  joinDate: string;
  status: 'active' | 'inactive';
};

export const usersData: User[] = [
  {
    id: '1',
    name: 'Ningsang Jabegu',
    email: 'ningsang@yakthungresearch.com',
    role: 'Administrator',
    joinDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Nima Lama',
    email: 'nima.lama@yakthungresearch.com',
    role: 'Author',
    joinDate: '2024-02-01',
    status: 'active'
  },
  {
    id: '3',
    name: 'Poonam Limbu',
    email: 'poonam.limbu@yakthungresearch.com',
    role: 'User',
    joinDate: '2024-02-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Bishal Nalbo',
    email: 'bishal.nalbo@yakthungresearch.com',
    role: 'Author',
    joinDate: '2024-02-15',
    status: 'active'
  },
  {
    id: '5',
    name: 'Smriti Jabegu',
    email: 'smriti.jabegu@yakthungresearch.com',
    role: 'User',
    joinDate: '2024-03-01',
    status: 'active'
  },
  {
    id: '6',
    name: 'Ichchha Limbu',
    email: 'ichchha.limbu@yakthungresearch.com',
    role: 'User',
    joinDate: '2024-03-10',
    status: 'inactive'
  },
  {
    id: '7',
    name: 'Prensu Dongol',
    email: 'prensu.dongol@yakthungresearch.com',
    role: 'Author',
    joinDate: '2024-03-15',
    status: 'active'
  }
];
