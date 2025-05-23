import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import Layout from '@/components/Layout';

const resetSchema = z.object({
  email: z.string().email('Email non valida'),
});

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPasswordPage: React.FC = () => {
  const { resetPassword, loading } = useAuthStore();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetFormValues) => {
    await resetPassword(data.email);
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nutella-beige/60 via-white/80 to-nutella-gold/20 min-h-screen animate-fade-in">
        <div className="w-full max-w-md">
          <Card className="bg-white/90 border-2 border-nutella-beige rounded-3xl shadow-2xl animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-4xl font-extrabold text-center text-nutella-brown mb-2 drop-shadow">
                Reimposta Password
              </CardTitle>
              <CardDescription className="text-lg text-center text-nutella-brown/80 font-medium">
                Inserisci la tua email per ricevere un link di reset
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-6">
                  <p className="text-green-600 font-medium mb-4 text-lg">
                    Email inviata con successo!
                  </p>
                  <p className="text-gray-600 mb-6 text-base">
                    Controlla la tua casella email per le istruzioni su come reimpostare la password.
                  </p>
                  <Button
                    asChild
                    className="bg-nutella-green hover:bg-nutella-darkgreen text-lg font-bold rounded-full py-4 px-8 shadow-md border-2 border-nutella-green transition-all duration-200"
                  >
                    <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Torna al login</Link>
                  </Button>
                </div>
              ) : (
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
                    <Button
                      type="submit"
                      className="w-full bg-nutella-green hover:bg-nutella-darkgreen text-lg font-bold rounded-full py-4 shadow-md border-2 border-nutella-green transition-all duration-200"
                      disabled={loading}
                    >
                      {loading ? 'Invio in corso...' : 'Invia email di reset'}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-base text-gray-600">
                Ricordi la password?{' '}
                <Link to="/login" className="text-nutella-green hover:underline font-semibold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Accedi
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
