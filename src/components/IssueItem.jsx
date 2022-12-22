import React from "react";
import { GoComment, GoIssueClosed, GoIssueOpened } from "react-icons/all";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";
import { Label } from "./Label";

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
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);

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
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createDate)}{" "}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ""}
        </small>
      </div>
      {assignee ? (
        <img
          src={
            assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ""
          }
          className="assigned-to"
          alt={`Assigned to ${
            assigneeUser.isSuccess ? assigneeUser.data.name : "avatar"
          }`}
        />
      ) : null}
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
