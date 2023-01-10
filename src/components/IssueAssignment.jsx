import { useUserData } from "../helpers/useUserData";
import { GoGear } from "react-icons/all";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function IssueAssignment({ assignee, issueNumber }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useUserData(assignee);
  const getAllUsersQuery = useQuery(["users"], () =>
    fetch("api/users").then((res) => res.json())
  );
  return (
    <div className="issue-options">
      <div>
        <span>Assignment</span>
        {user.isSuccess && (
          <div>
            <img
              src={user.data.profilePictureUrl}
              alt={`${user.data.name} profile image`}
            />
            {user.data.name}{" "}
          </div>
        )}
        <GoGear
          onClick={() => !getAllUsersQuery.isLoading && setMenuOpen(true)}
        />
      </div>
    </div>
  );
}
