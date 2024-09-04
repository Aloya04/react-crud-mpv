import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]); // state to handle the data (users)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("title"); // state to handle the sort
  // users: name of the state
  // setUsers: name of the function to set the state

  useEffect(() => {
    getGames();

    async function getGames() {
      const data = localStorage.getItem("games"); // get data from local storage

      let gamesData = [];

      if (data) {
        // if data exists in local storage
        // gamesData = JSON.parse(data); // parse the data from string to javascript array
        gamesData = await fetchGames(); // fetch the data from the API
      } else {
        // if data does not exist in local storage fetch the data from the API
        // gamesData = await fetchGames(); // fetch the data from the API
      }

      console.log(gamesData);
      setGames(gamesData); // set the games state with the data from local storage
    }
  }, []);

  async function fetchGames() {
    const response = await fetch(
      "https://raw.githubusercontent.com/Aloya04/react-crud-mpv/main/board-games.json"
    ); // fetch the data from the API
    const data = await response.json(); // parse the data from string to javascript array
    localStorage.setItem("games", JSON.stringify(data)); // save the data to local storage
    return data; // return the data
  }

  // Search, filter and sort the users array
  let filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const difficulties = [...new Set(games.map((game) => game.difficulty))]; // get all the unique titles from the games array
  const themes = [...new Set(games.map((game) => game.theme))]; // get all the unique titles from the games array
  const playerss = [...new Set(games.map((game) => game.players))]; // get all the unique titles from the games array
  const audiences = [...new Set(games.map((game) => game.audience))]; // get all the unique titles from the games array
  const playtimes = [...new Set(games.map((game) => game.playtime))]; // get all the unique titles from the games array
  const mechanicss = [...new Set(games.map((game) => game.mechanics))]; // get all the unique titles from the games array

  if (filter != "") {
    filteredGames = filteredGames.filter((game) => game.title === filter); // filter the users array by the selected title
  }

  filteredGames.sort((game1, game2) =>
    game1[sortBy].localeCompare(game2[sortBy])
  ); // sort the users array by the selected sort

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Title{" "}
          <input
            placeholder="Search"
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <label>
          Filter by Difficulty
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select difficulty</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Theme
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select theme</option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Players
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select player amount</option>
            {playerss.map((players) => (
              <option key={players} value={players}>
                {players}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Audience
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select target audience</option>
            {audiences.map((audience) => (
              <option key={audience} value={audience}>
                {audience}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Playtime
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select playtime</option>
            {playtimes.map((playtime) => (
              <option key={playtime} value={playtime}>
                {playtime}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Mechanics
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">select mechanics</option>
            {mechanicss.map((mechanics) => (
              <option key={mechanics} value={mechanics}>
                {mechanics}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select name="sort-by" onChange={(e) => setSortBy(e.target.value)}>
            <option value="title">Title</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredGames.map((game) => (
          <Game game={game} key={game.id} />
        ))}
      </section>
    </section>
  );
}
