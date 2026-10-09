import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import mockReleases from "../../mock/releases.json";
import mockRepo from "../../mock/repo.json";
import mockTrending from "../../mock/trending.json";
import mockUserRepos from "../../mock/userRepos.json";

const GITHUB_API = "https://api.github.com";

export const handlers = [
  // GET /rate_limit — used by RateLimitStatus
  http.get(`${GITHUB_API}/rate_limit`, () => {
    const reset = Math.floor(Date.now() / 1000) + 3600;
    return HttpResponse.json({
      resources: {
        core: { limit: 60, remaining: 60, reset, used: 0 },
        search: { limit: 10, remaining: 10, reset, used: 0 },
      },
      rate: { limit: 60, remaining: 60, reset, used: 0 },
    });
  }),

  // GET /search/repositories — used by getTrending
  http.get(`${GITHUB_API}/search/repositories`, () => {
    return HttpResponse.json({
      incomplete_results: false,
      items: mockTrending.items,
      total_count: mockTrending.total_count,
    });
  }),

  // GET /repos/:owner/:repo — used by getRepo
  http.get(`${GITHUB_API}/repos/:owner/:repo`, ({ params }) => {
    const { owner, repo } = params as { owner: string; repo: string };

    // Demo error scenario: /notfound/<anything> exercises 404 handling.
    if (owner === "notfound") {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return HttpResponse.json({
      ...mockRepo,
      full_name: `${owner}/${repo}`,
      html_url: `https://github.com/${owner}/${repo}`,
      name: repo,
      owner: { ...mockRepo.owner, login: owner },
    });
  }),

  // GET /repos/:owner/:repo/releases — used by getReleases (paginated)
  http.get(`${GITHUB_API}/repos/:owner/:repo/releases`, ({ request }) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const perPage = Math.max(
      1,
      Number(url.searchParams.get("per_page") ?? "30"),
    );
    const start = (page - 1) * perPage;
    const items = mockReleases.slice(start, start + perPage);

    // Emit a Link header so octokit.paginate() follows pages like the real API.
    const headers: Record<string, string> = {};
    if (start + perPage < mockReleases.length) {
      const next = new URL(url);
      next.searchParams.set("page", String(page + 1));
      headers.link = `<${next.toString()}>; rel="next"`;
    }

    return HttpResponse.json(items, { headers });
  }),

  // GET /users/:username/repos — used by getUserRepos
  http.get(`${GITHUB_API}/users/:username/repos`, ({ params }) => {
    const { username } = params as { username: string };
    return HttpResponse.json(
      mockUserRepos.map((repo) => ({
        ...repo,
        owner: { ...repo.owner, login: username },
      })),
    );
  }),
];

export const worker = setupWorker(...handlers);
