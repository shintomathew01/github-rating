import { getRepoDetails, updateUI } from "./utils";

document
  .getElementById("getRepoInfo")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const repoName = document.getElementById("search").value;
    if(repoName==="")
    {
      return true;
    }
    const data = await getRepoDetails(repoName);
    document.getElementById("repoInfo").style.display="block";
    updateUI(data);
  });