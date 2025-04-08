
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate login (replace with actual authentication)
    setTimeout(() => {
      // Check for admin user
      if (email === 'ningsang@yakthungresearch.com' && password === 'NJabegu#112') {
        const user = {
          name: 'Ningsang Jabegu',
          email: 'ningsang@yakthungresearch.com',
          role: 'Administrator',
          isAuthenticated: true
        };
        
        login(user);
        toast.success('Login successful!');
        navigate('/');
      } else {
        // Check localStorage for registered users
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          const user = {
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            isAuthenticated: true
          };
          
          login(user);
          toast.success('Login successful!');
          navigate('/');
        } else {
          toast.error('Invalid email or password');
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Yakthung Research</h1>
          <p className="text-muted-foreground">Library Management System</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a 
                href="/register" 
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
