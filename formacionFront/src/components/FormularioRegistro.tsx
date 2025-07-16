
import React, { useState } from 'react';
import InputTexto from './InputTexto';
import BotonPrimario from './BotonPrimario';
import { useAutenticacion } from '../hooks/useAutenticacion';

// Propiedades que acepta el componente FormularioRegistro
interface PropiedadesFormularioRegistro {
  alRegistrarse?: (usuario: string) => void;
}

/**
 * Componente de formulario de registro de usuario
 * Maneja la validación y envío de datos de registro
 */
const FormularioRegistro: React.FC<PropiedadesFormularioRegistro> = ({ alRegistrarse }) => {
  // Estados para los campos del formulario
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [mensajeGeneral, setMensajeGeneral] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState<'error' | 'exito'>('error');

  // Hook de autenticación
  const { registrarUsuario, cargando } = useAutenticacion();

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
    } else if (usuario.trim().length > 20) {
      nuevosErrores.usuario = 'El usuario no puede tener más de 20 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(usuario.trim())) {
      nuevosErrores.usuario = 'El usuario solo puede contener letras, números y guiones bajos';
    }

    // Validar campo contraseña
    if (!contrasena.trim()) {
      nuevosErrores.contrasena = 'La contraseña es requerida';
    } else if (contrasena.trim().length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    } else if (contrasena.trim().length > 50) {
      nuevosErrores.contrasena = 'La contraseña no puede tener más de 50 caracteres';
    }

    // Validar confirmación de contraseña
    if (!confirmarContrasena.trim()) {
      nuevosErrores.confirmarContrasena = 'Debe confirmar la contraseña';
    } else if (contrasena.trim() !== confirmarContrasena.trim()) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden';
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
      const respuesta = await registrarUsuario({
        usuario: usuario.trim(),
        contrasena: contrasena.trim()
      });

      if (respuesta.exito) {
        setTipoMensaje('exito');
        setMensajeGeneral(respuesta.mensaje);
        
        // Limpiar formulario
        setUsuario('');
        setContrasena('');
        setConfirmarContrasena('');
        setErrores({});
        
        // Callback opcional para manejar el éxito del registro
        if (alRegistrarse && respuesta.usuario) {
          alRegistrarse(respuesta.usuario);
        }
      } else {
        setTipoMensaje('error');
        setMensajeGeneral(respuesta.mensaje);
      }
    } catch (error) {
      setTipoMensaje('error');
      setMensajeGeneral('Error inesperado. Intente nuevamente.');
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 className="titulo-formulario">Registro de Usuario</h2>
      
      <form onSubmit={manejarEnvio} className="formulario">
        <InputTexto
          etiqueta="Usuario"
          valor={usuario}
          onChange={setUsuario}
          placeholder="Elija un nombre de usuario"
          requerido
          error={errores.usuario}
          deshabilitado={cargando}
        />

        <InputTexto
          etiqueta="Contraseña"
          valor={contrasena}
          onChange={setContrasena}
          tipo="password"
          placeholder="Cree una contraseña segura"
          requerido
          error={errores.contrasena}
          deshabilitado={cargando}
        />

        <InputTexto
          etiqueta="Confirmar Contraseña"
          valor={confirmarContrasena}
          onChange={setConfirmarContrasena}
          tipo="password"
          placeholder="Repita su contraseña"
          requerido
          error={errores.confirmarContrasena}
          deshabilitado={cargando}
        />

        {mensajeGeneral && (
          <div className={`mensaje-general ${tipoMensaje === 'exito' ? 'mensaje-exito' : 'mensaje-error-general'}`}>
            {mensajeGeneral}
          </div>
        )}

        <BotonPrimario
          texto="Registrarse"
          tipo="submit"
          cargando={cargando}
          estiloCompleto
        />
      </form>

      {/* Información sobre requisitos de registro */}
      <div className="info-registro">
        <p><strong>Requisitos:</strong></p>
        <ul>
          <li>Usuario: 3-20 caracteres, solo letras, números y guiones bajos</li>
          <li>Contraseña: mínimo 6 caracteres</li>
        </ul>
      </div>
    </div>
  );
};

export default FormularioRegistro;
