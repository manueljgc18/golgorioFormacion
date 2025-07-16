
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PaginaLogin from "./pages/PaginaLogin";
import PaginaRegistro from "./pages/PaginaRegistro";
import NotFound from "./pages/NotFound";

// Importar los estilos CSS personalizados
import './estilos/autenticacion.css';

const queryClient = new QueryClient();

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y los proveedores globales
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Index />} />
          
          {/* Página de inicio de sesión */}
          <Route path="/login" element={<PaginaLogin />} />
          
          {/* Página de registro */}
          <Route path="/registro" element={<PaginaRegistro />} />
          
          {/* Página 404 para rutas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
