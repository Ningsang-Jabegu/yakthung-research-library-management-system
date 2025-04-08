
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

// Fake data for demonstration
const books = [
  {
    id: 1,
    title: 'Design Patterns',
    author: 'Erich Gamma, Richard Helm',
    category: 'Computer Science',
    borrowCount: 42,
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    borrowCount: 35,
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Literature',
    borrowCount: 28,
  },
  {
    id: 4,
    title: 'Software Engineering',
    author: 'Ian Sommerville',
    category: 'Computer Science',
    borrowCount: 24,
  },
];

const PopularBooks = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Popular Books</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{book.title}</p>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {book.borrowCount} borrows
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {book.author}
                </p>
                <p className="text-xs text-primary mt-1">
                  {book.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularBooks;
