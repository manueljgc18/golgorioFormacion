
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BotonPrimario from '../components/BotonPrimario';
import BotonSecundario from '../components/BotonSecundario';

/**
 * Página principal de inicio
 * Presenta las opciones de login y registro
 */
const Index: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Navega a la página de login
   */
  const irAlLogin = () => {
    navigate('/login');
  };

  /**
   * Navega a la página de registro
   */
  const irAlRegistro = () => {
    navigate('/registro');
  };

  return (
    <div className="pagina-inicio">
      <div className="contenedor-bienvenida">
        {/* Encabezado principal */}
        <header className="encabezado-inicio">
          <h1 className="titulo-bienvenida">
            Bienvenido al Sistema
          </h1>
          <p className="descripcion-sistema">
            Sistema de autenticación seguro y fácil de usar. 
            Inicia sesión o crea una nueva cuenta para comenzar.
          </p>
        </header>

        {/* Tarjeta de acciones principales */}
        <main className="contenido-inicio">
          <div className="tarjeta-acciones">
            <h2 className="titulo-acciones">¿Qué deseas hacer?</h2>
            
            <div className="contenedor-opciones">
              {/* Opción de Login */}
              <div className="opcion-accion">
                <div className="icono-accion">👤</div>
                <h3 className="titulo-opcion">Iniciar Sesión</h3>
                <p className="descripcion-opcion">
                  Si ya tienes una cuenta, ingresa con tus credenciales
                </p>
                <BotonPrimario
                  texto="Iniciar Sesión"
                  onClick={irAlLogin}
                  estiloCompleto
                />
              </div>

              {/* Separador visual */}
              <div className="separador-opciones">
                <span>o</span>
              </div>

              {/* Opción de Registro */}
              <div className="opcion-accion">
                <div className="icono-accion">✨</div>
                <h3 className="titulo-opcion">Crear Cuenta</h3>
                <p className="descripcion-opcion">
                  Nuevo usuario? Regístrate para obtener acceso completo
                </p>
                <BotonSecundario
                  texto="Registrarse"
                  onClick={irAlRegistro}
                  estiloCompleto
                />
              </div>
            </div>
          </div>
        </main>

        {/* Información adicional */}
        <footer className="pie-inicio">
          <div className="info-adicional">
            <h4>Características del Sistema:</h4>
            <ul className="lista-caracteristicas">
              <li>✓ Autenticación segura</li>
              <li>✓ Interfaz intuitiva y responsive</li>
              <li>✓ Validación de formularios en tiempo real</li>
              <li>✓ Componentes modulares y reutilizables</li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
