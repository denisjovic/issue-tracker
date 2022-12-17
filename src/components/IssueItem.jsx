import React from "react";
import { GoComment, GoIssueClosed, GoIssueOpened } from "react-icons/all";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";

export default function IssueItem({
  title,
  number,
  status,
  label,
  createdBy,
  commentCount,
  assignee,
  createDate,
  labels,
}) {
  return (
    <li>
      <div>
        {status === "canceled" || status === "done" ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className={"issue-content"}>
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createDate)} by {createdBy}
        </small>
      </div>
      {assignee ? <div>{assignee}</div> : null}
      <span className={"comment-count"}>
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}
