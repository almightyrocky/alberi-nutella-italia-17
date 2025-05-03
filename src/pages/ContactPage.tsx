
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
  email: z.string().email('Email non valida'),
  subject: z.string().min(5, "L'oggetto deve contenere almeno 5 caratteri"),
  message: z.string().min(20, 'Il messaggio deve contenere almeno 20 caratteri'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactPage: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // In a real app, we would send this data to an API
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Messaggio inviato con successo! Ti risponderemo presto.');
    form.reset();
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-display font-bold text-nutella-brown mb-4">
            Contattaci
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hai domande sul programma Nutella Forest? Vuoi sapere di più sul tuo albero?
            Siamo qui per aiutarti!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <div className="bg-nutella-beige/30 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-nutella-brown mb-6">
                Informazioni di Contatto
              </h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-nutella-green/20 flex items-center justify-center mr-4">
                    <MailIcon className="h-6 w-6 text-nutella-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-nutella-brown">Email</h3>
                    <p className="text-gray-600">info@nutellaforest.it</p>
                    <p className="text-gray-600">supporto@nutellaforest.it</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-nutella-green/20 flex items-center justify-center mr-4">
                    <PhoneIcon className="h-6 w-6 text-nutella-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-nutella-brown">Telefono</h3>
                    <p className="text-gray-600">+39 02 1234 5678</p>
                    <p className="text-gray-600">Lun-Ven: 9:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-nutella-green/20 flex items-center justify-center mr-4">
                    <MapPinIcon className="h-6 w-6 text-nutella-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-nutella-brown">Indirizzo</h3>
                    <p className="text-gray-600">Via delle Foreste 123</p>
                    <p className="text-gray-600">20123 Milano, Italia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-nutella-brown mb-4">Seguici</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-nutella-green/20 h-10 w-10 rounded-full flex items-center justify-center hover:bg-nutella-green hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-nutella-green/20 h-10 w-10 rounded-full flex items-center justify-center hover:bg-nutella-green hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.23.6 1.786 1.155.554.554.904 1.117 1.155 1.786.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427-.25.668-.6 1.23-1.155 1.786-.554.554-1.117.904-1.786 1.155-.636.247-1.363.416-2.427.465-1.06.048-1.37.06-4.123.06-2.67 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465-.668-.25-1.23-.6-1.786-1.155-.554-.554-.904-1.117-1.155-1.786-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-4.043 0-2.659.013-3.018.06-4.043.049-1.064.218-1.791.465-2.427.25-.668.6-1.23 1.155-1.786.554-.554 1.117-.904 1.786-1.155.636-.247 1.363-.416 2.427-.465C9.39 2.013 9.97 2 12.315 2zm.001-1.8c-2.716 0-3.056.011-4.123.06-1.064.049-1.791.218-2.427.465-.668.25-1.23.6-1.786 1.155-.554.554-.904 1.117-1.155 1.786-.247.636-.416 1.363-.465 2.427-.047 1.066-.06 1.405-.06 4.122 0 2.717.013 3.056.06 4.122.049 1.064.218 1.791.465 2.427.25.668.6 1.23 1.155 1.786.554.554 1.117.904 1.786 1.155.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.122-.06c1.064-.049 1.791-.218 2.427-.465.668-.25 1.23-.6 1.786-1.155.554-.554.904-1.117 1.155-1.786.247-.636.416-1.363.465-2.427.048-1.066.06-1.405.06-4.122s-.012-3.056-.06-4.122c-.049-1.064-.218-1.791-.465-2.427-.25-.668-.6-1.23-1.155-1.786-.554-.554-1.117-.904-1.786-1.155-.636-.247-1.363-.416-2.427-.465-1.067-.048-1.407-.06-4.122-.06h-.08z" />
                      <path d="M12.315 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.315 16.362a4.203 4.203 0 110-8.405 4.203 4.203 0 010 8.405z" />
                      <circle cx="18.701" cy="5.298" r="1.439" />
                    </svg>
                  </a>
                  <a href="#" className="bg-nutella-green/20 h-10 w-10 rounded-full flex items-center justify-center hover:bg-nutella-green hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.162 5.656a8.384 8.384 0 01-2.402.658A4.196 4.196 0 0021.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 00-7.126 3.814 11.874 11.874 0 01-8.62-4.37 4.168 4.168 0 001.294 5.582 4.16 4.16 0 01-1.897-.523v.052a4.185 4.185 0 003.355 4.101 4.21 4.21 0 01-1.893.072A4.185 4.185 0 007.97 16.65a8.394 8.394 0 01-6.19 1.732 11.83 11.83 0 006.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 002.087-2.165z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-nutella-brown">Inviaci un messaggio</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Mario Rossi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email@esempio.it" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Oggetto</FormLabel>
                          <FormControl>
                            <Input placeholder="Informazioni sul programma" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Messaggio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Scrivi qui il tuo messaggio..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit"
                        className="bg-nutella-green hover:bg-nutella-darkgreen"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
