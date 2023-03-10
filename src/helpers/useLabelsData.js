import { useQuery } from "@tanstack/react-query";

export function useLabelsData() {
  const labelsQuery = useQuery(
    ["labels"],
    () =>
      fetch("/api/labels")
        .then((res) => res.json())
        .catch((err) => console.error("labelsQuery error", err)),
    { staleTime: 1000 * 60 * 60, useErrorBoundary: true }
  );
  return labelsQuery;
}
