
export const recentActivities = [
  {
    id: 1,
    type: 'borrow',
    title: 'Book Borrowed',
    description: 'Nima Lama borrowed "Design Patterns"',
    timestamp: '2 hours ago',
    icon: 'arrow-right'
  },
  {
    id: 2,
    type: 'return',
    title: 'Book Returned',
    description: 'Poonam Limbu returned "Clean Code"',
    timestamp: '5 hours ago',
    icon: 'arrow-left'
  },
  {
    id: 3,
    type: 'book',
    title: 'New Book Added',
    description: '"Software Engineering" was added to the library',
    timestamp: '1 day ago',
    icon: 'book'
  },
  {
    id: 4,
    type: 'member',
    title: 'New Member Registered',
    description: 'Bishal Nalbo joined the library',
    timestamp: '2 days ago',
    icon: 'user'
  },
  {
    id: 5,
    type: 'borrow',
    title: 'Book Borrowed',
    description: 'Smriti Jabegu borrowed "To Kill a Mockingbird"',
    timestamp: '3 days ago',
    icon: 'arrow-right'
  }
];

export const popularBooks = [
  {
    id: 1,
    title: 'Design Patterns',
    author: 'Erich Gamma, Richard Helm',
    category: 'Computer Science',
    borrowCount: 32
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    borrowCount: 28
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Literature',
    borrowCount: 24
  },
  {
    id: 4,
    title: 'Software Engineering',
    author: 'Ian Sommerville',
    category: 'Computer Science',
    borrowCount: 20
  }
];

export const categories = [
  { name: 'Computer Science', count: 243 },
  { name: 'Literature', count: 198 },
  { name: 'Science', count: 165 },
  { name: 'History', count: 120 },
  { name: 'Philosophy', count: 95 }
];

export const members = [
  { id: 1, name: 'Nima Lama', email: 'nima@example.com', status: 'active', booksCheckedOut: 2 },
  { id: 2, name: 'Poonam Limbu', email: 'poonam@example.com', status: 'active', booksCheckedOut: 1 },
  { id: 3, name: 'Bishal Nalbo', email: 'bishal@example.com', status: 'active', booksCheckedOut: 3 },
  { id: 4, name: 'Smriti Jabegu', email: 'smriti@example.com', status: 'active', booksCheckedOut: 0 },
  { id: 5, name: 'Ichchha Limbu', email: 'ichchha@example.com', status: 'inactive', booksCheckedOut: 0 },
  { id: 6, name: 'Prensu Dongol', email: 'prensu@example.com', status: 'active', booksCheckedOut: 1 }
];

export const books = [
  { 
    id: 1, 
    title: 'Design Patterns', 
    author: 'Erich Gamma, Richard Helm',
    category: 'Computer Science',
    isbn: '978-0201633610',
    status: 'checked-out',
    borrower: 'Nima Lama',
    dueDate: '2025-04-15'
  },
  { 
    id: 2, 
    title: 'Clean Code', 
    author: 'Robert C. Martin',
    category: 'Computer Science',
    isbn: '978-0132350884',
    status: 'available',
    borrower: null,
    dueDate: null
  },
  { 
    id: 3, 
    title: 'To Kill a Mockingbird', 
    author: 'Harper Lee',
    category: 'Literature',
    isbn: '978-0061120084',
    status: 'checked-out',
    borrower: 'Smriti Jabegu',
    dueDate: '2025-04-20'
  },
  { 
    id: 4, 
    title: 'Software Engineering', 
    author: 'Ian Sommerville',
    category: 'Computer Science',
    isbn: '978-0133943030',
    status: 'available',
    borrower: null,
    dueDate: null
  }
];

export const transactions = [
  { 
    id: 1, 
    type: 'borrow',
    book: 'Design Patterns',
    member: 'Nima Lama',
    date: '2025-04-01',
    dueDate: '2025-04-15',
    returnDate: null,
    status: 'ongoing'
  },
  { 
    id: 2, 
    type: 'return',
    book: 'Clean Code',
    member: 'Poonam Limbu',
    date: '2025-04-01',
    dueDate: '2025-04-15',
    returnDate: '2025-04-08',
    status: 'completed'
  },
  { 
    id: 3, 
    type: 'borrow',
    book: 'To Kill a Mockingbird',
    member: 'Smriti Jabegu',
    date: '2025-04-06',
    dueDate: '2025-04-20',
    returnDate: null,
    status: 'ongoing'
  },
  { 
    id: 4, 
    type: 'borrow',
    book: 'The Pragmatic Programmer',
    member: 'Bishal Nalbo',
    date: '2025-03-25',
    dueDate: '2025-04-08',
    returnDate: null,
    status: 'overdue'
  }
];
