import "../css/librosPopulares.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function LibrosPopulares() {
  const [populares, setPopulares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopulares = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/populares");
        setPopulares(response.data || []);
        setError(null);
      } catch (error) {
        console.error("Error al obtener libros populares:", error);
        setError("Error al cargar los libros populares");
      } finally {
        setLoading(false);
      }
    };

    fetchPopulares();
  }, []);

  if (loading) {
    return <div className="loading">Cargando libros populares...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="libros-populares">
      <h2 className="titulo-seccion">Top 5 Libros Más Populares</h2>
      
      {populares.length === 0 ? (
        <div className="no-populares">
          No hay datos de préstamos suficientes para mostrar libros populares
        </div>
      ) : (
        <div className="populares-lista">
          {populares.map((libro, index) => (
            <div key={`${libro.isbn}-${index}`} className="popular-card">
              <div className="ranking">
                #{index + 1}
              </div>
              <div className="libro-info">
                <h3 className="titulo">{libro.titulo}</h3>
                <p className="autor">Autor: {libro.autor}</p>
                <p className="isbn">ISBN: {libro.isbn}</p>
              </div>
              <div className="prestamos-info">
                <span className="prestamos-count">{libro.totalPrestamos}</span>
                <span className="prestamos-label">préstamos</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LibrosPopulares;
