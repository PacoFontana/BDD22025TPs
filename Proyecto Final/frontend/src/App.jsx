import React, { useState } from 'react';
import "./css/App.css";
import SearchBar from './components/searchBar.jsx';
import MuestraLibros from './components/muestraLibros.jsx';
import GestionPrestamos from './components/gestionPrestamos.jsx';
import LibrosPopulares from './components/librosPopulares.jsx';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [activeTab, setActiveTab] = useState('libros');

  const handleSearchResults = (libros) => {
    setSearchResults(libros);
  };

  return (
    <div className="app">
      <h1>Bienvenido a la Biblioteca</h1>
      
      <nav className="navigation">
        <button 
          className={`nav-button ${activeTab === 'libros' ? 'active' : ''}`}
          onClick={() => setActiveTab('libros')}
        >
          Catálogo de Libros
        </button>
        <button 
          className={`nav-button ${activeTab === 'prestamos' ? 'active' : ''}`}
          onClick={() => setActiveTab('prestamos')}
        >
          Gestión de Préstamos
        </button>
        <button 
          className={`nav-button ${activeTab === 'populares' ? 'active' : ''}`}
          onClick={() => setActiveTab('populares')}
        >
          Libros Populares
        </button>
      </nav>

      {activeTab === 'libros' && (
        <>
          <SearchBar onSearchResults={handleSearchResults} />
          <MuestraLibros searchResults={searchResults} />
        </>
      )}

      {activeTab === 'prestamos' && (
        <GestionPrestamos />
      )}

      {activeTab === 'populares' && (
        <LibrosPopulares />
      )}
    </div>
  );
}

export default App;