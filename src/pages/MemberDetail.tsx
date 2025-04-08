
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { members, books } from '@/data/mockData';
import { ArrowLeft, Edit, Trash2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MemberDetail = () => {
  const { id } = useParams();
  const member = members.find(m => m.id.toString() === id) || null;
  
  // Find books borrowed by this member
  const borrowedBooks = books.filter(book => book.borrower === member?.name);

  if (!member) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Member Not Found</h2>
          <p className="text-muted-foreground mb-6">The member you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/members">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Members
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
          <Link to="/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{member.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-4">Member Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">Name</div>
                <div className="text-sm col-span-2">{member.name}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">Email</div>
                <div className="text-sm col-span-2">{member.email}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-3">
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div className="text-sm col-span-2">
                  <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                    {member.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm font-medium text-muted-foreground">Books Checked Out</div>
                <div className="text-sm col-span-2">{member.booksCheckedOut}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-4">Currently Borrowed Books</h2>
            
            {borrowedBooks.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">This member has no books checked out</p>
            ) : (
              <div className="space-y-4">
                {borrowedBooks.map(book => (
                  <div key={book.id} className="flex items-start p-3 rounded-md border border-border">
                    <BookOpen className="h-6 w-6 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium">
                        <Link to={`/books/${book.id}`} className="hover:text-primary">
                          {book.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                      <div className="flex mt-1 space-x-4">
                        <span className="text-xs">Due: {book.dueDate}</span>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/transactions/new?book=${book.id}&member=${member.id}&return=true`}>
                            Return
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Actions</h2>
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link to={`/members/${member.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Member
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Member
              </Button>
              
              <Button variant="secondary" className="w-full" asChild>
                <Link to={`/transactions/new?member=${member.id}`}>
                  Issue Book
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemberDetail;
