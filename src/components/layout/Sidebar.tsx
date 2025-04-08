
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  BookCopy, 
  ArrowRightLeft, 
  Home, 
  LogOut, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Books', path: '/books', icon: BookOpen },
  { name: 'Members', path: '/members', icon: Users },
  { name: 'Categories', path: '/categories', icon: BookCopy },
  { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-semibold flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-sidebar-primary" />
          <span className="text-sidebar-foreground">Yakthung Research</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-lg my-1 transition-colors",
              location.pathname === item.path
                ? "bg-sidebar-accent text-sidebar-primary font-medium"
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border/30">
        <Link 
          to="/settings" 
          className="flex items-center px-4 py-3 text-sm rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
        <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
