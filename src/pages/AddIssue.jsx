import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addIssueMutation = useMutation(
    (issueBody) => {
      return fetch("/api/issues", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(issueBody),
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["issues"], { exact: true });
        queryClient.setQueryData(["issues", data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
    }
  );
  return (
    <div className="add-issue">
      <h2>Add Issue</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (addIssueMutation.isLoading) return;
          addIssueMutation.mutate({
            comment: event.target.comment.value,
            title: event.target.title.value,
          });
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Title" />
        <label htmlFor="comment">Comment</label>
        <textarea id="comment" name="comment" placeholder="Comment" />
        <button type="submit" disabled={addIssueMutation.isLoading}>
          {addIssueMutation.isLoading ? "Adding..." : "Add issue"}
        </button>
      </form>
    </div>
  );
}
