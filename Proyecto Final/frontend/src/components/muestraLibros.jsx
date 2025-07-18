import "../css/muestraLibros.css";
import React, { useEffect, useState } from "react";
import LibroCard from "./libroCard";
import axios from "axios";

function MuestraLibros({ searchResults }) {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/libros");
        setLibros(response.data.libros || []);
        setError(null);
      } catch (error) {
        setError("Error al cargar los libros");
      } finally {
        setLoading(false);
      }
    };

    // Solo cargar todos los libros si no hay resultados de búsqueda
    if (searchResults === null) {
      fetchLibros();
    } else {
      setLoading(false);
    }
  }, [searchResults]);

  // Usar resultados de búsqueda si están disponibles, sino usar todos los libros
  const librosAMostrar = searchResults !== null ? searchResults : libros;
  const esBusqueda = searchResults !== null;

  if (loading) {
    return <div className="loading">Cargando libros...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (librosAMostrar.length === 0) {
    return (
      <div className="no-libros">
        {esBusqueda ? 'No se encontraron libros con esos criterios' : 'No hay libros disponibles'}
      </div>
    );
  }

  return (
    <div className="muestra-libros">
      <h2 className="titulo-seccion">
        {esBusqueda ? 'Resultados de Búsqueda' : 'Catálogo de Libros'}
      </h2>
      {esBusqueda && (
        <div className="search-info">
          Se encontraron {librosAMostrar.length} libro(s)
        </div>
      )}
      <div className="libros-grid">
        {librosAMostrar.map((libro) => (
          <LibroCard 
            key={libro._id} 
            libro={libro} 
            onLibroUpdate={() => {
              // Recargar libros después de un préstamo
              if (searchResults === null) {
                // Si no hay búsqueda activa, recargar todos los libros
                const fetchLibros = async () => {
                  try {
                    const response = await axios.get("http://localhost:3001/api/libros");
                    setLibros(response.data.libros || []);
                  } catch (error) {
                    console.error("Error al recargar libros:", error);
                  }
                };
                fetchLibros();
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MuestraLibros;
