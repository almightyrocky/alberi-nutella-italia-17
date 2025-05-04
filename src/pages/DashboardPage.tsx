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
        {/* Hero Section */}
        <div className="bg-nutella-beige/30 rounded-2xl p-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-display font-bold text-nutella-brown mb-4">
              Benvenuto nella tua foresta, {user?.name}
            </h1>
            <p className="text-lg text-gray-700">
              Qui puoi vedere tutti i tuoi alberi piantati e piantarne di nuovi.
              Ogni albero contribuisce a rendere il mondo più verde.
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <TreeDeciduous className="h-6 w-6 text-nutella-green" />
            <h2 className="text-2xl font-semibold text-nutella-brown">I Tuoi Alberi</h2>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-nutella-green hover:bg-nutella-darkgreen px-6">
                <PlusCircle className="h-5 w-5 mr-2" />
                Pianta un albero
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display text-nutella-brown">Pianta un nuovo albero</DialogTitle>
                <DialogDescription className="text-gray-600">
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
                        <FormLabel className="text-nutella-brown font-medium">Codice Nutella</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Es. GLASS-12345" 
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
                        <FormLabel className="text-nutella-brown font-medium">Nome del tuo albero</FormLabel>
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
                          Pianta albero...
                        </>
                      ) : (
                        'Pianta albero'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16 bg-nutella-beige/20 rounded-xl">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento alberi...</span>
          </div>
        ) : trees.length === 0 ? (
          <div className="text-center py-16 bg-nutella-beige/20 rounded-xl">
            <TreeDeciduous className="h-16 w-16 text-nutella-green mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-semibold text-nutella-brown mb-2">Nessun albero piantato</h3>
            <p className="text-gray-600 mb-4">
              Non hai ancora piantato nessun albero. Compra un barattolo di Nutella e usa il codice per piantarne uno!
            </p>
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-nutella-green hover:bg-nutella-darkgreen"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Pianta il tuo primo albero
            </Button>
          </div>
        ) : (
          <>
            {/* Map Preview Section */}
            <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="w-full h-[400px] relative bg-gray-200">
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
              <div className="p-6 flex justify-between items-center bg-nutella-beige/10">
                <div className="text-sm text-nutella-brown">
                  <strong>Nota:</strong> Clicca su un albero per vedere i dettagli
                </div>
                <Button
                  variant="outline"
                  className="border-nutella-green text-nutella-green hover:bg-nutella-green/10"
                  onClick={() => navigate('/map')}
                >
                  Pianta un nuovo albero
                </Button>
              </div>
            </div>

            {/* Tree Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 justify-items-center">
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

  const getTreeImage = () => {
    const species = tree.species.toLowerCase();
    if (species.includes('quercia') || species.includes('oak') || species.includes('leccio')) return '/Quercia solitaria su sfondo grigio.png';
    if (species.includes('pino') || species.includes('pine') || species.includes('abete') || species.includes('fir')) return '/Albero di pino solitario.png';
    if (species.includes('acero') || species.includes('maple')) return '/Albero di acero in primo piano.png';
    if (species.includes('betulla') || species.includes('birch')) return '/Albero di betulla su sfondo bianco.png';
    if (species.includes('ciliegio') || species.includes('cherry')) return '/Ciliegi in Fiore contro lo Sfondo Neutro.png';
    if (species.includes('melo') || species.includes('apple')) return '/Albero di mele in fiore.png';
    if (species.includes('olivo') || species.includes('olive') || species.includes('ulivo')) return '/Albero di olivo solitario.png';
    if (species.includes('cipresso') || species.includes('cypress')) return '/Cipresso solitario su sfondo neutro.png';
    return '/placeholder.svg';
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border-nutella-beige bg-white rounded-2xl w-full max-w-xs min-h-[420px] flex flex-col justify-between relative group">
      <CardHeader className="p-0">
        <img
          src={getTreeImage()}
          alt={`Foto di un albero di specie ${tree.species}`}
          className="h-56 w-full object-cover rounded-t-2xl border-b border-nutella-beige bg-white group-hover:brightness-110 transition-all duration-300"
          onError={e => (e.currentTarget.src = '/placeholder.svg')}
        />
        {/* Badge overlay esempio */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-nutella-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce">Badge</span>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="text-2xl font-bold text-nutella-brown mb-2">{tree.name}</h3>
        <p className="text-sm text-gray-600 mb-6">
          {tree.species} - Piantato il {formatDate(tree.adoptedAt)}
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">CO₂ assorbita:</span>
            <span className="font-medium text-nutella-green text-lg animate-pulse">{tree.metrics.co2Absorbed} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ossigeno prodotto:</span>
            <span className="font-medium text-nutella-green text-lg animate-pulse">{tree.metrics.oxygenProduced} kg</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Acqua risparmiata:</span>
            <span className="font-medium text-nutella-green text-lg animate-pulse">{tree.metrics.waterSaved} L</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-nutella-beige/10 px-6 py-4 flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="w-full border-nutella-green text-nutella-green hover:bg-nutella-green hover:text-white rounded-full font-bold shadow-md transition-all duration-200"
          onClick={onClick}
        >
          Visualizza dettagli
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardPage;
