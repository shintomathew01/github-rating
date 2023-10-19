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

  
  const repoInfo = document.getElementById("repoInfo");

  // Display the data information in case not found
  if(data.message === 'Not Found'){
    repoInfo.innerHTML = '<div class="flex items-center space-x-4">Sorry the searched repository is not found</div>';
    return true;
  }
    
  const repositoryName = data.name;
  const author = data.owner.login;
  const authorAvatar = data.owner.avatar_url;
  const stars = data.stargazers_count;
  const forks = data.forks_count;
  const isPopular = stars * 1 + forks * 2 >= 500 ? "Popular" : "Not Popular";

  


  repoInfo.innerHTML = `<div class="flex items-center space-x-4">
      <img src="${authorAvatar}" alt="Author's Avatar" class="w-16 h-16 rounded-full">
      <div>
          <h2 class="text-lg font-semibold">Repository: ${repositoryName}</h2>
          <p  class="text-gray-600">Author: <span class="font-semibold">${author}</span></p>
      </div>
  </div>
  <div class="mt-4">
      <p>Stars: <span class="font-semibold">${stars}</span></p>
      <p>Forks: <span class="font-semibold">${forks}</span></p>
      <p>Popularity: <span class="font-semibold">${isPopular}</span></p>
  </div>
  `;
}