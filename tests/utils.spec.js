import { getRepoDetails, updateUI } from "../src/utils";

global.fetch = jest.fn();
const elm = {
  innerHTML: "",
};
global.document = {
  getElementById: jest.fn(() => elm),
};
const mockData = {};
const mockResponse = {
  json: jest.fn(() => Promise.resolve(mockData)),
};

describe("utils", () => {
  describe("getRepoDetails", () => {
    const githubUrl = "github-url";
    const token = "token";
    beforeEach(() => {
      process.env.GITHUB_API_URL = githubUrl;
      process.env.GITHUB_TOKEN = token;
    });

    test("It should send request properly", async () => {
      fetch.mockImplementation(() => Promise.resolve(mockResponse));
      const repoName = "some-repo";
      const data = await getRepoDetails(repoName);

      expect(fetch).toBeCalledWith(`${githubUrl}/${repoName}`, {
        headers: {
          Authorization: token,
        },
      });
      expect(data).toBe(mockData);
    });

    test("It should return null if fetch fails", async () => {
      fetch.mockImplementation(() => Promise.reject(new Error("error")));
      const repoName = "some-repo";
      const data = await getRepoDetails(repoName);
      expect(data).toBe(null);
    });
  });

  describe("updateUI", () => {
    const data = {
      name: "repo-name",
      owner: {
        login: "user",
        avatar_url: "url",
      },
      forks_count: 20,
      stargazers_count: 10,
    };

    test("It should update UI", () => {
      updateUI(data);
      const expectedResult = `
      <h2>Repository: ${data.name}</h2>
      <p>Author: ${data.owner.login}</p>
      <img src="${data.owner.avatar_url}" alt="Author's Avatar" width="100">
      <p>Stars: ${data.stargazers_count}</p>
      <p>Forks: ${data.forks_count}</p>
      <p>Popularity: Not Popular</p>
  `;
      expect(elm.innerHTML.replace(/\s+/g, " ").trim()).toBe(
        expectedResult.replace(/\s+/g, " ").trim()
      );
    });

    test("It should update UI with popular", () => {
      data.forks_count = 800;
      data.stargazers_count = 900;
      updateUI(data);
      const expectedResult = `
      <h2>Repository: ${data.name}</h2>
      <p>Author: ${data.owner.login}</p>
      <img src="${data.owner.avatar_url}" alt="Author's Avatar" width="100">
      <p>Stars: ${data.stargazers_count}</p>
      <p>Forks: ${data.forks_count}</p>
      <p>Popularity: Popular</p>
  `;
      expect(elm.innerHTML.replace(/\s+/g, " ").trim()).toBe(
        expectedResult.replace(/\s+/g, " ").trim()
      );
    });
  });
});