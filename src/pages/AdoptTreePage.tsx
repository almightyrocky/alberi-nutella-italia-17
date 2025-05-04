
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTreeStore } from '@/stores/treeStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QrScanner from '@/components/QrScanner';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Camera } from 'lucide-react';

const formSchema = z.object({
  treeCode: z.string().min(6, {
    message: 'Il codice dell\'albero deve essere di almeno 6 caratteri',
  }),
  treeName: z.string().min(1, {
    message: 'Dai un nome al tuo albero',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AdoptTreePage = () => {
  const navigate = useNavigate();
  const { adoptTree, trees } = useTreeStore();
  const { checkBadgeUnlocks } = useBadgeStore();
  const user = { id: 'current-user-id' }; // Simuliamo l'utente corrente

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treeCode: '',
      treeName: '',
    },
  });

  const handleQrCodeScanned = (code: string) => {
    form.setValue('treeCode', code);
    toast.success('Codice inserito automaticamente!');
  };

  const onSubmit = async (values: FormValues) => {
    // Verifica se il codice è già stato utilizzato
    const isCodeAlreadyUsed = trees.some(tree => tree.code === values.treeCode);
    
    if (isCodeAlreadyUsed) {
      toast.error('Questo codice è già stato utilizzato');
      return;
    }

    // Usa la funzione adoptTree dallo store
    const success = await adoptTree(values.treeCode, values.treeName, user.id);
    
    if (success) {
      // Dopo l'adozione, verifica se ci sono badge da sbloccare
      checkBadgeUnlocks(trees);
      
      toast.success('Albero adottato con successo!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="container max-w-md py-8">
      <Card>
        <CardHeader>
          <CardTitle>Adotta un nuovo albero</CardTitle>
          <CardDescription>
            Inserisci il codice Nutella e dai un nome al tuo nuovo albero
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            type="button"
            className="w-full mb-6 p-6 bg-primary/10 hover:bg-primary/20 flex items-center justify-center gap-3 text-lg"
            onClick={() => {
              const qrButton = document.querySelector('[data-qr-button]');
              if (qrButton) {
                (qrButton as HTMLButtonElement).click();
              }
            }}
          >
            <Camera size={24} />
            <span>Scansiona QR Code Nutella</span>
          </Button>
          
          <Separator className="mb-6" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="treeCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codice Albero</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="Inserisci il codice Nutella" {...field} />
                      </FormControl>
                      <div className="hidden">
                        <QrScanner onCodeScanned={handleQrCodeScanned} data-qr-button />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="treeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Albero</FormLabel>
                    <FormControl>
                      <Input placeholder="Dai un nome al tuo albero" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Adotta Albero</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdoptTreePage;
