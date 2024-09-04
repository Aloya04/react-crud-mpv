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
      <h2>{game.title}</h2>
      <p className="title">{game.title}</p>
    </article>
  );
}
