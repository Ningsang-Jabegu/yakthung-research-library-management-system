
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, BookOpen, UserPlus, ArrowDownLeft } from 'lucide-react';

// Fake data for demonstration
const activities = [
  {
    id: 1,
    type: 'borrow',
    book: 'Design Patterns',
    member: 'John Doe',
    time: '2 hours ago',
    icon: ArrowUpRight,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  {
    id: 2,
    type: 'return',
    book: 'Clean Code',
    member: 'Jane Smith',
    time: '4 hours ago',
    icon: ArrowDownLeft,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 3,
    type: 'new-book',
    book: 'Software Engineering',
    member: null,
    time: '1 day ago',
    icon: BookOpen,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    id: 4,
    type: 'new-member',
    book: null,
    member: 'Robert Johnson',
    time: '2 days ago',
    icon: UserPlus,
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
];

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className={`${activity.bgColor} h-8 w-8 rounded-full flex items-center justify-center mt-1 mr-3`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">
                    {activity.type === 'borrow' && 'Book Borrowed'}
                    {activity.type === 'return' && 'Book Returned'}
                    {activity.type === 'new-book' && 'New Book Added'}
                    {activity.type === 'new-member' && 'New Member Registered'}
                  </p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.type === 'borrow' && `${activity.member} borrowed '${activity.book}'`}
                  {activity.type === 'return' && `${activity.member} returned '${activity.book}'`}
                  {activity.type === 'new-book' && `'${activity.book}' was added to the library`}
                  {activity.type === 'new-member' && `${activity.member} joined the library`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
