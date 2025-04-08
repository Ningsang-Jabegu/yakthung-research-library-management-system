
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { books, members, transactions } from '@/data/mockData';
import { BarChart3, Download, PieChart, BarChart2, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent,
  TabsList,
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  PieChart as RechartsPie, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLine,
  Line
} from 'recharts';
import { toast } from 'sonner';

// Sample data for charts
const monthlyActivityData = [
  { name: 'Jan', borrow: 65, return: 28 },
  { name: 'Feb', borrow: 59, return: 48 },
  { name: 'Mar', borrow: 80, return: 40 },
  { name: 'Apr', borrow: 81, return: 67 },
  { name: 'May', borrow: 56, return: 43 },
  { name: 'Jun', borrow: 55, return: 50 },
  { name: 'Jul', borrow: 40, return: 36 },
];

const categoryData = [
  { name: 'Fiction', value: 35 },
  { name: 'Science', value: 25 },
  { name: 'History', value: 20 },
  { name: 'Biography', value: 10 },
  { name: 'Others', value: 10 },
];

const popularBooksData = [
  { name: 'The Alchemist', checkouts: 28 },
  { name: 'To Kill a Mockingbird', checkouts: 25 },
  { name: 'The Great Gatsby', checkouts: 22 },
  { name: '1984', checkouts: 21 },
  { name: 'Brave New World', checkouts: 19 },
];

const memberActivityData = [
  { name: 'Active', value: 75 },
  { name: 'Inactive', value: 25 },
];

const activeMembers = [
  { name: 'Nima Lama', checkouts: 15 },
  { name: 'Bishal Nalbo', checkouts: 12 },
  { name: 'Poonam Limbu', checkouts: 10 },
  { name: 'Prensu Dongol', checkouts: 8 },
  { name: 'Smriti Jabegu', checkouts: 5 },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('/overdues') ? 'overdues' : 'general'
  );

  // Filter overdue books
  const overdueBooks = books.filter(book => 
    book.status === 'checked-out' && book.dueDate && new Date(book.dueDate) < new Date()
  );

  const handleExport = () => {
    toast.success('Report exported successfully');
    // Create a dummy file download with a made-up PDF URL
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Yakthung Research Library Management System - Reports.pdf';
    link.click();
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-muted-foreground mt-1">View and generate library statistics</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General Statistics</TabsTrigger>
          <TabsTrigger value="books">Book Reports</TabsTrigger>
          <TabsTrigger value="members">Member Reports</TabsTrigger>
          <TabsTrigger value="overdues">Overdue Books</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Books" value={books.length.toString()} icon={<BarChart3 className="h-5 w-5" />} />
            <StatCard title="Total Members" value={members.length.toString()} icon={<PieChart className="h-5 w-5" />} />
            <StatCard 
              title="Books Checked Out" 
              value={books.filter(b => b.status === 'checked-out').length.toString()} 
              icon={<BarChart2 className="h-5 w-5" />} 
            />
            <StatCard 
              title="Overdue Books" 
              value={overdueBooks.length.toString()} 
              icon={<LineChart className="h-5 w-5" />} 
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>
                Borrowing and return activity for the current month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={monthlyActivityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="borrow" fill="#8884d8" name="Borrowed" />
                    <Bar dataKey="return" fill="#82ca9d" name="Returned" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="books" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Categories Distribution</CardTitle>
              <CardDescription>
                Distribution of books by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie width={800} height={400}>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Books</CardTitle>
              <CardDescription>
                Books with highest borrowing rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={popularBooksData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="checkouts" fill="#82ca9d" name="Checkouts" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Activity</CardTitle>
              <CardDescription>
                Active vs. inactive members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie width={800} height={400}>
                    <Pie
                      data={memberActivityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#00C49F" />
                      <Cell fill="#FFBB28" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Most Active Members</CardTitle>
              <CardDescription>
                Members with highest borrowing activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={activeMembers}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="checkouts" fill="#8884d8" name="Books Checked Out" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Books</CardTitle>
              <CardDescription>
                Books that have not been returned by their due date
              </CardDescription>
            </CardHeader>
            <CardContent>
              {overdueBooks.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No overdue books at the moment
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Title</TableHead>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overdueBooks.map((book) => {
                      const dueDate = new Date(book.dueDate as string);
                      const today = new Date();
                      const daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.borrower}</TableCell>
                          <TableCell>{book.dueDate}</TableCell>
                          <TableCell>{daysOverdue} days</TableCell>
                          <TableCell>
                            <Badge variant="destructive">Overdue</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default Reports;
