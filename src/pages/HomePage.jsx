import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]); // state to handle the data (games)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [difficultyFilter, setDifficultyFilter] = useState(""); // state to handle the difficulty filter
  const [themeFilter, setThemeFilter] = useState(""); // state to handle the theme filter
  const [playersFilter, setPlayersFilter] = useState(""); // state to handle the players filter
  const [audienceFilter, setAudienceFilter] = useState(""); // state to handle the audience filter
  const [playtimeFilter, setPlaytimeFilter] = useState(""); // state to handle the playtime filter
  const [mechanicsFilter, setMechanicsFilter] = useState(""); // state to handle the mechanics filter

  useEffect(() => {
    async function getGames() {
      const data = localStorage.getItem("games"); // Get data from local storage

      let gamesData = [];

      if (data) {
        // If data exists in local storage
        gamesData = JSON.parse(data); // Parse the data from string to JavaScript array
      } else {
        // If data does not exist in local storage, fetch the data from the API
        gamesData = await fetchGames(); // Fetch the data from the API
      }

      console.log(gamesData);
      setGames(gamesData); // Set the games state with the data from local storage or API
    }

    getGames();
  }, []);

  async function fetchGames() {
    const response = await fetch(
      "https://raw.githubusercontent.com/Aloya04/react-crud-mpv/main/board-games.json"
    ); // Fetch the data from the API
    const data = await response.json(); // Parse the data from string to JavaScript array
    localStorage.setItem("games", JSON.stringify(data)); // Save the data to local storage
    return data; // Return the data
  }

  // Filter the games array
  let filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (difficultyFilter) {
    filteredGames = filteredGames.filter(
      (game) => game.difficulty === difficultyFilter
    );
  }
  if (themeFilter) {
    filteredGames = filteredGames.filter((game) => game.theme === themeFilter);
  }
  if (playersFilter) {
    filteredGames = filteredGames.filter(
      (game) => game.players === playersFilter
    );
  }
  if (audienceFilter) {
    filteredGames = filteredGames.filter(
      (game) => game.audience === audienceFilter
    );
  }
  if (playtimeFilter) {
    filteredGames = filteredGames.filter(
      (game) => game.playtime === playtimeFilter
    );
  }
  if (mechanicsFilter) {
    filteredGames = filteredGames.filter(
      (game) => game.mechanics === mechanicsFilter
    );
  }

  // Sort the games array by the selected sort

  // Get unique values for filter options
  const difficulties = [...new Set(games.map((game) => game.difficulty))];
  const themes = [...new Set(games.map((game) => game.theme))];
  const playerss = [...new Set(games.map((game) => game.players))];
  const audiences = [...new Set(games.map((game) => game.audience))];
  const playtimes = [...new Set(games.map((game) => game.playtime))];
  const mechanicss = [...new Set(games.map((game) => game.mechanics))];

  return (
    <section className="page">
      <label>
        Search by Title{" "}
        <input
          placeholder="Search"
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <form className="grid-filter" role="search">
        <label>
          Filter by Difficulty
          <select onChange={(e) => setDifficultyFilter(e.target.value)}>
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
          <select onChange={(e) => setThemeFilter(e.target.value)}>
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
          <select onChange={(e) => setPlayersFilter(e.target.value)}>
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
          <select onChange={(e) => setAudienceFilter(e.target.value)}>
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
          <select onChange={(e) => setPlaytimeFilter(e.target.value)}>
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
          <select onChange={(e) => setMechanicsFilter(e.target.value)}>
            <option value="">select mechanics</option>
            {mechanicss.map((mechanics) => (
              <option key={mechanics} value={mechanics}>
                {mechanics}
              </option>
            ))}
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
