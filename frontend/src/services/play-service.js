export const addGame = (game) => {
  const storedGames = localStorage.getItem("games") ?? "";
  const games = storedGames ? JSON.parse(storedGames) : new Array();
  games.push(game);
  localStorage.setItem("games", JSON.stringify(games));
  console.log(localStorage.getItem("games"));
};
