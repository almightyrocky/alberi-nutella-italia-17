
import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTreeStore } from '@/stores/treeStore';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { Tree } from '@/types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

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

  // Prepare chart data
  const barData = trees.map(tree => ({
    name: tree.name,
    co2: tree.metrics.co2Absorbed,
    oxygen: tree.metrics.oxygenProduced
  }));

  const pieData = [
    { name: 'CO₂ Assorbita (kg)', value: totals.co2Absorbed, color: '#4F7942' },
    { name: 'Ossigeno Prodotto (kg)', value: totals.oxygenProduced, color: '#2E8B57' },
    { name: 'Acqua Risparmiata (l)', value: totals.waterSaved / 10, color: '#3498db' }, // Scaled for visibility
    { name: 'Habitat Creato (m²)', value: totals.habitatCreated, color: '#8B4513' }
  ];

  const COLORS = ['#4F7942', '#2E8B57', '#3498db', '#8B4513'];

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
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-nutella-brown mb-2">
            Il tuo Impatto Ambientale
          </h1>
          <p className="text-gray-600">
            Scopri come i tuoi alberi stanno contribuendo alla salute del pianeta.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-nutella-green animate-spin" />
            <span className="ml-2 text-lg text-nutella-brown">Caricamento dati...</span>
          </div>
        ) : trees.length === 0 ? (
          <div className="text-center py-16 bg-nutella-beige/20 rounded-lg">
            <h3 className="text-xl font-semibold text-nutella-brown mb-2">Nessun dato disponibile</h3>
            <p className="text-gray-600">
              Adotta il tuo primo albero per iniziare a vedere il tuo impatto ambientale.
            </p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard 
                title="CO₂ Assorbita" 
                value={`${totals.co2Absorbed} kg`} 
                description="Anidride carbonica rimossa dall'atmosfera"
                color="bg-nutella-green"
              />
              <MetricCard 
                title="Ossigeno Prodotto" 
                value={`${totals.oxygenProduced} kg`} 
                description="Ossigeno rilasciato nell'atmosfera"
                color="bg-nutella-darkgreen"
              />
              <MetricCard 
                title="Acqua Risparmiata" 
                value={`${totals.waterSaved} l`} 
                description="Litri di acqua risparmiati grazie agli alberi"
                color="bg-blue-500"
              />
              <MetricCard 
                title="Habitat Creato" 
                value={`${totals.habitatCreated} m²`} 
                description="Area di habitat naturale creata"
                color="bg-nutella-brown"
              />
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Equivalente a</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-nutella-brown">{comparisons.kmDriving} km</p>
                  <p className="text-gray-600 text-sm">di guida in auto non effettuati</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ossigeno per</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-nutella-brown">{comparisons.daysBreathing} giorni</p>
                  <p className="text-gray-600 text-sm">di respirazione per una persona</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pari a</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-nutella-brown">{comparisons.bottlesWater} bottiglie</p>
                  <p className="text-gray-600 text-sm">d'acqua da 1,5 litri risparmiate</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contributo per Albero</CardTitle>
                  <CardDescription>CO₂ assorbita e ossigeno prodotto per ogni albero</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} kg`, undefined]} />
                      <Legend />
                      <Bar dataKey="co2" name="CO₂ Assorbita" fill="#4F7942" />
                      <Bar dataKey="oxygen" name="Ossigeno Prodotto" fill="#2E8B57" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distribuzione dell'Impatto</CardTitle>
                  <CardDescription>Proporzione delle diverse metriche ambientali</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
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
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, color }) => {
  return (
    <Card>
      <div className={`h-2 ${color} rounded-t-md`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-nutella-brown">{value}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ImpactPage;
