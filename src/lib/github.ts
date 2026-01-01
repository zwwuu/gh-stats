import { throttling } from "@octokit/plugin-throttling";
import { Octokit } from "@octokit/rest";

import mockReleases from "../mock/releases.json";
import mockRepo from "../mock/repo.json";
import mockTrending from "../mock/trending.json";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
export const TRENDING_PER_PAGE = 10;

const MyOctokit = Octokit.plugin(throttling);
const octokit = new MyOctokit({
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      return retryCount < 1;
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      // does not retry, only logs a warning
      octokit.log.warn(`SecondaryRateLimit detected for request ${options.method} ${options.url}`);
    },
  },
});

export async function getTrending(date: string) {
  if (useMock) {
    return Promise.resolve({ data: mockTrending });
  }

  return await octokit.rest.search.repos({
    q: `created:>${date}`,
    sort: "stars",
    order: "desc",
    per_page: TRENDING_PER_PAGE,
  });
}

export async function getRepo(owner: string, repo: string) {
  if (useMock) {
    return Promise.resolve({ data: mockRepo });
  }

  return await octokit.rest.repos.get({ owner, repo });
}

export async function getReleases(owner: string, repo: string) {
  if (useMock) {
    return Promise.resolve(
      mockReleases.map((json) => {
        const assets = json.assets ?? [];

        return {
          html_url: json.html_url,
          id: json.id,
          author: json.author
            ? {
                login: json.author.login,
                id: json.author.id,
                avatar_url: json.author.avatar_url,
                html_url: json.author.html_url,
              }
            : null,
          tag_name: json.tag_name,
          draft: json.draft,
          prerelease: json.prerelease,
          published_at: json.published_at,
          assets: assets.map((asset) => ({
            id: asset.id,
            name: asset.name,
            size: asset.size,
            download_count: asset.download_count,
            browser_download_url: asset.browser_download_url,
          })),
          total_download_count: assets.reduce((total, asset) => total + asset.download_count, 0),
        };
      }),
    );
  }

  return await octokit.paginate(
    octokit.rest.repos.listReleases,
    {
      owner,
      repo,
    },
    (response) =>
      response.data.map((json) => {
        const assets = json.assets ?? [];

        return {
          html_url: json.html_url,
          id: json.id,
          author: json.author
            ? {
                login: json.author.login,
                id: json.author.id,
                avatar_url: json.author.avatar_url,
                html_url: json.author.html_url,
              }
            : null,
          tag_name: json.tag_name,
          draft: json.draft,
          prerelease: json.prerelease,
          published_at: json.published_at,
          assets: assets.map((asset) => ({
            id: asset.id,
            name: asset.name,
            size: asset.size,
            download_count: asset.download_count,
            browser_download_url: asset.browser_download_url,
          })),
          total_download_count: assets.reduce((total, asset) => total + asset.download_count, 0),
        };
      }),
  );
}
