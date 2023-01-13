import * as React from "react";
import { useInfiniteQuery } from "react-query";

async function fetchIssues({ pageParam = 1 }) {
  return fetch(
    `https://ui.dev/api/courses/react-query/issues?limit=10&page=${pageParam}`
  ).then((res) => res.json());
}

export default function App() {
  const issuesQuery = useInfiniteQuery(["issues"], fetchIssues, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return;
      return pages.length + 1;
    },
  });

  return (
    <div>
      <h1>Issues</h1>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {issuesQuery.data.pages.map((page) =>
            page.map((issue) => <li key={issue.id}>{issue.title}</li>)
          )}
        </ul>
      )}
      <div className="pagination">
        {issuesQuery.hasNextPage && (
          <button
            onClick={() => issuesQuery.fetchNextPage()}
            disabled={issuesQuery.isFetchingNextPage}
          >
            {issuesQuery.isFetchingNextPage ? "Fetching..." : "Fetch More"}
          </button>
        )}
      </div>
    </div>
  );
}
