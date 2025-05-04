import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { Loader2, TreeDeciduous, Cloud, Droplets, Leaf, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Tree } from '@/types';

const ImpactPage: React.FC = () => {
  const { user } = useAuthStore();
  const { trees, fetchUserTrees, loading } = useTreeStore();

  useEffect(() => {
    if (user) {
      fetchUserTrees(user.id);
    }
  }, [user, fetchUserTrees]);

  // Calculate total metrics
  const calculateTotals = () => {
    return trees.reduce((acc, tree) => {
      return {
        co2Absorbed: acc.co2Absorbed + tree.metrics.co2Absorbed,
        oxygenProduced: acc.oxygenProduced + tree.metrics.oxygenProduced,
        waterSaved: acc.waterSaved + tree.metrics.waterSaved,
        habitatCreated: acc.habitatCreated + tree.metrics.habitatCreated
      };
    }, {
      co2Absorbed: 0,
      oxygenProduced: 0,
      waterSaved: 0,
      habitatCreated: 0
    });
  };

  const totals = calculateTotals();

  // Impact comparisons
  const getImpactComparisons = () => {
    const kmDriving = (totals.co2Absorbed / 0.12).toFixed(1); // Average car emits ~120g per km
    const daysBreathing = (totals.oxygenProduced / 0.84).toFixed(1); // Average person consumes ~0.84kg oxygen per day
    const bottlesWater = (totals.waterSaved / 1.5).toFixed(0); // 1.5L water bottles
    
    return { kmDriving, daysBreathing, bottlesWater };
  };

  const comparisons = getImpactComparisons();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="bg-nutella-beige/30 rounded-2xl p-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-display font-bold text-nutella-brown mb-4">
              Il tuo Impatto Ambientale
            </h1>
            <p className="text-lg text-gray-700">
              Scopri come i tuoi alberi stanno contribuendo alla salute del pianeta.
              Ogni albero fa la differenza!
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16 bg-nutella-beige/20 rounded-xl">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento dati...</span>
          </div>
        ) : trees.length === 0 ? (
          <div className="text-center py-16 bg-nutella-beige/20 rounded-xl">
            <TreeDeciduous className="h-16 w-16 text-nutella-green mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-semibold text-nutella-brown mb-2">Nessun dato disponibile</h3>
            <p className="text-gray-600 text-center">
              Pianta il tuo primo albero per iniziare a vedere il tuo impatto ambientale.
            </p>
          </div>
        ) : (
          <>
            {/* Main Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 justify-items-center">
              <MetricCard 
                title="CO₂ Assorbita" 
                value={`${totals.co2Absorbed} kg`} 
                description="Anidride carbonica rimossa dall'atmosfera"
                icon={<Cloud className="h-10 w-10" />}
                color="from-nutella-green to-nutella-darkgreen"
              />
              <MetricCard 
                title="Ossigeno Prodotto" 
                value={`${totals.oxygenProduced} kg`} 
                description="Ossigeno rilasciato nell'atmosfera"
                icon={<Leaf className="h-10 w-10" />}
                color="from-green-500 to-green-700"
              />
              <MetricCard 
                title="Acqua Risparmiata" 
                value={`${totals.waterSaved} l`} 
                description="Litri di acqua risparmiati grazie agli alberi"
                icon={<Droplets className="h-10 w-10" />}
                color="from-blue-500 to-blue-700"
              />
              <MetricCard 
                title="Habitat Creato" 
                value={`${totals.habitatCreated} m²`} 
                description="Area di habitat naturale creata"
                icon={<Globe className="h-10 w-10" />}
                color="from-nutella-brown to-nutella-darkbrown"
              />
            </div>

            {/* Impact Comparisons */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-nutella-beige">
              <h2 className="text-3xl font-display font-bold text-nutella-brown mb-6 text-center">
                Il tuo impatto in numeri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ComparisonCard 
                  title="Equivalente a"
                  value={`${comparisons.kmDriving} km`}
                  description="di guida in auto non effettuati"
                  icon={<TreeDeciduous className="h-10 w-10 text-nutella-green" />}
                />
                <ComparisonCard 
                  title="Ossigeno per"
                  value={`${comparisons.daysBreathing} giorni`}
                  description="di respirazione per una persona"
                  icon={<Leaf className="h-10 w-10 text-nutella-green" />}
                />
                <ComparisonCard 
                  title="Pari a"
                  value={`${comparisons.bottlesWater} bottiglie`}
                  description="d'acqua da 1,5 litri risparmiate"
                  icon={<Droplets className="h-10 w-10 text-nutella-green" />}
                />
              </div>
            </div>

            {/* Impact Summary */}
            <div className="bg-nutella-beige/50 rounded-2xl p-10 shadow-md">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-display font-bold text-nutella-brown mb-4 text-center">
                  Il tuo contributo per l'ambiente
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed text-lg text-center">
                  Grazie ai tuoi {trees.length} alberi piantati, stai contribuendo attivamente alla lotta contro il cambiamento climatico 
                  e alla conservazione degli ecosistemi naturali. Ogni albero che pianti assorbe CO₂, produce ossigeno, aiuta 
                  a risparmiare acqua e crea habitat per diverse specie.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg text-center">
                  Continua a piantare alberi e monitora il tuo impatto crescere nel tempo. Insieme possiamo fare la differenza 
                  per il nostro pianeta, un albero alla volta!
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon, color }) => {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 rounded-2xl border-nutella-beige bg-white w-full max-w-xs flex flex-col items-center text-center animate-fade-in">
      <div className={`bg-gradient-to-br ${color} p-8 flex flex-col items-center justify-center`}>
        <div className="mb-4 animate-bounce-slow">
          {icon}
        </div>
        <p className="text-4xl font-extrabold text-white mb-2 drop-shadow">{value}</p>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      </div>
      <CardContent className="p-6">
        <p className="text-base text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

interface ComparisonCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ title, value, description, icon }) => {
  return (
    <div className="bg-nutella-beige/30 rounded-xl p-8 flex flex-col items-center text-center shadow-md border border-nutella-beige animate-fade-in">
      <div className="mb-4 animate-bounce-slow">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-nutella-brown mb-2">{title}</h3>
      <p className="text-3xl font-bold text-nutella-brown mb-1">{value}</p>
      <p className="text-base text-gray-600">{description}</p>
    </div>
  );
};

export default ImpactPage;
