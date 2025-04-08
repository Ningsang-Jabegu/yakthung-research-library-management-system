
import React, { useState, useRef, useEffect } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { notificationsData } from '@/data/notificationsData';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import { books } from '@/data/mockData';

// Create a hook for handling click outside
export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
};

const Header = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter search results based on query
  const searchResults = searchQuery.length > 0
    ? [
        ...books.filter(book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5),
        ...books.map(book => book.author).filter((author, index, self) => 
          author.toLowerCase().includes(searchQuery.toLowerCase()) && 
          self.indexOf(author) === index
        ).slice(0, 3).map(author => ({ 
          type: 'author', 
          name: author, 
          id: `author-${author.replace(/\s+/g, '-').toLowerCase()}`
        }))
      ]
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 px-6 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between fixed top-0 right-0 left-64 z-10">
      <div className="relative w-96" ref={searchRef}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search for books, members..." 
          className="pl-10 bg-muted/50 border-none h-9"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto border border-border">
            <div className="p-3">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">SEARCH RESULTS</h4>
              <div className="space-y-3">
                {searchResults.map((result: any) => (
                  <div 
                    key={result.id} 
                    className="flex items-start p-2 hover:bg-muted rounded-md cursor-pointer"
                    onClick={() => {
                      if (result.type === 'author') {
                        navigate(`/books?author=${result.name}`);
                      } else {
                        navigate(`/books/${result.id}`);
                      }
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                  >
                    {result.type === 'author' ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-primary">
                            {result.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{result.name}</p>
                          <p className="text-xs text-muted-foreground">Author</p>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 h-auto text-xs text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/books?author=${result.name}`);
                              setShowSearchResults(false);
                              setSearchQuery('');
                            }}
                          >
                            View all books by this author
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mr-3">
                          <span className="text-xs font-medium">
                            {result.title.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{result.title}</p>
                          <p className="text-xs text-muted-foreground">By {result.author}</p>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 h-auto text-xs text-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/books/${result.id}`);
                              setShowSearchResults(false);
                              setSearchQuery('');
                            }}
                          >
                            View book details
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
              {notificationsData.slice(0, 3).map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  title={notification.title}
                  message={notification.message}
                  time={notification.time}
                />
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="justify-center text-primary cursor-pointer"
              onClick={() => {
                setNotificationsOpen(false);
                navigate('/notifications');
              }}
            >
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <p className="text-sm font-medium">{user?.name || 'Ningsang Jabegu'}</p>
            <p className="text-xs text-muted-foreground">{user?.role || 'Administrator'}</p>
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
              <DropdownMenuItem onClick={() => navigate('/settings?tab=account')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs text-muted-foreground">
                Version 0.2
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
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
