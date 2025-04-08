
import React from 'react';
import { popularBooks } from '@/data/mockData';
import { BookOpen } from 'lucide-react';

const PopularBooks = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <h3 className="text-lg font-medium mb-4">Popular Books</h3>
      <div className="space-y-4">
        {popularBooks.map((book) => (
          <div key={book.id} className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3 mt-0.5">
              <BookOpen className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{book.title}</h4>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <span className="text-xs text-primary">{book.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBooks;
