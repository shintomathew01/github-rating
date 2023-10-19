export async function getRepoDetails(repoName) {
    const apiUrl = `${process.env.GITHUB_API_URL}/${repoName}`;
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: process.env.GITHUB_TOKEN,
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return null;
    }
  }
  
  export function updateUI(data) {
    const repositoryName = data.name;
    const author = data.owner.login;
    const authorAvatar = data.owner.avatar_url;
    const stars = data.stargazers_count;
    const forks = data.forks_count;
    const isPopular = stars * 1 + forks * 2 >= 500 ? "Popular" : "Not Popular";
  
    // Display thedata information
    const repoInfo = document.getElementById("repoInfo");
    repoInfo.innerHTML = `
          <h2>Repository: ${repositoryName}</h2>
          <p>Author: ${author}</p>
          <img src="${authorAvatar}" alt="Author's Avatar" width="100">
          <p>Stars: ${stars}</p>
          <p>Forks: ${forks}</p>
          <p>Popularity: ${isPopular}</p>
      `;
  }