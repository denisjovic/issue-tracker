import { possibleStatus } from "../helpers/defaultData";
import { useUserData } from "../helpers/useUserData";
import { GoIssueClosed, GoIssueOpened } from "react-icons/all";
import { relativeDate } from "../helpers/relativeDate";

export function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  comments,
  createdDate,
}) {
  const statusObject = possibleStatus.find((pStatus) => pStatus.id === status);
  const createdUser = useUserData(createdBy);
  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span
          className={
            status === "done" || status === "cancelled" ? "closed" : "open"
          }
        >
          {status === "canceled" || status === "done" ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObject.label}
        </span>
        <span className={"created-by"}>
          {createdUser.isLoading ? "..." : createdUser.data?.name}
        </span>{" "}
        opened this issue {relativeDate(createdDate)} - {comments.length}{" "}
        comments
      </div>
    </header>
  );
}
