import React from 'react';
import './ListadeOpciones.css';

const ListaOpciones = ({ estado, setEstado }) => {
  const estados = [
    "Adoptado",
    "En espera de adopción"
  ];

  return (
    <div className="lista-opciones">
      <label>Estado</label>
      <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
        <option value="" disabled>Seleccionar estado</option>
        {estados.map((estado, index) => <option key={index} value={estado}>{estado}</option>)}
      </select>
    </div>
  );
};

export default ListaOpciones;
