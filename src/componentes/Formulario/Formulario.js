import React, { useState, useEffect } from 'react';
import './Formulario.css';
import { VscError } from "react-icons/vsc";
import ListaOpciones from '../ListaOpciones';

function Formulario({ onCerrar, onGuardar, initialData }) {
  const [raza, setRaza] = useState(initialData.raza || '');
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const [edad, setEdad] = useState(initialData.edad || '');
  const [foto, setFoto] = useState(initialData.foto || '');
  const [estado, setEstado] = useState(initialData.estado || '');

  useEffect(() => {
    setRaza(initialData.raza || '');
    setNombre(initialData.nombre || '');
    setEdad(initialData.edad || '');
    setFoto(initialData.foto || '');
    setEstado(initialData.estado || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(initialData.id, raza, nombre, edad, foto, estado);
    handleClear();
  };

  const handleClear = () => {
    setRaza('');
    setNombre('');
    setEdad('');
    setFoto('');
    setEstado('');
  };

  return (
    <div className="formulario-perro">
      <div className="formulario-content">
        <button className="cerrar" onClick={onCerrar}><VscError /></button>
        <h2>{initialData.id ? 'Editar perro' : 'Agregar nuevo perro'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Raza:
            <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} required />
          </label>
          <label>
            Nombre:
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </label>
          <label>
            Edad:
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} required />
          </label>
          <label>
            Foto (URL):
            <input type="text" value={foto} onChange={(e) => setFoto(e.target.value)} required />
          </label>
          <ListaOpciones estado={estado} setEstado={setEstado} />
          <div className='botonesFormulario'>
            <button type="submit" className='botonFormulario'>Guardar</button>
            <button type="button" className="botonFormulario" onClick={handleClear}>Limpiar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;


