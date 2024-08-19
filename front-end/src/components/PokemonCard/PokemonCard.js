import { capitalizeFirstLetter } from "../../utils";
import "./style.css";

const PokemonCard = ({ pokemon, onFavoriteClick }) => {
  return (
    <div className="card pokemon-card me-3 mb-3" key={pokemon._id}>
      <img
        src={pokemon.sprites.front_default}
        className="card-img-top bg-light bg-gradient"
        alt={pokemon.name}
      />
      <div className="card-body">
        <h5 className="card-title">{capitalizeFirstLetter(pokemon.name)}</h5>
      </div>
      <div className="mb-3">
        <span
          onClick={() => onFavoriteClick(pokemon._id, pokemon.isFavorite)}
          className={`badge favorite-banner ${
            pokemon.isFavorite ? "bg-success" : "bg-light text-dark"
          }`}
        >
          Favorite
        </span>
      </div>
    </div>
  );
};

export default PokemonCard;
