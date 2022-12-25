export function StatusSelect({ value, onChange }) {
  const possibleStatuses = [
    { id: "backlog", label: "Backlog" },
    { id: "todo", label: "To Do" },
    { id: "inProgress", label: "In Progress" },
    { id: "done", label: "Done" },
    { id: "cancelled", label: "Cancelled" },
  ];
  return (
    <select value={value} onChange={onChange} className={"status-select"}>
      <option value="">Select status</option>
      {possibleStatuses.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
