
// Mock notifications data
export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  type: 'overdue' | 'new_member' | 'book_available' | 'book_returned' | 'system';
};

export const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'Book Overdue',
    message: 'Nima Lama has not returned "Design Patterns" yet.',
    time: '2 hours ago',
    date: '2025-04-08',
    read: false,
    type: 'overdue'
  },
  {
    id: '2',
    title: 'New Member',
    message: 'Poonam Limbu has registered as a new member.',
    time: '5 hours ago',
    date: '2025-04-08',
    read: false,
    type: 'new_member'
  },
  {
    id: '3',
    title: 'Book Available',
    message: '"Clean Code" is now available for borrowing.',
    time: 'Yesterday',
    date: '2025-04-07',
    read: true,
    type: 'book_available'
  },
  {
    id: '4',
    title: 'Book Returned',
    message: 'Bishal Nalbo has returned "Algorithms to Live By".',
    time: '2 days ago',
    date: '2025-04-06',
    read: true,
    type: 'book_returned'
  },
  {
    id: '5',
    title: 'System Update',
    message: 'The library system has been updated to version 0.2.',
    time: '3 days ago',
    date: '2025-04-05',
    read: true,
    type: 'system'
  },
  {
    id: '6',
    title: 'Book Overdue',
    message: 'Smriti Jabegu has not returned "Thinking, Fast and Slow" yet.',
    time: '4 days ago',
    date: '2025-04-04',
    read: true,
    type: 'overdue'
  },
  {
    id: '7',
    title: 'New Member',
    message: 'Ichchha Limbu has registered as a new member.',
    time: '5 days ago',
    date: '2025-04-03',
    read: true,
    type: 'new_member'
  },
  {
    id: '8',
    title: 'Book Available',
    message: '"The Pragmatic Programmer" is now available for borrowing.',
    time: '6 days ago',
    date: '2025-04-02',
    read: true,
    type: 'book_available'
  },
  {
    id: '9',
    title: 'Book Returned',
    message: 'Prensu Dongol has returned "Cracking the Coding Interview".',
    time: '1 week ago',
    date: '2025-04-01',
    read: true,
    type: 'book_returned'
  },
  {
    id: '10',
    title: 'System Update',
    message: 'New borrowing policy has been implemented.',
    time: '1 week ago',
    date: '2025-04-01',
    read: true,
    type: 'system'
  }
];
