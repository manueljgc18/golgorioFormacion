
import React, { useState } from 'react';
import InputTexto from './InputTexto';
import BotonPrimario from './BotonPrimario';
import { useAutenticacion } from '../hooks/useAutenticacion';

// Propiedades que acepta el componente FormularioLogin
interface PropiedadesFormularioLogin {
  alIniciarSesion?: (usuario: string) => void;
}

/**
 * Componente de formulario de inicio de sesión
 * Maneja la validación y envío de datos de login
 */
const FormularioLogin: React.FC<PropiedadesFormularioLogin> = ({ alIniciarSesion }) => {
  // Estados para los campos del formulario
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [mensajeGeneral, setMensajeGeneral] = useState('');

  // Hook de autenticación
  const { iniciarSesion, cargando } = useAutenticacion();

  /**
   * Valida los campos del formulario
   * @returns true si todos los campos son válidos
   */
  const validarFormulario = (): boolean => {
    const nuevosErrores: { [key: string]: string } = {};

    // Validar campo usuario
    if (!usuario.trim()) {
      nuevosErrores.usuario = 'El usuario es requerido';
    } else if (usuario.trim().length < 3) {
      nuevosErrores.usuario = 'El usuario debe tener al menos 3 caracteres';
    }

    // Validar campo contraseña
    if (!contrasena.trim()) {
      nuevosErrores.contrasena = 'La contraseña es requerida';
    } else if (contrasena.trim().length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeGeneral('');

    // Validar formulario antes de enviar
    if (!validarFormulario()) {
      return;
    }

    try {
      const respuesta = await iniciarSesion({
        usuario: usuario.trim(),
        contrasena: contrasena.trim()
      });

      if (respuesta.exito) {
        setMensajeGeneral('');
        // Limpiar formulario
        setUsuario('');
        setContrasena('');
        setErrores({});
        
        // Callback opcional para manejar el éxito del login
        if (alIniciarSesion && respuesta.usuario) {
          alIniciarSesion(respuesta.usuario);
        }
      } else {
        setMensajeGeneral(respuesta.mensaje);
      }
    } catch (error) {
      setMensajeGeneral('Error inesperado. Intente nuevamente.');
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo-formulario">Iniciar Sesión</h2>
      
      <form onSubmit={manejarEnvio} className="formulario">
        <InputTexto
          etiqueta="Usuario"
          valor={usuario}
          onChange={setUsuario}
          placeholder="Ingrese su usuario"
          requerido
          error={errores.usuario}
          deshabilitado={cargando}
        />

        <InputTexto
          etiqueta="Contraseña"
          valor={contrasena}
          onChange={setContrasena}
          tipo="password"
          placeholder="Ingrese su contraseña"
          requerido
          error={errores.contrasena}
          deshabilitado={cargando}
        />

        {mensajeGeneral && (
          <div className="mensaje-error-general">
            {mensajeGeneral}
          </div>
        )}

        <BotonPrimario
          texto="Iniciar Sesión"
          tipo="submit"
          cargando={cargando}
          estiloCompleto
        />
      </form>

    </div>
  );
};

export default FormularioLogin;
