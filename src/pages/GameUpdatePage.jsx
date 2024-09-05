import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameForm from "../components/GameForm";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];
    setGame(gamesData.find((game) => game.id === id));
  }, [id]); // <--- "[params.id]" VERY IMPORTANT!!!

  async function updateGame(gameToUpdate) {
    const data = localStorage.getItem("games");
    const gamesData = JSON.parse(data) || [];
    // map through the users
    const updatedGames = gamesData.map((game) => {
      // if the user id is the same as the id from the params
      if (game.id === id) {
        return { ...game, ...gameToUpdate }; // return the user with the updated data
      }
      return game; // return the user without updating
    });

    localStorage.setItem("games", JSON.stringify(updatedGames)); // save the users state to local storage
    navigate(`/games/${id}`); // navigate to the user detail page
  }

  function handleCancel() {
    navigate(-1); // go back
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <GameForm onSubmit={updateGame} onCancel={handleCancel} game={game} />
      </div>
    </section>
  );
}
