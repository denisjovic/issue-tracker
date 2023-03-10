import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";
import { useState } from "react";
import fetchWithError from "../helpers/fetchWithError";
import Loader from "./Loader";

export default function IssuesList({ labels, status, pageNum, setPageNum }) {
  const [searchValue, setSearchValue] = useState("");
  const issuesQuery = useQuery(
    ["issues", { labels, status, pageNum }],
    async ({ signal }) => {
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      const statusString = status ? `status=${status}` : "";
      const paginationString = pageNum ? `&page=${pageNum}` : ``;
      return fetchWithError(
        `/api/issues?${labelsString}${statusString}${paginationString}`,
        {
          signal,
        },
        { keepPreviousData: true }
      );
    },
    { useErrorBoundary: true }
  );
  const { data, isLoading, isError } = issuesQuery;
  if (isError) return <p>Something went wrong: {issuesQuery.error.message}</p>;

  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`)
        .then((res) => res.json())
        .catch((err) => console.error("searchQuery error", err)),
    { enabled: searchValue.length > 0, useErrorBoundary: true }
  );

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value);
        }}
      >
        <label htmlFor={"search"}>Search Issues</label>
        <input
          id={"search"}
          placeholder={"search"}
          name={"search"}
          type={"search"}
          onChange={(event) => {
            if (event.target.value.length === 0) {
              setSearchValue("");
            }
          }}
        />
      </form>
      <h2>Issues List {issuesQuery.isFetching && <Loader />}</h2>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
        <>
          <ul className={"issues-list"}>
            {data.map((issue) => (
              <IssueItem
                key={issue.id}
                title={issue.title}
                number={issue.number}
                assignee={issue.assignee}
                commentCount={issue.comments.length}
                createdBy={issue.createdBy}
                createDate={issue.createdDate}
                status={issue.status}
                labels={issue.labels}
              />
            ))}
          </ul>
          <div className="pagination">
            <button
              onClick={() => setPageNum((pageNum) => pageNum - 1)}
              disabled={pageNum === 1}
            >
              Previous
            </button>
            <p>
              Page {pageNum} {issuesQuery.isFetching && "..."}
            </p>
            <button
              onClick={() => {
                if (issuesQuery.data?.length !== 0)
                  setPageNum((pageNum) => pageNum + 1);
              }}
              disabled={
                issuesQuery.data?.length === 0 || issuesQuery.isPreviousData
              }
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>loading...</p>
          ) : (
            <div>
              {/*<p>{searchQuery.data.count} results</p>*/}
              <ul className={"issues-list"}>
                {searchQuery.data.items.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    number={issue.number}
                    assignee={issue.assignee}
                    commentCount={issue.comments.length}
                    createdBy={issue.createdBy}
                    createDate={issue.createdDate}
                    status={issue.status}
                    labels={issue.labels}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
