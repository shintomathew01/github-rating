import { getRepoDetails, updateUI } from "./utils";

document
  .getElementById("search")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const repoName = document.getElementById("repoName").value;
    const data = await getRepoDetails(repoName);
    updateUI(data);
  });