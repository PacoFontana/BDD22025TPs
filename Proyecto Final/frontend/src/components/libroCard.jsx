import "../css/libroCard.css";
import React, { useState } from "react";
import axios from "axios";

function LibroCard({ libro, onLibroUpdate }) {
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [showPrestamoForm, setShowPrestamoForm] = useState(false);

  const handlePrestamo = async () => {
    if (!usuario.trim()) {
      alert('Por favor ingresa el nombre del usuario');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/prestamos", {
        libroId: libro._id,
        usuario: usuario.trim()
      });
      
      alert('Préstamo registrado con éxito');
      setShowPrestamoForm(false);
      setUsuario('');
      
      // Actualizar el libro para reflejar la nueva cantidad disponible
      if (onLibroUpdate) {
        onLibroUpdate();
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Error al crear el préstamo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="libro-card">
      <div className="libro-header">
        <h3 className="libro-titulo">{libro.titulo}</h3>
        <span className="libro-isbn">ISBN: {libro.isbn}</span>
      </div>
      <div className="libro-content">
        <p className="libro-autor">
          <strong>Autor:</strong> {libro.autor}
        </p>
        <p className="libro-genero">
          <strong>Género:</strong> {libro.genero}
        </p>
        <p className="libro-disponibles">
          <strong>Disponibles:</strong> {libro.disponibles} ejemplares
        </p>
        <p className="libro-id">
          <small>ID: {libro._id}</small>
        </p>
      </div>
      
      <div className="libro-actions">
        {libro.disponibles > 0 ? (
          <>
            {!showPrestamoForm ? (
              <button 
                className="btn-prestamo"
                onClick={() => setShowPrestamoForm(true)}
              >
                Solicitar Préstamo
              </button>
            ) : (
              <div className="prestamo-form">
                <input
                  type="text"
                  placeholder="Nombre del usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="input-usuario"
                />
                <div className="form-actions">
                  <button 
                    className="btn-confirmar"
                    onClick={handlePrestamo}
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Confirmar'}
                  </button>
                  <button 
                    className="btn-cancelar"
                    onClick={() => {
                      setShowPrestamoForm(false);
                      setUsuario('');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button className="btn-no-disponible" disabled>
            No Disponible
          </button>
        )}
      </div>
    </div>
  );
}

export default LibroCard;