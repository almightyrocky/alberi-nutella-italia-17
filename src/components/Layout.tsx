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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-nutella-beige/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <NutellaLogo size="xl" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={cn(
                  "flex items-center text-base font-semibold transition-colors px-3 py-1 rounded-lg hover:bg-nutella-green/10 hover:text-nutella-green",
                  location.pathname === item.path
                    ? "text-nutella-green bg-nutella-green/10"
                    : "text-nutella-brown"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            {/* Show Accedi button in nav only if not authenticated and on desktop */}
            {!isAuthenticated && (
              <Button 
                variant="default" 
                onClick={() => navigate('/login')}
                className="bg-nutella-red hover:bg-nutella-green text-white font-bold px-6 py-2 rounded-full shadow-md border-2 border-nutella-red transition-all duration-200"
              >
                Accedi
              </Button>
            )}
            {/* If authenticated, show 'La tua foresta' button */}
            {isAuthenticated && (
              <Button 
                variant="default" 
                onClick={() => navigate('/dashboard')}
                className="bg-nutella-red hover:bg-nutella-green text-white font-bold px-6 py-2 rounded-full shadow-md border-2 border-nutella-red transition-all duration-200"
              >
                La tua foresta
              </Button>
            )}
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
              // Only show Accedi button here on mobile
              !isMobile && null
              ||
              (isMobile && (
                <Button 
                  variant="default" 
                  onClick={() => navigate('/login')}
                  className="bg-nutella-red hover:bg-nutella-green border-2 border-nutella-red text-white"
                >
                  Accedi
                  <LogIn className="h-5 w-5 ml-2" />
                </Button>
              ))
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
                  onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-nutella-green/10 text-nutella-green"
                      : "text-nutella-brown hover:bg-nutella-green/5 hover:text-nutella-green"
                  )}
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
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      <footer className="bg-nutella-brown text-white py-8 mt-8 shadow-inner border-t-4 border-nutella-green">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <NutellaLogo size="lg" />
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm">&copy; 2025 Nutella Forest Italia. Tutti i diritti riservati.</p>
            <div className="flex space-x-4 mt-1">
              <Link to="/privacy" className="text-sm hover:underline text-nutella-beige" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Privacy</Link>
              <Link to="/terms" className="text-sm hover:underline text-nutella-beige" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Termini</Link>
              <a href="https://www.instagram.com/nutellaitalia/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline text-nutella-gold font-bold">Instagram</a>
              <a href="https://www.facebook.com/Nutella.Italia/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline text-nutella-gold font-bold">Facebook</a>
            </div>
            <p className="text-xs text-nutella-gold mt-2">Insieme per un futuro più verde</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
