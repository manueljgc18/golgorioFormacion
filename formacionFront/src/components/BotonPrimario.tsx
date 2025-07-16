
import React from 'react';

// Propiedades que acepta el componente BotonPrimario
interface PropiedadesBotonPrimario {
  texto: string;
  onClick?: () => void;
  tipo?: 'button' | 'submit' | 'reset';
  deshabilitado?: boolean;
  cargando?: boolean;
  estiloCompleto?: boolean;
}

/**
 * Componente de botón primario reutilizable
 * Incluye estados de carga y deshabilitado
 */
const BotonPrimario: React.FC<PropiedadesBotonPrimario> = ({
  texto,
  onClick,
  tipo = 'button',
  deshabilitado = false,
  cargando = false,
  estiloCompleto = false
}) => {
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado || cargando}
      className={`boton-primario ${estiloCompleto ? 'ancho-completo' : ''} ${deshabilitado || cargando ? 'deshabilitado' : ''}`}
    >
      {cargando ? (
        <>
          <span className="indicador-carga"></span>
          Cargando...
        </>
      ) : (
        texto
      )}
    </button>
  );
};

export default BotonPrimario;
