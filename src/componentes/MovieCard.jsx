// ...existing code...
import PropTypes from 'prop-types';

// URL de um placeholder simples (ex: um box cinza)
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x445.png?text=Sem+Poster";

export default function MovieCard({ movie, onDetails, onToggleFavorite, isFavorite }) {
  // Guard Clause: Proteção contra props nulas ou indefinidas
  if (!movie) return null;

  // Desestruturar campos usados (agora compatível com o JSON estendido)
  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Genre,
    Type,
  } = movie;

  // Robustez: Lidar com posters ausentes
  const posterSrc = !Poster || Poster === "N/A" ? PLACEHOLDER_IMAGE : Poster;

  const genreShort = (Genre || '').split(',')[0] || Type || '';

  return (
    <div className="card" role="article" aria-label={Title}>
      <img src={posterSrc} alt={Title} />

      <h3 className="title">{Title}</h3>

      <div className="card-meta" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
        <div className="badge" aria-hidden>{Year}</div>
        {Runtime && <div className="badge" aria-hidden>{Runtime}</div>}
        {imdbRating && <div className="badge" aria-hidden>{imdbRating}/10</div>}
        {genreShort && <div className="chip" aria-hidden>{genreShort}</div>}
      </div>

      <div className="card-actions" style={{ marginTop: 10 }}>
        <button
          type="button"
          className="button"
          onClick={() => onDetails(movie)}
          aria-label={`Ver detalhes de ${Title}`}
        >
          Detalhes
        </button>

        <button
          type="button"
          className="button button--icon"
          onClick={() => onToggleFavorite(movie)}
          aria-pressed={!!isFavorite}
          aria-label={isFavorite ? `Remover ${Title} dos favoritos` : `Adicionar ${Title} aos favoritos`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
    Poster: PropTypes.string,
    Plot: PropTypes.string,
    Director: PropTypes.string,
    Actors: PropTypes.string,
    Type: PropTypes.string,
    Runtime: PropTypes.string,
    Rated: PropTypes.string,
    Genre: PropTypes.string,
    Writer: PropTypes.string,
    Language: PropTypes.string,
    Country: PropTypes.string,
    Awards: PropTypes.string,
    imdbRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onDetails: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
};
