
import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TreeDeciduous, MapPin, BarChart, Award, LogIn, User, Home, Info, Mail, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import NutellaLogo from './NutellaLogo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

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
      name: "Obiettivi",
      path: "/badges",
      icon: <Award className="h-5 w-5 mr-2" />
    }
  ];

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-4 w-4 mr-1" />
    },
    {
      name: "Scopri di più",
      path: "/about",
      icon: <Info className="h-4 w-4 mr-1" />
    },
    {
      name: "Contatti",
      path: "/contact",
      icon: <Mail className="h-4 w-4 mr-1" />
    }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <NutellaLogo size="lg" />
            <span className="font-display text-lg md:text-xl font-bold text-nutella-green ml-1">Forest</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-nutella-green",
                  location.pathname === item.path
                    ? "text-nutella-green"
                    : "text-nutella-brown"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          
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

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4 shadow-md">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-nutella-green/10 text-nutella-green"
                      : "text-nutella-brown hover:bg-nutella-green/5 hover:text-nutella-green"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
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
