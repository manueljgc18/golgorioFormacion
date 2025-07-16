
import { useState, useCallback } from 'react';
import datosUsuarios from '../data/usuarios.json';

// Interfaz que define la estructura de un usuario
interface usuario {
  id: number;
  usuario: string;
  contrasena: string;
}

// Interfaz para los datos de respuesta de autenticación
interface RespuestaAutenticacion {
  exito: boolean;
  mensaje: string;
  usuario?: string;
}

// Interfaz para los datos del formulario de registro/login
interface DatosFormulario {
  usuario: string;
  contrasena: string;
}

/**
 * Hook personalizado para manejar autenticación de usuarios
 * Diseñado para ser compatible con APIs futuras
 */
export const useAutenticacion = () => {
  const [cargando, setCargando] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState<string | null>(null);
  const [autenticado, setAutenticado] = useState(false);

 

  const iniciarSesion = useCallback(async (datosLogin: DatosFormulario): Promise<RespuestaAutenticacion> => {
  setCargando(true);
  try {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosLogin)
    });

    const data = await res.json();

    if (res.ok) {
      setUsuarioActual(data.usuario);
      setAutenticado(true);
      localStorage.setItem('usuarioAutenticado', data.usuario);
    }

    return data;
  } catch (error) {
    return { exito: false, mensaje: 'Error al conectar con el servidor' };
  } finally {
    setCargando(false);
  }
}, []);

  // const iniciarSesion = useCallback(async (datosLogin: DatosFormulario): Promise<RespuestaAutenticacion> => {
  //   setCargando(true);
    
  //   // Simular delay de API
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   try {
  //     // Buscar usuario en los datos locales
  //     const usuarioEncontrado = datosUsuarios.usuarios.find(
  //       u => u.usuario === datosLogin.usuario && u.contrasena === datosLogin.contrasena
  //     );

  //     if (usuarioEncontrado) {
  //       setUsuarioActual(usuarioEncontrado.usuario);
  //       setAutenticado(true);
        
  //       // Guardar en localStorage para persistencia
  //       localStorage.setItem('usuarioAutenticado', usuarioEncontrado.usuario);
        
  //       return {
  //         exito: true,
  //         mensaje: 'Inicio de sesión exitoso',
  //         usuario: usuarioEncontrado.usuario
  //       };
  //     } else {
  //       return {
  //         exito: false,
  //         mensaje: 'Usuario o contraseña incorrectos'
  //       };
  //     }
  //   } catch (error) {
  //     return {
  //       exito: false,
  //       mensaje: 'Error en el servidor. Intente nuevamente.'
  //     };
  //   } finally {
  //     setCargando(false);
  //   }
  // }, []);

 const registrarUsuario = useCallback(async (datosRegistro: DatosFormulario): Promise<RespuestaAutenticacion> => {
  setCargando(true);

  try {
    const res = await fetch('http://localhost:4000/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosRegistro)
    });

    const data = await res.json();

    if (res.ok) {
      return {
        exito: true,
        mensaje: data.mensaje,
        usuario: data.usuario
      };
    } else {
      return {
        exito: false,
        mensaje: data.mensaje || 'Error desconocido'
      };
    }

  } catch (error) {
    return {
      exito: false,
      mensaje: 'Error al conectar con el servidor'
    };
  } finally {
    setCargando(false);
  }
}, []);

  /**
   * Verifica si hay una sesión activa al cargar la aplicación
   */
  const verificarSesionActiva = useCallback(() => {
    const usuarioGuardado = localStorage.getItem('usuarioAutenticado');
    if (usuarioGuardado) {
      setUsuarioActual(usuarioGuardado);
      setAutenticado(true);
    }
  }, []);

  return {
    // Estados
    cargando,
    usuarioActual,
    autenticado,
    
    // Métodos
    iniciarSesion,
    registrarUsuario,

    verificarSesionActiva
  };
};
