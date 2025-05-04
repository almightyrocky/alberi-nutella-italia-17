
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
  const addTree = useTreeStore((state) => state.addTree);
  const unlockBadge = useBadgeStore((state) => state.unlockBadge);
  const trees = useTreeStore((state) => state.trees);

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

  const onSubmit = (values: FormValues) => {
    // Verifica se il codice è già stato utilizzato
    const isCodeAlreadyUsed = trees.some(tree => tree.code === values.treeCode);
    
    if (isCodeAlreadyUsed) {
      toast.error('Questo codice è già stato utilizzato');
      return;
    }

    // Genera un ID casuale per il nuovo albero
    const newTreeId = Math.random().toString(36).substring(2, 11);
    
    // Aggiungi il nuovo albero
    addTree({
      id: newTreeId,
      name: values.treeName,
      code: values.treeCode,
      dateAdopted: new Date().toISOString(),
      species: "Quercia",
      location: "Parco Nazionale del Gran Paradiso, Italia",
      co2Absorbed: 0,
      age: 1,
      height: 1.5,
      health: "ottima",
      lastUpdated: new Date().toISOString()
    });

    // Se è il primo albero, sblocca il badge "First Tree"
    if (trees.length === 0) {
      unlockBadge("first-tree");
    }

    toast.success('Albero adottato con successo!');
    navigate('/dashboard');
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
                      <QrScanner onCodeScanned={handleQrCodeScanned} />
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
