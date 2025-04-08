
import React, { useState } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-16 px-6 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between fixed top-0 right-0 left-64 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search for books, members..." 
          className="pl-10 bg-muted/50 border-none h-9" 
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <NotificationItem 
                title="Book Overdue" 
                message="Nima Lama has not returned 'Design Patterns' yet" 
                time="2 hours ago" 
              />
              <NotificationItem 
                title="New Member" 
                message="Poonam Limbu has registered as a new member" 
                time="5 hours ago" 
              />
              <NotificationItem 
                title="Book Available" 
                message="'Clean Code' is now available for borrowing" 
                time="Yesterday" 
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <p className="text-sm font-medium">Ningsang Jabegu</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/cd5d67f9-f5c3-4189-8c9a-48f10f609afa.png" alt="Ningsang Jabegu" />
                  <AvatarFallback>NJ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-xs">Version 0.1</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

const NotificationItem = ({ title, message, time }: { title: string; message: string; time: string }) => (
  <div className="px-4 py-3 hover:bg-muted/50 cursor-pointer">
    <div className="flex justify-between mb-1">
      <h4 className="text-sm font-medium">{title}</h4>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
    <p className="text-xs text-muted-foreground">{message}</p>
  </div>
);

export default Header;
