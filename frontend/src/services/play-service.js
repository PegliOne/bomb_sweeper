import axios from "axios";

export const addPlay = (play) => {
  return axios.post(
    `/plays/${play.difficulty}/${play.playWon}/${play.seconds}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")
          .content,
      },
    }
  );
};

export const displayPlay = () => {
  return axios.post("/plays/update", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
    },
  });
};
