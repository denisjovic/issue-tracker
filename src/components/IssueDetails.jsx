import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IssueHeader } from "./IssueHeader";
import { useUserData } from "../helpers/useUserData";
import { relativeDate } from "../helpers/relativeDate";

function useIssueData(issueNumber) {
  return useQuery(["issue", issueNumber], () => {
    return fetch(`/api/issues/${issueNumber}`).then((res) =>
      res.json().catch((err) => console.error("useIssueData query error", err))
    );
  });
}

function useIssueComments(issueNumber) {
  return useQuery(["issues", issueNumber, "comments"], () => {
    return fetch(`/api/issues/${issueNumber}/comments`)
      .then((res) => res.json())
      .catch((err) => console.error("useIssueComments query error", err));
  });
}

function Comment({ comment, createdBy, createdDate }) {
  const userQuery = useUserData(createdBy);
  if (userQuery.isLoading)
    return (
      <div className={"comment"}>
        <div className={"comment-header"}>Loading...</div>
      </div>
    );
  return (
    <div className={"comment"}>
      <img
        src={userQuery.data.profilePictureUrl}
        alt={"Commenter avatar image"}
      />
      <div>
        <div className={"comment-header"}>
          <span className={"comment-author"}>{userQuery.data.name}</span>{" "}
          commented <span>{relativeDate(createdDate)}</span>
        </div>
        <div className={"comment-body"}>{comment}</div>
      </div>
    </div>
  );
}

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  const { data, isLoading, isError } = issueQuery;
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = commentsQuery;

  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>Something went wrong: {issueQuery.error.message}</p>;

  if (commentsLoading) return <p>loading...</p>;
  if (commentsError)
    return <p>Something went wrong: {commentsQuery.error.message}</p>;

  return (
    <div className={"issue-details"}>
      <IssueHeader {...data} />
      <main>
        <section>
          <h3>Comments</h3>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </section>
        <aside></aside>
      </main>
    </div>
  );
}
