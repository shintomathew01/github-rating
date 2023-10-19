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

    test("It should update UI if repository not found", () => {
      const dataNotFound={
        message:"Not Found"
      };
      updateUI(dataNotFound);
      const expectedResult = `<div class="flex items-center space-x-4">Sorry the searched repository is not found</div>
  `;
      expect(elm.innerHTML.replace(/\s+/g, " ").trim()).toBe(
        expectedResult.replace(/\s+/g, " ").trim()
      );
    });

    test("It should update UI", () => {
      updateUI(data);
      const expectedResult = ` <div class="flex items-center space-x-4">
      <img src="${data.owner.avatar_url}" alt="Author's Avatar" class="w-16 h-16 rounded-full">
      <div>
          <h2 class="text-lg font-semibold">Repository: ${data.name}</h2>
          <p  class="text-gray-600">Author: <span class="font-semibold">${data.owner.login}</span></p>
      </div>
  </div>
  <div class="mt-4">
      <p>Stars: <span class="font-semibold">${data.stargazers_count}</span></p>
      <p>Forks: <span class="font-semibold">${data.forks_count}</span></p>
      <p>Popularity: <span class="font-semibold">Not Popular</span></p>
  </div>
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
      <div class="flex items-center space-x-4">
      <img src="${data.owner.avatar_url}" alt="Author's Avatar" class="w-16 h-16 rounded-full">
      <div>
          <h2 class="text-lg font-semibold">Repository: ${data.name}</h2>
          <p  class="text-gray-600">Author: <span class="font-semibold">${data.owner.login}</span></p>
      </div>
  </div>
  <div class="mt-4">
      <p>Stars: <span class="font-semibold">${data.stargazers_count}</span></p>
      <p>Forks: <span class="font-semibold">${data.forks_count}</span></p>
      <p>Popularity: <span class="font-semibold">Popular</span></p>
  </div>
  `;
      expect(elm.innerHTML.replace(/\s+/g, " ").trim()).toBe(
        expectedResult.replace(/\s+/g, " ").trim()
      );
    });
  });
});