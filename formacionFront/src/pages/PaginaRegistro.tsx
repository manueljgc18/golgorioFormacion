
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioRegistro from '../components/FormularioRegistro';
import BotonSecundario from '../components/BotonSecundario';
import { toast } from '../hooks/use-toast';

/**
 * Página de registro de usuario
 * Contiene el formulario de registro y navegación
 */
const PaginaRegistro: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Maneja el éxito del registro
   */
  const manejarRegistroExitoso = (usuario: string) => {
    console.log(`Usuario ${usuario} se ha registrado exitosamente`);
    // Redirigir automáticamente al login después del registro exitoso
    setTimeout(() => {
      navigate('/login');
    }, 2000);
     toast({
    title: `¡hola, ${usuario}!`,
    description: "Registro exitoso.",
  });
  };

  /**
   * Navega de vuelta a la página principal
   */
  const volverAlInicio = () => {
    navigate('/');
  };

  /**
   * Navega a la página de login
   */
  const irAlLogin = () => {
    navigate('/login');
  };

  return (
    <div className="pagina-autenticacion">
      <div className="contenedor-principal">
        {/* Encabezado de la página */}
        <header className="encabezado-pagina">
          <h1 className="titulo-principal">Crear Nueva Cuenta</h1>
          <p className="subtitulo">Complete el formulario para registrarse</p>
        </header>

        {/* Formulario de registro */}
        <main className="contenido-principal">
          <FormularioRegistro alRegistrarse={manejarRegistroExitoso} />
        </main>

        {/* Navegación */}
        <footer className="pie-pagina">
          <div className="contenedor-botones-navegacion">
            <BotonSecundario
              texto="Volver al Inicio"
              onClick={volverAlInicio}
            />
            
            <div className="separador-navegacion">
              <span>¿Ya tienes cuenta?</span>
              <button 
                onClick={irAlLogin}
                className="enlace-navegacion"
              >
                Inicia sesión aquí
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PaginaRegistro;
