import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(term.trim());
  }

  function handleClear() {
    setTerm('');
    onSearch('');
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            id="search-bar"
            className="search-input"
            type="search"
            aria-label="Busque por título"
            placeholder="Busque por título..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            autoComplete="off"
          />
          {term && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
              aria-label="Limpar busca"
            >
              
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};