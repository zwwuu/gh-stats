import { Octokit } from "@octokit/rest";

export const TRENDING_PER_PAGE = 10;

const octokit = new Octokit();

export async function getTrending() {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  return await octokit.rest.search.repos({
    q: `created:>${date.toISOString()}`,
    sort: "stars",
    order: "desc",
    per_page: TRENDING_PER_PAGE
  });
}

export async function getRepo(owner: string, repo: string) {
  return await Promise.all([
    octokit.rest.repos.get({
      owner: owner,
      repo: repo
    }),
    octokit.paginate(octokit.rest.repos.listReleases, {
      owner: owner,
      repo: repo
    })
  ]);
}
