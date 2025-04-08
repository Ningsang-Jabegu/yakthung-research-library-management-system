
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentActivities from '@/components/dashboard/RecentActivities';
import BookCategories from '@/components/dashboard/BookCategories';
import PopularBooks from '@/components/dashboard/PopularBooks';
import { BookOpen, Users, ArrowRightLeft, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to BookWise Nexus Library Management System</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Books" 
          value="1,248" 
          icon={BookOpen}
          description="Books in inventory" 
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Total Members" 
          value="346" 
          icon={Users}
          description="Active library members" 
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard 
          title="Transactions" 
          value="894" 
          icon={ArrowRightLeft}
          description="This month" 
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard 
          title="Overdue Books" 
          value="18" 
          icon={AlertTriangle}
          description="Need attention" 
          trend={{ value: 5, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div>
          <BookCategories />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PopularBooks />
        </div>
        <div className="data-card">
          <h3 className="text-lg font-medium mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 transition text-left">
              <BookOpen className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium text-sm">Add New Book</p>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 transition text-left">
              <Users className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium text-sm">Add New Member</p>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 transition text-left">
              <ArrowRightLeft className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium text-sm">New Transaction</p>
            </button>
            <button className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 transition text-left">
              <AlertTriangle className="h-6 w-6 text-primary mb-2" />
              <p className="font-medium text-sm">View Overdues</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
