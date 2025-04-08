
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { categories } from '@/data/mockData';

const NewBook = () => {
  return (
    <Layout>
      <div className="mb-6 flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/books">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Add New Book</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter book title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Enter author name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.name}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" placeholder="Enter ISBN number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input id="publisher" placeholder="Enter publisher name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publishYear">Publish Year</Label>
              <Input id="publishYear" placeholder="Enter publish year" type="number" />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link to="/books">Cancel</Link>
            </Button>
            <Button type="submit">Save Book</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewBook;
