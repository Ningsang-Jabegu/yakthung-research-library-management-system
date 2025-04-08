
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { members, books } from '@/data/mockData';
import { ArrowLeft, Edit, Trash2, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDevelopmentDialog, setShowDevelopmentDialog] = useState(false);
  const [developmentFeature, setDevelopmentFeature] = useState('');
  
  // Find member in local storage first, then fallback to mock data
  const storedMembers = JSON.parse(localStorage.getItem('members') || '[]');
  let member = storedMembers.find((m: any) => m.id.toString() === id);
  
  // If not found in localStorage, look in mock data
  if (!member) {
    member = members.find(m => m.id.toString() === id) || null;
  }
  
  // Find books borrowed by this member
  const borrowedBooks = books.filter(book => book.borrower === member?.name);

  const handleEditMember = () => {
    // This is now just a placeholder - we'll show the "under development" dialog
    setDevelopmentFeature('Edit Member');
    setShowDevelopmentDialog(true);
  };

  const handleDeleteMember = () => {
    setShowDeleteDialog(true);
  };

  const handleIssueBook = () => {
    setDevelopmentFeature('Issue Book');
    setShowDevelopmentDialog(true);
  };

  if (!member) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">User Not Found</h2>
          <p className="text-muted-foreground mb-6">The user you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/members">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
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
            Back to Users
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{member.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-4">User Details</h2>
            
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
              <p className="text-center py-4 text-muted-foreground">This user has no books checked out</p>
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
                        <Button size="sm" variant="outline" onClick={() => {
                          setDevelopmentFeature('Return Book');
                          setShowDevelopmentDialog(true);
                        }}>
                          Return
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
              <Button className="w-full" onClick={handleEditMember}>
                <Edit className="mr-2 h-4 w-4" />
                Edit User
              </Button>
              
              <Button variant="outline" className="w-full" onClick={handleDeleteMember}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
              
              <Button variant="secondary" className="w-full" onClick={handleIssueBook}>
                Issue Book
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription>
              Users once added cannot be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showDevelopmentDialog} onOpenChange={setShowDevelopmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feature Under Development</DialogTitle>
            <DialogDescription>
              {developmentFeature} is under development process.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MemberDetail;
