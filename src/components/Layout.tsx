
import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TreeDeciduous, MapPin, BarChart, Award, LogIn, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const menuItems = [
    {
      name: "I Miei Alberi",
      path: "/dashboard",
      icon: <TreeDeciduous className="h-5 w-5 mr-2" />
    },
    {
      name: "Mappa",
      path: "/map",
      icon: <MapPin className="h-5 w-5 mr-2" />
    },
    {
      name: "Impatto",
      path: "/impact",
      icon: <BarChart className="h-5 w-5 mr-2" />
    },
    {
      name: "Badges",
      path: "/badges",
      icon: <Award className="h-5 w-5 mr-2" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="font-display text-lg md:text-xl font-bold text-nutella-brown">
              <span className="text-nutella-red">Nutella</span> Forest
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="text-nutella-brown"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  {!isMobile && "Esci"}
                  <User className="h-5 w-5 ml-2" />
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                onClick={() => navigate('/login')}
                className="bg-nutella-green hover:bg-nutella-darkgreen"
              >
                {!isMobile && "Accedi"}
                <LogIn className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer Navigation for authenticated users */}
      {isAuthenticated && (
        <nav className="sticky bottom-0 z-40 bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto">
            <div className="flex justify-around">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "text-nutella-green"
                      : "text-gray-500 hover:text-nutella-brown"
                  )}
                >
                  <div className="flex items-center">
                    {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                  </div>
                  <span className="mt-1 text-xs">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Footer */}
      <footer className="bg-nutella-beige text-nutella-brown py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 Nutella Forest Italia. Tutti i diritti riservati.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-sm hover:underline">Privacy</Link>
              <Link to="/terms" className="text-sm hover:underline">Termini e Condizioni</Link>
              <Link to="/contact" className="text-sm hover:underline">Contatti</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
