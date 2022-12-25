import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";
import { useState } from "react";

export default function IssuesList({ labels, status }) {
  const [searchValue, setSearchValue] = useState("");
  const issuesQuery = useQuery(["issues-list", { labels, status }], () => {
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    const statusString = status ? `status=${status}` : "";
    return fetch(`/api/issues?${labelsString}${statusString}`)
      .then((res) => res.json())
      .catch((err) => console.error("issuesQuery error", err));
  });
  const { data, isLoading, isError } = issuesQuery;
  if (isError) return <p>Something went wrong: {issuesQuery.error.message}</p>;

  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`)
        .then((res) => res.json())
        .catch((err) => console.error("searchQuery error", err)),
    { enabled: searchValue.length > 0 }
  );

  console.log("searchQuery", searchQuery.data);
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
      {isLoading ? (
        <p>loading...</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
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
