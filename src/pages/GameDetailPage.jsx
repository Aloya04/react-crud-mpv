import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Game from "../components/Game";

export default function GameDetailPage() {
  const [game, setGame] = useState({}); // state to handle the data (user)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("games"); // get data from local storage
    const gamesData = JSON.parse(data) || []; // parse the data from string to javascript array
    const game = gamesData.find((game) => game.id === id); // find the user with the id from the params
    setGame(game); // set the user state with the data from local storage
  }, [id]); // <--- "[id]" VERY IMPORTANT!!!

  function showDeleteDialog() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${game.title}"?`
    );
    if (shouldDelete) {
      deleteGame();
    }
  }

  async function deleteGame() {
    const data = localStorage.getItem("games"); // get data from local storage
    const gamesData = JSON.parse(data) || []; // parse the data from string to javascript array
    const updatedGames = gamesData.filter((game) => game.id !== id); // filter out the user with the id from the params
    localStorage.setItem("games", JSON.stringify(updatedGames)); // save the users state to local storage
    navigate("/"); // navigate to the home page
  }

  function showUpdate() {
    navigate(`/games/${id}/update`);
  }

  return (
    <section id="user-page" className="page">
      <div className="container">
        <h1>{game?.title}</h1>
        <Game game={game} />
        <div className="btns">
          <button className="btn-cancel" onClick={showDeleteDialog}>
            Delete user
          </button>
          <button onClick={showUpdate}>Update user</button>
        </div>
      </div>
    </section>
  );
}
