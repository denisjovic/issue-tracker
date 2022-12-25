import { useQuery } from "@tanstack/react-query";
import IssueItem from "./IssueItem";

export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(["issues-list", { labels, status }], () => {
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    const statusString = status ? `status=${status}` : "";
    return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
      res.json()
    );
  });
  const { data, isLoading, isError } = issuesQuery;
  if (isError) return <p>Something went wrong: {issuesQuery.error.message}</p>;
  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>loading...</p>
      ) : (
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
      )}
    </div>
  );
}
