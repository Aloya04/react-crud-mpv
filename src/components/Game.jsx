import { useNavigate } from "react-router-dom";

export default function Game({ game }) {
  // user is a prop containing game data, ex:
  // {id: "...", image: "...", mail: "...", name: "...", phone: "...", title: "..."}
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/games/${game.id}`);
  }

  return (
    <article className="game-card" onClick={handleClick}>
      <img
        src={
          game.image || "https://placehold.co/600x400?text=Error+loading+image"
        }
        alt={game.title}
      />

      <div className="game_card-title-container">
        <h2>{game.title}</h2>
        <div className="location">
          <p>{game.location}</p>
        </div>
      </div>

      <div className="categories">
        <div className="category difficulty">
          <p>{game.difficulty}</p>
        </div>
        <div className="category theme">
          <p>{game.theme}</p>
        </div>
        <div className="category players">
          <img
            src="players-icon.png"
            className="game_card-icon"
            alt="player amount icon"
          />
          <p>{game.players}</p>
        </div>
        <div className="category audience">
          <p>{game.audience}</p>
        </div>
        <div className="category playtime">
          <p>{game.playtime}</p>
        </div>
        <div className="category mechanics">
          <p>{game.mechanics}</p>
        </div>
      </div>
    </article>
  );
}
