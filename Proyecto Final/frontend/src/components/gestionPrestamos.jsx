import "../css/gestionPrestamos.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function GestionPrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrestamos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/prestamos");
      setPrestamos(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error al obtener préstamos:", error);
      setError("Error al cargar los préstamos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const handleDevolucion = async (prestamoId) => {
    if (!window.confirm('¿Estás seguro de que quieres devolver este libro?')) {
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:3001/api/prestamos/${prestamoId}`);
      alert('Libro devuelto con éxito');
      fetchPrestamos(); // Recargar la lista
    } catch (error) {
      alert(error.response?.data?.error || 'Error al devolver el libro');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Cargando préstamos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const prestamosActivos = prestamos.filter(prestamo => !prestamo.estado);
  const prestamosDevueltos = prestamos.filter(prestamo => prestamo.estado);

  return (
    <div className="gestion-prestamos">
      <h2 className="titulo-seccion">Gestión de Préstamos</h2>
      
      <div className="pestanas">
        <div className="seccion-prestamos">
          <h3 className="subtitulo">Préstamos Activos ({prestamosActivos.length})</h3>
          {prestamosActivos.length === 0 ? (
            <div className="no-prestamos">No hay préstamos activos</div>
          ) : (
            <div className="prestamos-lista">
              {prestamosActivos.map((prestamo) => (
                <div key={prestamo._id} className="prestamo-card activo">
                  <div className="prestamo-info">
                    <h4 className="libro-titulo">{prestamo.libroId?.titulo || 'Libro no disponible'}</h4>
                    <p className="libro-autor">{prestamo.libroId?.autor}</p>
                    <p className="usuario"><strong>Usuario:</strong> {prestamo.usuario}</p>
                    <p className="fecha"><strong>Fecha préstamo:</strong> {formatearFecha(prestamo.fechaPrestamo)}</p>
                  </div>
                  <div className="prestamo-acciones">
                    <button 
                      className="btn-devolver"
                      onClick={() => handleDevolucion(prestamo._id)}
                    >
                      Devolver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="seccion-prestamos">
          <h3 className="subtitulo">Préstamos Devueltos ({prestamosDevueltos.length})</h3>
          {prestamosDevueltos.length === 0 ? (
            <div className="no-prestamos">No hay préstamos devueltos</div>
          ) : (
            <div className="prestamos-lista">
              {prestamosDevueltos.map((prestamo) => (
                <div key={prestamo._id} className="prestamo-card devuelto">
                  <div className="prestamo-info">
                    <h4 className="libro-titulo">{prestamo.libroId?.titulo || 'Libro no disponible'}</h4>
                    <p className="libro-autor">{prestamo.libroId?.autor}</p>
                    <p className="usuario"><strong>Usuario:</strong> {prestamo.usuario}</p>
                    <p className="fecha"><strong>Préstamo:</strong> {formatearFecha(prestamo.fechaPrestamo)}</p>
                    <p className="fecha"><strong>Devolución:</strong> {formatearFecha(prestamo.fechaDevolucion)}</p>
                  </div>
                  <div className="prestamo-estado">
                    <span className="estado-devuelto">✓ Devuelto</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GestionPrestamos;
