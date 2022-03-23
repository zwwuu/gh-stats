import axios from "axios";

export const PER_PAGE = 20;
const BASE_URL = "https://api.github.com";

export async function getTrending() {
  let date = new Date();
  date.setDate(date.getDate() - 7);

  const { data } = await axios.get(
    `${BASE_URL}/search/repositories?q=created:>${date.toISOString()}&sort=stars&order=desc&per_page=10`
  );
  return data;
}

export async function getRepo(user, repo) {
  const { data } = await axios.get(`${BASE_URL}/repos/${user}/${repo}`);
  return data;
}

export async function getReleases(user, repo, page = 1) {
  const { data } = await axios.get(`${BASE_URL}/repos/${user}/${repo}/releases?per_page=${PER_PAGE}&page=${page}`);
  return data;
}
