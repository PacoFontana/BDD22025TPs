import React, { useState } from 'react';
import axios from 'axios';
import lupa from '../assets/magnifying-glass.icon.svg';
import '../css/searchBar.css';

function SearchBar({ onSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('titulo');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3001/api/libros");
                onSearchResults(response.data.libros || []);
            } catch (error) {
                console.error("Error al obtener todos los libros:", error);
                onSearchResults([]);
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            setLoading(true);
            const params = {};
            params[searchType] = searchTerm;
            
            const response = await axios.get("http://localhost:3001/api/libros/buscar", {
                params
            });
            onSearchResults(response.data || []);
        } catch (error) {
            console.error("Error al buscar libros:", error);
            onSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container">
            <div className="search-bar">
                <label htmlFor="search-input">
                    <img 
                        src={lupa} 
                        alt="Search" 
                        onClick={handleSearch}
                        style={{ cursor: 'pointer' }}
                    />
                    <input 
                        type="text" 
                        id="search-input"
                        placeholder="Buscar libros..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </label>
            </div>
            <div className="parametros-busqueda">
                <label htmlFor="search-params">
                    <select 
                        id="search-params"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="titulo">Título</option>
                        <option value="autor">Autor</option>
                        <option value="genero">Género</option>
                    </select>
                </label>
                <button 
                    type="button" 
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>
        </div>
    );
}

export default SearchBar;