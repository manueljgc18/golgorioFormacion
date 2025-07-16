
import React from 'react';

// Propiedades que acepta el componente InputTexto
interface PropiedadesInputTexto {
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  tipo?: 'text' | 'password' | 'email';
  placeholder?: string;
  requerido?: boolean;
  deshabilitado?: boolean;
  error?: string;
}

/**
 * Componente de input de texto reutilizable
 * Incluye etiqueta, validación y manejo de errores
 */
const InputTexto: React.FC<PropiedadesInputTexto> = ({
  etiqueta,
  valor,
  onChange,
  tipo = 'text',
  placeholder = '',
  requerido = false,
  deshabilitado = false,
  error = ''
}) => {
  // Genera un ID único para asociar la etiqueta con el input
  const idInput = `input-${etiqueta.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="contenedor-input">
      <label htmlFor={idInput} className="etiqueta-input">
        {etiqueta}
        {requerido && <span className="campo-requerido">*</span>}
      </label>
      
      <input
        id={idInput}
        type={tipo}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={requerido}
        disabled={deshabilitado}
        className={`input-texto ${error ? 'input-error' : ''} ${deshabilitado ? 'input-deshabilitado' : ''}`}
      />
      
      {error && <span className="mensaje-error">{error}</span>}
    </div>
  );
};

export default InputTexto;
