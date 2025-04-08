
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { notificationsData, Notification } from '@/data/notificationsData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Bell, BookOpen, Users, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const AllNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'unread') return matchesSearch && !notification.read;
    return matchesSearch && notification.type === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'new_member':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'book_available':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'book_returned':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'new_member':
        return <Badge variant="secondary">New Member</Badge>;
      case 'book_available':
        return <Badge variant="success">Available</Badge>;
      case 'book_returned':
        return <Badge variant="success">Returned</Badge>;
      case 'system':
        return <Badge variant="outline">System</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-muted-foreground mt-1">View and manage your notifications</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="overdue">Overdue Books</SelectItem>
              <SelectItem value="new_member">New Members</SelectItem>
              <SelectItem value="book_available">Available Books</SelectItem>
              <SelectItem value="book_returned">Returned Books</SelectItem>
              <SelectItem value="system">System Updates</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No notifications found</h3>
              <p className="text-muted-foreground">There are no notifications matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-muted p-2 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {notification.title}
                          {!notification.read && <span className="h-2 w-2 bg-primary rounded-full"></span>}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        {getNotificationBadge(notification.type)}
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
};

export default AllNotifications;
