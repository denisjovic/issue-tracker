import { useLabelsData } from "../helpers/useLabelsData";
import React from "react";

export function Label({ label }) {
  const labelQuery = useLabelsData();
  if (labelQuery.isLoading) return null;
  const labelObj = labelQuery.data.find((l) => l.id === label);
  if (!labelObj) return null;
  return <span className={`label ${labelObj.color}`}>{labelObj.name}</span>;
}
