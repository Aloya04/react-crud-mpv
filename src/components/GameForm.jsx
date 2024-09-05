import { useEffect, useState } from "react";

export default function GameForm({ onSubmit, onCancel, game }) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState("");
  const [audience, setAudience] = useState("");
  const [playtime, setPlaytime] = useState("");
  const [mechanics, setMechanics] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (game) {
      game.title && setTitle(game.title); // if game.title is true, set the title state with the game.title value
      game.theme && setTheme(game.theme);
      game.difficulty && setDifficulty(game.difficulty);
      game.players && setPlayers(game.players);
      game.audience && setAudience(game.audience);
      game.playtime && setPlaytime(game.playtime);
      game.mechanics && setMechanics(game.mechanics);
      game.image && setImage(game.image); // if user.image is true, set the image state with the user.image value
    }
  }, [game]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // validate the form
    if (
      !title ||
      !theme ||
      !difficulty ||
      !players ||
      !audience ||
      !playtime ||
      !mechanics
    ) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    }

    const game = {
      // key/name: value from state,
      title: title,
      theme: theme,
      difficulty: difficulty,
      players: players,
      audience: audience,
      playtime: playtime,
      image: image,
    };
    onSubmit(game);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        placeholder="Type a title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="">Difficulty</label>
      <input
        id="difficulty"
        type="text"
        value={difficulty}
        placeholder="Type difficulty"
        onChange={(e) => setDifficulty(e.target.value)}
      />

      <label htmlFor="">Theme</label>
      <input
        id="theme"
        type="text"
        value={theme}
        placeholder="Type theme"
        onChange={(e) => setTheme(e.target.value)}
      />

      <label htmlFor="">Players</label>
      <input
        id="players"
        type="text"
        value={players}
        placeholder="Type player amount"
        onChange={(e) => setPlayers(e.target.value)}
      />

      <label htmlFor="">Audience</label>
      <input
        id="audience"
        type="text"
        value={audience}
        placeholder="Type target audience"
        onChange={(e) => setAudience(e.target.value)}
      />

      <label htmlFor="">Playtime</label>
      <input
        id="playtime"
        type="text"
        value={playtime}
        placeholder="Type playtime"
        onChange={(e) => setPlaytime(e.target.value)}
      />

      <label htmlFor="">Mechanics</label>
      <input
        id="mechanics"
        type="text"
        value={mechanics}
        placeholder="Type mechanics"
        onChange={(e) => setMechanics(e.target.value)}
      />

      <label htmlFor="">Image URL</label>
      <input
        type="url"
        value={image}
        placeholder="Paste image URL"
        onChange={(e) => setImage(e.target.value)}
      />
      <label htmlFor="image-preview"></label>
      <img
        id="image-preview"
        className="image-preview"
        src={
          image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"
        }
        alt="Choose"
        onError={(e) =>
          (e.target.src =
            "https://placehold.co/600x400?text=Error+loading+image")
        }
      />
      <div className="btns">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button>{game ? "Save" : "Create"}</button>
      </div>
    </form>
  );
}
