import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TreeDeciduous, PlusCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { useBadgeStore } from '@/stores/badgeStore';
import { Tree } from '@/types';
import Layout from '@/components/Layout';

const adoptionSchema = z.object({
  code: z.string().min(6, 'Il codice deve contenere almeno 6 caratteri'),
  name: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
});

type AdoptionFormValues = z.infer<typeof adoptionSchema>;

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { trees, fetchUserTrees, adoptTree, loading } = useTreeStore();
  const { checkBadgeUnlocks } = useBadgeStore();
  const navigate = useNavigate();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserTrees(user.id);
    }
  }, [user, fetchUserTrees]);

  useEffect(() => {
    if (trees.length > 0) {
      checkBadgeUnlocks(trees);
    }
  }, [trees, checkBadgeUnlocks]);

  const form = useForm<AdoptionFormValues>({
    resolver: zodResolver(adoptionSchema),
    defaultValues: {
      code: '',
      name: '',
    },
  });

  const onSubmit = async (data: AdoptionFormValues) => {
    if (!user) return;
    
    setIsAdopting(true);
    try {
      const success = await adoptTree(data.code, data.name, user.id);
      if (success) {
        form.reset();
        setDialogOpen(false);
      }
    } finally {
      setIsAdopting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-2">
            Benvenuto nella tua foresta, {user?.name}
          </h1>
          <p className="text-gray-600">
            Qui puoi vedere tutti i tuoi alberi adottati e adottarne di nuovi.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-nutella-brown">I Tuoi Alberi</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-nutella-green hover:bg-nutella-darkgreen">
                <PlusCircle className="h-5 w-5 mr-2" />
                Adotta un albero
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adotta un nuovo albero</DialogTitle>
                <DialogDescription>
                  Inserisci il codice che trovi nel barattolo Nutella e dai un nome al tuo albero.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codice Nutella</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Es. NUTELLA2023" 
                            {...field} 
                            className="forest-input"
                            disabled={isAdopting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome del tuo albero</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Es. Il Guardiano" 
                            {...field} 
                            className="forest-input"
                            disabled={isAdopting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full bg-nutella-green hover:bg-nutella-darkgreen"
                      disabled={isAdopting}
                    >
                      {isAdopting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Adozione in corso...
                        </>
                      ) : (
                        'Adotta albero'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento alberi...</span>
          </div>
        ) : trees.length === 0 ? (
          <div className="text-center py-16 bg-nutella-beige/20 rounded-lg">
            <TreeDeciduous className="h-16 w-16 text-nutella-green mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-semibold text-nutella-brown mb-2">Nessun albero adottato</h3>
            <p className="text-gray-600 mb-6">
              Non hai ancora adottato nessun albero. Compra un barattolo di Nutella e usa il codice per adottarne uno!
            </p>
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-nutella-green hover:bg-nutella-darkgreen"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Adotta il tuo primo albero
            </Button>
          </div>
        ) : (
          <>
            {/* Map Preview Section */}
            <div className="mb-8 bg-nutella-beige/20 rounded-lg overflow-hidden">
              <div className="w-full h-[300px] relative bg-gray-200">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Tree Markers */}
                  {trees.map((tree) => (
                    <div
                      key={tree.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce-slow"
                      style={{
                        left: `${(tree.location.longitude - 6.5) / (18.5 - 6.5) * 100}%`,
                        top: `${(47.0 - tree.location.latitude) / (47.0 - 36.5) * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                      onClick={() => navigate(`/tree/${tree.id}`)}
                    >
                      <div className="bg-nutella-green text-white p-2 rounded-full shadow-lg flex items-center justify-center h-10 w-10 hover:scale-110 transition-transform relative z-10">
                        <TreeDeciduous className="h-6 w-6" />
                      </div>
                      <div className="mt-1 bg-white text-nutella-brown px-2 py-0.5 rounded text-xs font-medium shadow-md whitespace-nowrap">
                        {tree.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="text-sm text-nutella-brown">
                  <strong>Nota:</strong> Clicca su un albero per vedere i dettagli
                </div>
                <Button
                  variant="outline"
                  className="border-nutella-green text-nutella-green hover:bg-nutella-green/10"
                  onClick={() => navigate('/map')}
                >
                  Vedi mappa completa
                </Button>
              </div>
            </div>

            {/* Tree Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trees.map((tree: Tree) => (
                <TreeCard 
                  key={tree.id} 
                  tree={tree} 
                  onClick={() => navigate(`/tree/${tree.id}`)} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

interface TreeCardProps {
  tree: Tree;
  onClick: () => void;
}

const TreeCard: React.FC<TreeCardProps> = ({ tree, onClick }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-nutella-beige">
      <CardHeader className="p-0">
        <div className="bg-gradient-to-br from-nutella-green to-nutella-darkgreen p-6 flex items-center justify-center">
          <TreeDeciduous className="h-20 w-20 text-white" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-nutella-brown mb-1">{tree.name}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {tree.species} - Adottato il {formatDate(tree.adoptedAt)}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">CO₂ assorbita:</span>
            <span className="font-medium">{tree.metrics.co2Absorbed} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ossigeno prodotto:</span>
            <span className="font-medium">{tree.metrics.oxygenProduced} kg</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <Button 
          variant="outline" 
          className="w-full border-nutella-green text-nutella-green hover:bg-nutella-green hover:text-white"
          onClick={onClick}
        >
          Visualizza dettagli
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardPage;
