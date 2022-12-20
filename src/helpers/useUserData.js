import { useQuery } from "@tanstack/react-query";

export function useUserData(userId) {
  const userData = useQuery(["users", userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );
  return userData;
}
