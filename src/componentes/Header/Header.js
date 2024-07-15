import React, { useState, useEffect } from 'react';
import './Header.css';

const images = [
  '/img/rottwalier.png',
  '/img/fotoq.png', // Asegúrate de que estas imágenes existan en tu carpeta pública
  '/img/Bull Terrier.png',
  '/img/Lobo.png',
];

function Header({ onAgregarClick }) {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(prevImage => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className="header">
      <img src={currentImage} alt="Imagen del encabezado" className="background-img" />
      <h1>Alfa Guardianes</h1>
      <img src="/iconspage.png" alt="Icono de la página" className="icono" />
      <div className="botones">
        <button className="boton" onClick={onAgregarClick}>Agregar</button>
        <button className="boton">Home</button>
      </div>
    </div>
  );
}

export default Header;



