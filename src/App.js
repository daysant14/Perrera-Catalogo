import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './componentes/Header/Header';
import Formulario from './componentes/Formulario/Formulario';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [perros, setPerros] = useState([]);
  const [editarPerro, setEditarPerro] = useState(null);

  useEffect(() => {
    // Cargar datos del localStorage al montar el componente
    const perrosGuardados = JSON.parse(localStorage.getItem('perros')) || [];
    setPerros(perrosGuardados);
  }, []);

  useEffect(() => {
    // Guardar datos en localStorage cada vez que cambie la lista de perros
    localStorage.setItem('perros', JSON.stringify(perros));
  }, [perros]);

  const handleAgregarClick = () => {
    setEditarPerro(null);
    setMostrarFormulario(true);
  };

  const handleCerrarClick = () => {
    setMostrarFormulario(false);
  };

  const handleGuardarClick = (id, raza, nombre, edad, foto, estado) => {
    if (id) {
      setPerros(perros.map(perro => perro.id === id ? { id, raza, nombre, edad, foto, estado } : perro));
    } else {
      const nuevoPerro = { id: Date.now(), raza, nombre, edad, foto, estado };
      setPerros([...perros, nuevoPerro]);
    }
    setMostrarFormulario(false);
  };

  const handleBorrarClick = (id) => {
    setPerros(perros.filter(perro => perro.id !== id));
  };

  const handleEditarClick = (id) => {
    const perro = perros.find(perro => perro.id === id);
    setEditarPerro(perro);
    setMostrarFormulario(true);
  };

  const perrosAdoptados = perros.filter(perro => perro.estado === 'Adoptado');
  const perrosEnEspera = perros.filter(perro => perro.estado === 'En espera de adopción');

  return (
    <div className="App">
      <Header onAgregarClick={handleAgregarClick} />
      {mostrarFormulario && (
        <Formulario onCerrar={handleCerrarClick} onGuardar={handleGuardarClick} initialData={editarPerro || {}} />
      )}
      <div className="lista-perros">
        <h2>Adoptados</h2>
        {perrosAdoptados.length === 0 ? <p>No hay perros adoptados</p> : null}
        <div className="perros-contenedor">
          {perrosAdoptados.map(perro => (
            <div key={perro.id} className="perro-card">
              {perro.foto ? (
                <img src={perro.foto} alt={perro.nombre} />
              ) : (
                <div>No Image</div>
              )}
              <h3>{perro.nombre}</h3>
              <p>Raza: {perro.raza}</p>
              <p>Edad: {perro.edad}</p>
              <button onClick={() => handleBorrarClick(perro.id)}>Borrar</button>
              <button onClick={() => handleEditarClick(perro.id)}>Editar</button>
            </div>
          ))}
        </div>
      </div>
      <div className="lista-perros">
        <h2>En espera de adopción</h2>
        {perrosEnEspera.length === 0 ? <p>No hay perros en espera de adopción</p> : null}
        <div className="perros-contenedor">
          {perrosEnEspera.map(perro => (
            <div key={perro.id} className="perro-card">
              {perro.foto ? (
                <img src={perro.foto} alt={perro.nombre} />
              ) : (
                <div>No Image</div>
              )}
              <h3>{perro.nombre}</h3>
              <p>Raza: {perro.raza}</p>
              <p>Edad: {perro.edad}</p>
              <button onClick={() => handleBorrarClick(perro.id)}>Borrar</button>
              <button onClick={() => handleEditarClick(perro.id)}>Editar</button>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>AluraFlix/Heho por: Dayely Maria</p>
      </footer>
    </div>
  );
}

export default App;
