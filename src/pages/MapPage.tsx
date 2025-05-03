
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { MapPin, Loader2, Plus, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { Tree } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

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

  // Simulate random positions for community trees
  const communityTrees = Array.from({ length: 15 }, (_, index) => ({
    id: `community-${index}`,
    name: `Albero Comunitario ${index + 1}`,
    species: ['Pino', 'Quercia', 'Ulivo', 'Betulla', 'Acero'][Math.floor(Math.random() * 5)],
    location: {
      latitude: 41.9 + (Math.random() * 0.2 - 0.1),
      longitude: 12.5 + (Math.random() * 0.2 - 0.1),
      country: "Italia"
    }
  }));

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-2">
            Mappa della Foresta
          </h1>
          <p className="text-gray-600">
            Visualizza la posizione dei tuoi alberi e scopri gli altri alberi adottati nella foresta Nutella.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Cerca alberi..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            className="bg-nutella-green hover:bg-nutella-darkgreen w-full md:w-auto"
            onClick={() => navigate('/dashboard')}
          >
            <Plus className="h-4 w-4 mr-2" /> Adotta un nuovo albero
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento mappa...</span>
          </div>
        ) : (
          <div className="bg-nutella-beige/20 rounded-lg overflow-hidden">
            <div className="w-full h-[70vh] relative bg-gray-200 flex flex-col items-center justify-center">
              {/* Placeholder Map */}
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="bg-white p-2 rounded-md shadow-md">
                    <MapPin className="h-5 w-5 text-nutella-green" />
                  </button>
                </div>
                
                {/* My Tree Markers */}
                {filteredTrees.map((tree) => (
                  <div
                    key={tree.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${(tree.location.longitude + 180) / 360 * 100}%`,
                      top: `${(90 - tree.location.latitude) / 180 * 100}%`
                    }}
                    onClick={() => showTreeDetails(tree)}
                  >
                    <div className="bg-nutella-green text-white p-2 rounded-full shadow-lg flex items-center justify-center h-10 w-10 hover:scale-110 transition-transform relative z-10">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="mt-2 bg-white text-nutella-brown px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                      {tree.name}
                    </div>
                  </div>
                ))}

                {/* Community Tree Markers */}
                {communityTrees.map((tree) => (
                  <div
                    key={tree.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${(tree.location.longitude + 180) / 360 * 100}%`,
                      top: `${(90 - tree.location.latitude) / 180 * 100}%`
                    }}
                  >
                    <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg flex items-center justify-center h-8 w-8 opacity-70">
                      <MapPin className="h-5 w-5" />
                    </div>
                  </div>
                ))}
                
                {/* Map Attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                  © Nutella Forest Italia
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
                <h3 className="font-medium text-sm mb-2">Legenda</h3>
                <div className="flex items-center text-xs mb-1">
                  <div className="bg-nutella-green h-3 w-3 rounded-full mr-2"></div>
                  <span>I tuoi alberi ({filteredTrees.length})</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="bg-gray-400 h-3 w-3 rounded-full mr-2"></div>
                  <span>Altri alberi ({communityTrees.length})</span>
                </div>
              </div>
            </div>
            <div className="p-4 text-center text-nutella-brown text-sm">
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
