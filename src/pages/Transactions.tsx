
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { transactions } from '@/data/mockData';
import { Plus, Search, ArrowRightLeft, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTransactions = transactions.filter(
    tx => tx.book.toLowerCase().includes(searchQuery.toLowerCase()) || 
          tx.member.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'ongoing': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const handleExport = () => {
    toast.success('Transactions data exported successfully');
    // Create a dummy file download with a made-up PDF URL
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Yakthung Research Library Management System - Transactions.pdf';
    link.click();
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-muted-foreground mt-1">Manage book borrowings and returns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link to="/transactions/new">
              <Plus className="mr-2 h-4 w-4" />
              New Transaction
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by book or member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.book}</TableCell>
                  <TableCell>{tx.member}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.dueDate}</TableCell>
                  <TableCell>{tx.returnDate || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(tx.status)} className="capitalize">
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Transactions;
