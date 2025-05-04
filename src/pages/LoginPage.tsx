import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import Layout from '@/components/Layout';

const loginSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'La password deve contenere almeno 6 caratteri'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nutella-beige/60 via-white/80 to-nutella-gold/20 min-h-screen animate-fade-in">
        <div className="w-full max-w-md">
          <Card className="bg-white/90 border-2 border-nutella-beige rounded-3xl shadow-2xl animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-4xl font-extrabold text-center text-nutella-brown mb-2 drop-shadow">
                Accedi
              </CardTitle>
              <CardDescription className="text-lg text-center text-nutella-brown/80 font-medium">
                Inserisci le tue credenziali per accedere al tuo account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-nutella-brown font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="email@esempio.it" 
                            {...field} 
                            className="forest-input text-lg py-4 px-4 rounded-full border-2 border-nutella-beige shadow-md"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg text-nutella-brown font-semibold">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="******" 
                            {...field} 
                            className="forest-input text-lg py-4 px-4 rounded-full border-2 border-nutella-beige shadow-md"
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-right">
                    <Link 
                      to="/reset-password" 
                      className="text-base text-nutella-green hover:underline font-semibold"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Password dimenticata?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-nutella-green hover:bg-nutella-darkgreen text-lg font-bold rounded-full py-4 shadow-md border-2 border-nutella-green transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? 'Accesso in corso...' : 'Accedi'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-base text-gray-600">
                Non hai un account?{' '}
                <Link to="/register" className="text-nutella-green hover:underline font-semibold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Registrati
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
