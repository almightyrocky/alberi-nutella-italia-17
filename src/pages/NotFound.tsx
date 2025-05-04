import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nutella-beige/60 via-white/80 to-nutella-gold/20 animate-fade-in">
      <div className="w-full max-w-md p-8">
        <div className="bg-white/90 border-2 border-nutella-beige rounded-3xl shadow-2xl p-10 text-center animate-fade-in">
          <h1 className="text-6xl font-extrabold text-nutella-brown mb-4 drop-shadow">404</h1>
          <p className="text-2xl text-nutella-brown/80 font-medium mb-8">Oops! Pagina non trovata</p>
          <a 
            href="/" 
            className="inline-block bg-nutella-green hover:bg-nutella-darkgreen text-white text-lg font-bold rounded-full py-4 px-8 shadow-md border-2 border-nutella-green transition-all duration-200"
          >
            Torna alla Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
