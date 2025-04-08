
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { books } from '@/data/mockData';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BookDetail = () => {
  const { id } = useParams();
  const book = books.find(b => b.id.toString() === id) || null;

  if (!book) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Book Not Found</h2>
          <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/books">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/books">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{book.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-4">Book Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">Title</div>
                <div className="text-sm col-span-2">{book.title}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">Author</div>
                <div className="text-sm col-span-2">{book.author}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">Category</div>
                <div className="text-sm col-span-2">{book.category}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">ISBN</div>
                <div className="text-sm col-span-2">{book.isbn}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div className="text-sm col-span-2">
                  <Badge variant={book.status === 'available' ? 'success' : 'warning'}>
                    {book.status === 'available' ? 'Available' : 'Checked Out'}
                  </Badge>
                </div>
              </div>
              
              {book.borrower && (
                <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                  <div className="text-sm font-medium text-muted-foreground">Borrower</div>
                  <div className="text-sm col-span-2">{book.borrower}</div>
                </div>
              )}
              
              {book.dueDate && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">Due Date</div>
                  <div className="text-sm col-span-2">{book.dueDate}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Actions</h2>
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link to={`/books/${book.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Book
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Book
              </Button>
              
              {book.status === 'available' ? (
                <Button variant="secondary" className="w-full" asChild>
                  <Link to={`/transactions/new?book=${book.id}`}>
                    Issue Book
                  </Link>
                </Button>
              ) : (
                <Button variant="secondary" className="w-full" asChild>
                  <Link to={`/transactions/new?book=${book.id}&return=true`}>
                    Return Book
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetail;
