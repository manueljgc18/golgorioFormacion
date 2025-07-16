
import React from 'react';

// Propiedades que acepta el componente BotonSecundario
interface PropiedadesBotonSecundario {
  texto: string;
  onClick: () => void;
  tipo?: 'button' | 'submit' | 'reset';
  deshabilitado?: boolean;
  estiloCompleto?: boolean;
}

/**
 * Componente de botón secundario reutilizable
 * Para acciones menos importantes que el botón primario
 */
const BotonSecundario: React.FC<PropiedadesBotonSecundario> = ({
  texto,
  onClick,
  tipo = 'button',
  deshabilitado = false,
  estiloCompleto = false
}) => {
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado}
      className={`boton-secundario ${estiloCompleto ? 'ancho-completo' : ''} ${deshabilitado ? 'deshabilitado' : ''}`}
    >
      {texto}
    </button>
  );
};

export default BotonSecundario;
