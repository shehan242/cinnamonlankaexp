
'use client';

import { useState } from 'react';
import { useAppStore, UserRole } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  // Login State
  const [email, setEmail] = useState('admin@cinnamon.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('ADMIN');

  // Sign Up State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('STAFF');

  const { login, signUp, companySettings } = useAppStore();
  const router = useRouter();
  const defaultLogo = PlaceHolderImages.find(img => img.id === 'app-logo')?.imageUrl || '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, role, password);
    if (success) {
      toast({ title: "Welcome back!", description: "Logged in successfully." });
      router.push('/dashboard');
    } else {
      toast({ 
        title: "Login Failed", 
        description: "Invalid credentials. Please check your details.", 
        variant: "destructive" 
      });
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) {
      toast({ title: "Validation Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    signUp(newName, newEmail, newRole, newPassword);
    toast({ title: "Account Created", description: "You have been registered and logged in." });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4 bg-[url('https://picsum.photos/seed/spice/1920/1080?blur=10')] bg-cover relative">
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-none overflow-hidden rounded-2xl">
        <div className="bg-primary/5 h-2 w-full absolute top-0" />
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="mx-auto w-24 h-24 bg-white rounded-3xl flex items-center justify-center p-3 shadow-2xl mb-4 border border-primary/10 overflow-hidden transition-transform hover:scale-105 duration-300">
            <Image 
              src={companySettings.logo || defaultLogo} 
              alt={companySettings.name} 
              width={100} 
              height={100} 
              className="object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary tracking-tight">{companySettings.name}</CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest font-bold opacity-70">Secured Business Portal</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="signin" className="px-8 pb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email / ID</Label>
                <Input 
                  id="email" 
                  type="text" 
                  placeholder="admin@cinnamon.com" 
                  className="h-11 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-11 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Access Role</Label>
                <Select value={role} onValueChange={(v: UserRole) => setRole(v)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                    <SelectItem value="SUB_ADMIN">Sub-Admin</SelectItem>
                    <SelectItem value="STAFF">Operations Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-bold shadow-xl rounded-xl mt-4">Sign In</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                <Input 
                  id="new-name" 
                  placeholder="John Doe" 
                  className="h-11 rounded-xl"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Username / Email</Label>
                <Input 
                  id="new-email" 
                  placeholder="johndoe" 
                  className="h-11 rounded-xl"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-11 rounded-xl"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Role</Label>
                <Select value={newRole} onValueChange={(v: UserRole) => setNewRole(v)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                    <SelectItem value="SUB_ADMIN">Sub-Admin</SelectItem>
                    <SelectItem value="STAFF">Operations Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-bold shadow-xl rounded-xl mt-4">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex flex-col gap-4 px-8 pb-10">
          <p className="text-[10px] text-center text-muted-foreground font-medium italic opacity-60">
            Powered by CinnamonLink Pro | Sri Lanka
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
