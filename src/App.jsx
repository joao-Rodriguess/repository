// 1. useCallback é importado para otimizar os handlers
import { useEffect, useMemo, useState, useCallback } from 'react';
import SearchBar from './componentes/SearchBar';
import MovieCard from './componentes/MovieCard';
import MovieModal from './componentes/MovieModal';
import moviesData from './data/movies.json';

export default function App() {
  // 4. Simplificação: Inicializa o estado diretamente com os dados locais.
  const [movies] = useState(moviesData);
  const [term, setTerm] = useState('');
  const [selected, setSelected] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    // 3. Robustez: Garante que a aplicação não quebre se o localStorage for inválido.
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Falha ao carregar favoritos do localStorage:", error);
      return []; // Retorna um array vazio como fallback seguro.
    }
  });

  // Efeito para sincronizar os favoritos com o localStorage (perfeito, sem alterações).
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Lógica de filtro (perfeita, sem alterações).
  const filtered = useMemo(() => {
    if (!term) return movies;
    const lowerCaseTerm = term.toLowerCase();
    return movies.filter(m =>
      m.Title.toLowerCase().includes(lowerCaseTerm)
    );
  }, [term, movies]);
  
  // 2. Performance: Cria um Set de IDs para checagem O(1) (instantânea).
  const favoriteIds = useMemo(() =>
    new Set(favorites.map(fav => fav.imdbID)),
    [favorites]
  );

  // 1. Performance: useCallback garante que a função não seja recriada a cada render.
  const handleSearch = useCallback((t) => {
    setTerm(t);
  }, []); // Sem dependências, nunca será recriada.

  const handleSelectMovie = useCallback((movie) => {
    setSelected(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelected(null);
  }, []);
  
  const toggleFavorite = useCallback((movie) => {
    setFavorites(prev => {
      // Usar o Set para checar a existência é mais performático aqui também.
      if (favoriteIds.has(movie.imdbID)) {
        return prev.filter(f => f.imdbID !== movie.imdbID);
      }
      return [...prev, movie];
    });
  }, [favoriteIds]); // Recriada apenas quando 'favoriteIds' muda.

  return (
    <div className="container">
      {/* Estrutura do cabeçalho levemente ajustada para clareza semântica */}
      <header className="app-header">
        <div className="topbar">
          <h1>🎬 Catálogo de Filmes</h1>
          <div className="favs">Favoritos: <strong>{favorites.length}</strong></div>
        </div>
        <SearchBar onSearch={handleSearch} />
      </header>

      <div className="grid">
        {filtered.map(movie => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onDetails={handleSelectMovie}
            onToggleFavorite={toggleFavorite}
            // 2. A checagem agora é instantânea.
            isFavorite={favoriteIds.has(movie.imdbID)}
          />
        ))}
      </div>

      <MovieModal movie={selected} onClose={handleCloseModal} />
    </div>
  );
}