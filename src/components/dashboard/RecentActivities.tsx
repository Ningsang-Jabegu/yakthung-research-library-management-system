
import React from 'react';
import { recentActivities } from '@/data/mockData';
import { ArrowRight, ArrowLeft, BookOpen, User } from 'lucide-react';

const RecentActivities = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'borrow':
        return <ArrowRight className="h-5 w-5 text-amber-500" />;
      case 'return':
        return <ArrowLeft className="h-5 w-5 text-green-500" />;
      case 'book':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'member':
        return <User className="h-5 w-5 text-purple-500" />;
      default:
        return <ArrowRight className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 h-full">
      <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-3 mt-0.5">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{activity.title}</h4>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
