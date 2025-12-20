import { throttling } from "@octokit/plugin-throttling";
import { Octokit } from "@octokit/rest";

import mockReleases from "../mock/releases.json";
import mockRepo from "../mock/repo.json";
import mockTrending from "../mock/trending.json";

const useMocks = process.env.NEXT_USE_MOCKS === "true";
export const TRENDING_PER_PAGE = 10;

const MyOctokit = Octokit.plugin(throttling);
const octokit = new MyOctokit({
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      if (retryCount < 1) {
        // only retries once
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      // does not retry, only logs a warning
      octokit.log.warn(`SecondaryRateLimit detected for request ${options.method} ${options.url}`);
    },
  },
});

export async function getTrending() {
  // if (useMocks) {
  return Promise.resolve({ data: mockTrending });
  // }

  // const date = new Date();
  // date.setDate(date.getDate() - 7);
  //
  // return await octokit.rest.search.repos({
  //   q: `created:>${date.toISOString()}`,
  //   sort: "stars",
  //   order: "desc",
  //   per_page: TRENDING_PER_PAGE,
  // });
}

export async function getRepo(owner: string, repo: string) {
  // if (useMocks) {
  return Promise.resolve({ data: mockRepo });
  // }

  // return await octokit.rest.repos.get({ owner, repo });
}

export async function getReleases(owner: string, repo: string) {
  if (useMocks) {
    return Promise.resolve({ data: mockReleases });
  }

  // return await octokit.paginate(
  //   octokit.rest.repos.listReleases,
  //   {
  //     owner,
  //     repo,
  //   },
  //   (response) =>
  //     response.data.map((d) => {
  //       return {
  //         id: d.id,
  //         tag_name: d.tag_name,
  //         name: d.name,
  //         draft: d.draft,
  //         prerelease: d.prerelease,
  //         published_at: d.published_at,
  //         assets: d.assets,
  //       };
  //     }),
  // );
}
