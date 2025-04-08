
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { books, members } from '@/data/mockData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NewTransaction = () => {
  return (
    <Layout>
      <div className="mb-6 flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/transactions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transactions
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">New Transaction</h1>
      </div>

      <Tabs defaultValue="borrow" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="borrow">Issue Book</TabsTrigger>
          <TabsTrigger value="return">Return Book</TabsTrigger>
        </TabsList>
        
        <TabsContent value="borrow">
          <Card>
            <CardHeader>
              <CardTitle>Issue Book</CardTitle>
              <CardDescription>
                Create a new borrowing transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="member">Select Member</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a member" />
                      </SelectTrigger>
                      <SelectContent>
                        {members
                          .filter(member => member.status === 'active')
                          .map(member => (
                            <SelectItem key={member.id} value={member.id.toString()}>
                              {member.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="book">Select Book</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a book" />
                      </SelectTrigger>
                      <SelectContent>
                        {books
                          .filter(book => book.status === 'available')
                          .map(book => (
                            <SelectItem key={book.id} value={book.id.toString()}>
                              {book.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <RadioGroup defaultValue="14" className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="7" id="r1" />
                          <Label htmlFor="r1">7 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="14" id="r2" />
                          <Label htmlFor="r2">14 Days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="30" id="r3" />
                          <Label htmlFor="r3">30 Days</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/transactions">Cancel</Link>
                  </Button>
                  <Button type="submit">Issue Book</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="return">
          <Card>
            <CardHeader>
              <CardTitle>Return Book</CardTitle>
              <CardDescription>
                Process a book return
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="borrowedBook">Select Borrowed Book</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a borrowed book" />
                      </SelectTrigger>
                      <SelectContent>
                        {books
                          .filter(book => book.status === 'checked-out')
                          .map(book => (
                            <SelectItem key={book.id} value={book.id.toString()}>
                              {book.title} - {book.borrower}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Condition on Return</Label>
                    <RadioGroup defaultValue="good" className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="good" id="c1" />
                        <Label htmlFor="c1">Good Condition</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fair" id="c2" />
                        <Label htmlFor="c2">Fair Condition</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="damaged" id="c3" />
                        <Label htmlFor="c3">Damaged</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/transactions">Cancel</Link>
                  </Button>
                  <Button type="submit">Return Book</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default NewTransaction;
