import axios from "axios";

export const addPlay = (play) => {
  console.log(play);
  const storedPlays = localStorage.getItem("plays") ?? "";
  const plays = storedPlays ? JSON.parse(storedPlays) : new Array();
  plays.push(play);
  localStorage.setItem("plays", JSON.stringify(plays));
  console.log(localStorage.getItem("plays"));
  return axios.post(
    `/plays/${play.difficulty}/${play.playWon}/${play.seconds}`
  );
};
