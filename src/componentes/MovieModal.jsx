import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x445.png?text=Sem+Poster";

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape' || e.code === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!movie) return null;

  const posterSrc = movie && movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : PLACEHOLDER_IMAGE;

  return (
    <div className="modal-backdrop is-visible" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{movie.Title || 'Título desconhecido'}</h2>
          <button
            type="button"
            className="button button--icon"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-poster">
            <img src={posterSrc} alt={movie.Title || 'Poster'} />
            <div className="modal-rating" aria-hidden>
              <span className="rating-badge">
                {movie.imdbRating ?? '—'}/10
              </span>
            </div>
          </div>

          <div className="modal-info">
            <div className="modal-meta">
              <span className="badge">{movie.Year ?? '—'}</span>
              <span className="badge">{movie.Rated ?? 'NR'}</span>
              <span className="badge">{movie.Type ?? 'Filme'}</span>
            </div>

            <p className="modal-plot">{movie.Plot ?? 'Sem sinopse disponível.'}</p>

            <div className="modal-details">
              <p><strong>Diretor:</strong> {movie.Director ?? '—'}</p>
              <p><strong>Elenco:</strong> {movie.Actors ?? '—'}</p>
            </div>

            <div className="modal-actions" style={{ marginTop: 12 }}>
              {movie.imdbID && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  className="button button--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no IMDb
                </a>
              )}
              <button type="button" className="button button--ghost" onClick={onClose} style={{ marginLeft: 8 }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieModal.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    Poster: PropTypes.string,
    Plot: PropTypes.string,
    Director: PropTypes.string,
    Writer: PropTypes.string,
    Actors: PropTypes.string,
    Type: PropTypes.string,
    Runtime: PropTypes.string,
    Rated: PropTypes.string,
    Genre: PropTypes.string,
    Country: PropTypes.string,
    Language: PropTypes.string,
    Awards: PropTypes.string,
    imdbRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imdbID: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
