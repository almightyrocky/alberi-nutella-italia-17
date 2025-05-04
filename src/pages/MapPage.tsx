import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { MapPin, Loader2, Plus, Search, TreeDeciduous } from 'lucide-react';
import Layout from '@/components/Layout';
import { Tree } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Fixed positions for community trees in Italy
const communityTreePositions = [
  { latitude: 41.9028, longitude: 12.4964 }, // Rome
  { latitude: 45.4642, longitude: 9.1900 }, // Milan
  { latitude: 40.8518, longitude: 14.2681 }, // Naples
  { latitude: 43.7696, longitude: 11.2558 }, // Florence
  { latitude: 45.4408, longitude: 12.3155 }, // Venice
  { latitude: 44.4949, longitude: 11.3426 }, // Bologna
  { latitude: 37.5079, longitude: 15.0830 }, // Catania
  { latitude: 38.1157, longitude: 13.3615 }, // Palermo
  { latitude: 40.3980, longitude: 17.6610 }, // Taranto
  { latitude: 44.4056, longitude: 8.9463 }, // Genoa
  { latitude: 45.0703, longitude: 7.6869 }, // Turin
  { latitude: 41.4637, longitude: 12.9234 }, // Latina
  { latitude: 43.0170, longitude: 12.3185 }, // Perugia
  { latitude: 42.3498, longitude: 13.3995 }, // L'Aquila
  { latitude: 45.6495, longitude: 13.7768 }, // Trieste
  { latitude: 44.8378, longitude: 10.3270 }, // Parma
  { latitude: 36.9477, longitude: 14.7338 }, // Ragusa
  { latitude: 46.0693, longitude: 11.1216 }, // Trento
  { latitude: 40.6401, longitude: 15.8056 }, // Potenza
  { latitude: 39.2238, longitude: 9.1217 }   // Cagliari
];

const MapPage: React.FC = () => {
  const { user } = useAuthStore();
  const { trees, fetchUserTrees, loading } = useTreeStore();
  const navigate = useNavigate();
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserTrees(user.id);
    }
  }, [user, fetchUserTrees]);

  const filteredTrees = searchTerm 
    ? trees.filter(tree => 
        tree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.species.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : trees;

  const showTreeDetails = (tree: Tree) => {
    setSelectedTree(tree);
    setIsDialogOpen(true);
  };

  // Simulazione di alberi della community con posizioni fisse per l'Italia
  const communityTrees = communityTreePositions.map((position, index) => {
    const treeNames = [
      'Quercia Rossa',
      'Pino Marittimo',
      'Ulivo Centenario',
      'Castagno Gigante',
      'Cipresso di San Francesco',
      'Betulla Bianca',
      'Acero Campestre',
      'Faggio Antico',
      'Tiglio Aromatico',
      'Pioppo Nero',
      'Frassino Maggiore',
      'Cedro del Libano',
      'Magnolia Grandiflora',
      'Ippocastano',
      'Platano Comune',
      'Ginkgo Biloba',
      'Sughera Mediterranea',
      'Bagolaro',
      'Carpino Bianco',
      'Nocciolo Selvatico'
    ];
    return {
      id: `community-${index}`,
      name: treeNames[index],
      species: ['Pino', 'Quercia', 'Ulivo', 'Betulla', 'Acero', 'Castagno', 'Cipresso'][Math.floor(Math.random() * 7)],
      location: {
        latitude: position.latitude,
        longitude: position.longitude,
        country: "Italia"
      }
    };
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nutella-beige/70 via-white/80 to-nutella-gold/20 py-20 md:py-32 rounded-b-3xl shadow-2xl animate-fade-in mb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-nutella-brown mb-8 drop-shadow-xl">
              Mappa della Foresta
            </h1>
            <p className="text-2xl text-nutella-brown/80 font-medium max-w-2xl mx-auto mb-4">
              Visualizza la posizione dei tuoi alberi e scopri gli altri alberi piantati nella Nutella Forest.
            </p>
          </div>
        </div>
      </section>
      <div className="container mx-auto pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-80 mb-4 md:mb-0">
            <Search className="absolute left-3 top-3 h-5 w-5 text-nutella-brown/60" />
            <Input 
              placeholder="Cerca alberi..." 
              className="pl-12 py-4 rounded-full border-2 border-nutella-beige shadow-md text-lg bg-white/90 focus:border-nutella-green focus:ring-1 focus:ring-nutella-green transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-nutella-green hover:bg-nutella-darkgreen text-lg rounded-full font-bold shadow-md px-8 py-4 border-2 border-nutella-green transition-all duration-200 w-full md:w-auto hover:scale-105"
            onClick={() => navigate('/dashboard')}
          >
            <Plus className="h-5 w-5 mr-2" /> Pianta un nuovo albero
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento mappa...</span>
          </div>
        ) : (
          <div className="bg-white/90 rounded-3xl overflow-hidden shadow-2xl animate-fade-in border-2 border-nutella-beige">
            <div className="w-full h-[70vh] relative bg-gray-200 flex flex-col items-center justify-center">
              {/* Placeholder Map */}
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative rounded-t-3xl">
                <div className="absolute inset-0 bg-black/20 rounded-t-3xl"></div>
                {/* Community Tree Markers */}
                {communityTrees.map((tree) => (
                  <div
                    key={tree.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${(tree.location.longitude - 6.5) / (18.5 - 6.5) * 100}%`,
                      top: `${(47.0 - tree.location.latitude) / (47.0 - 36.5) * 100}%`
                    }}
                  >
                    <div className="bg-nutella-beige/80 text-nutella-brown p-2 rounded-full shadow-lg flex items-center justify-center h-10 w-10 opacity-70 hover:opacity-100 transition-all duration-300 border-2 border-nutella-gold hover:scale-110">
                      <TreeDeciduous className="h-6 w-6" />
                    </div>
                    <div className="mt-1 bg-white/90 text-nutella-brown px-3 py-1 rounded-full text-xs font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-1/2 transform -translate-x-1/2 border border-nutella-beige">
                      {tree.name}
                    </div>
                  </div>
                ))}
                {/* My Tree Markers */}
                {filteredTrees.map((tree) => (
                  <div
                    key={tree.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-bounce-slow z-10"
                    style={{
                      left: `${(tree.location.longitude - 6.5) / (18.5 - 6.5) * 100}%`,
                      top: `${(47.0 - tree.location.latitude) / (47.0 - 36.5) * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                    onClick={() => navigate(`/tree/${tree.id}`)}
                  >
                    <div className="bg-nutella-green text-white p-2 rounded-full shadow-xl flex items-center justify-center h-14 w-14 hover:scale-110 transition-all duration-300 relative z-10 border-4 border-nutella-gold">
                      <TreeDeciduous className="h-8 w-8" />
                    </div>
                    <div className="mt-2 bg-white/90 text-nutella-brown px-4 py-2 rounded-full text-base font-bold shadow-md whitespace-nowrap border-2 border-nutella-beige animate-fade-in">
                      {tree.name}
                    </div>
                  </div>
                ))}
                {/* Map Attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-3 py-2 rounded-full shadow-md">
                  © Nutella Forest Italia
                </div>
              </div>
              {/* Map Legend */}
              <div className="absolute bottom-6 left-6 bg-white/90 p-5 rounded-2xl shadow-xl border-2 border-nutella-beige animate-fade-in">
                <h3 className="font-bold text-nutella-brown text-base mb-3">Legenda</h3>
                <div className="flex items-center text-base mb-2">
                  <div className="bg-nutella-green h-4 w-4 rounded-full mr-3 border-2 border-nutella-gold"></div>
                  <span className="font-medium">I tuoi alberi ({filteredTrees.length})</span>
                </div>
                <div className="flex items-center text-base">
                  <div className="bg-nutella-beige/80 h-4 w-4 rounded-full mr-3 border-2 border-nutella-gold"></div>
                  <span className="font-medium">Altri alberi ({communityTrees.length})</span>
                </div>
              </div>
            </div>
            <div className="p-6 text-center text-nutella-brown text-lg font-medium bg-white/80 rounded-b-3xl border-t-2 border-nutella-beige animate-fade-in">
              <strong>Nota:</strong> Questa è una mappa dimostrativa. In una versione definitiva, qui vedresti una mappa interattiva con MapLibre GL JS.
            </div>
          </div>
        )}
      </div>

      {/* Tree Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {selectedTree && (
            <>
              <DialogHeader>
                <DialogTitle className="text-nutella-brown">{selectedTree.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Specie</h4>
                    <p className="text-lg font-medium text-nutella-brown">{selectedTree.species}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Data di adozione</h4>
                    <p className="text-lg font-medium text-nutella-brown">{new Date(selectedTree.adoptedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Posizione</h4>
                  <div className="bg-nutella-beige/30 p-3 rounded-md">
                    <p className="text-sm">{selectedTree.location.country}</p>
                    <p className="text-sm">Lat: {selectedTree.location.latitude.toFixed(4)}, Long: {selectedTree.location.longitude.toFixed(4)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Impatto ambientale</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-nutella-green/10 p-3 rounded-md">
                      <p className="text-sm text-gray-500">CO₂ Assorbita</p>
                      <p className="text-lg font-medium text-nutella-green">{selectedTree.metrics.co2Absorbed} kg</p>
                    </div>
                    <div className="bg-nutella-green/10 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Ossigeno Prodotto</p>
                      <p className="text-lg font-medium text-nutella-green">{selectedTree.metrics.oxygenProduced} kg</p>
                    </div>
                    <div className="bg-nutella-green/10 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Acqua Risparmiata</p>
                      <p className="text-lg font-medium text-nutella-green">{selectedTree.metrics.waterSaved} L</p>
                    </div>
                    <div className="bg-nutella-green/10 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Habitat Creato</p>
                      <p className="text-lg font-medium text-nutella-green">{selectedTree.metrics.habitatCreated} m²</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MapPage;
