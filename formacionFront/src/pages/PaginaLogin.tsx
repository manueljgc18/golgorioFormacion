
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioLogin from '../components/FormularioLogin';
import BotonSecundario from '../components/BotonSecundario';
import { toast } from '../hooks/use-toast';

/**
 * Página de inicio de sesión
 * Contiene el formulario de login y navegación
 */
const PaginaLogin: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Maneja el éxito del inicio de sesión
   */
  const manejarInicioSesionExitoso = (usuario: string) => {
  console.log(`Usuario ${usuario} ha iniciado sesión exitosamente`);

  toast({
    title: `¡Bienvenido, ${usuario}!`,
    description: "Inicio de sesión exitoso.",
  });
volverAlInicio();
};

  /**
   * Navega de vuelta a la página principal
   */
  const volverAlInicio = () => {
    navigate('/');
  };

  /**
   * Navega a la página de registro
   */
  const irAlRegistro = () => {
    navigate('/registro');
  };

  return (
    <div className="pagina-autenticacion">
      <div className="contenedor-principal">
        {/* Encabezado de la página */}
        <header className="encabezado-pagina">
          <h1 className="titulo-principal">Sistema de Autenticación</h1>
          <p className="subtitulo">Ingrese sus credenciales para acceder</p>
        </header>

        {/* Formulario de login */}
        <main className="contenido-principal">
          <FormularioLogin alIniciarSesion={manejarInicioSesionExitoso} />
        </main>

        {/* Navegación */}
        <footer className="pie-pagina">
          <div className="contenedor-botones-navegacion">
            <BotonSecundario
              texto="Volver al Inicio"
              onClick={volverAlInicio}
            />
            
            <div className="separador-navegacion">
              <span>¿No tienes cuenta?</span>
              <button 
                onClick={irAlRegistro}
                className="enlace-navegacion"
              >
                Regístrate aquí
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PaginaLogin;
