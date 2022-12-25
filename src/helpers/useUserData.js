import { useQuery } from "@tanstack/react-query";

export function useUserData(userId) {
  if (!userId) return;
  const userData = useQuery(["users", userId], () =>
    fetch(`/api/users/${userId}`).then((res) =>
      res.json().catch((err) => console.error("userData query error", err))
    )
  );
  return userData;
}
