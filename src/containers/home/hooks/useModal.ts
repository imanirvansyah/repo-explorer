import { UserServices } from "@/services/users";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useModal = (login: string) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [UserServices.getUserDetail.key, login],
    queryFn: () => UserServices.getUserDetail.call(login),
    enabled: !!login
  })

  const { data: repos, isPending: isPendingRepos, isError: isErrorRepos, refetch: refetchRepos, isFetching, fetchNextPage, hasNextPage, } = useInfiniteQuery({
    queryKey: [UserServices.getUserRepos.key, login],
    queryFn: ({ queryKey, pageParam = 1 }) => {
      const [, login] = queryKey as [string, string];
      return UserServices.getUserRepos.call(login, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      if (data) {
        const maxPages = Math.ceil(data?.public_repos / 30);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      }
      return undefined
    },
    enabled: !!login && !!data,
    refetchOnWindowFocus: false,
  });

  const allItems = useMemo(() => {
    if (!repos?.pages) return [];
    return repos.pages.flatMap(page => page ?? []);
  }, [repos]);

  return {
    data,
    repos: allItems,
    isPending,
    isPendingRepos,
    isError,
    isErrorRepos,
    refetch,
    refetchRepos,
    fetchNextPage,
    hasNextPage,
    isFetching
  }
}