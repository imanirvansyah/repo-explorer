import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { UserServices } from "@/services/users";

export const useActions = () => {
  const [username, setUsername] = useState<string>('');
  const [searchId, setSearchId] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    setUsername(input.value);
    setSearchId(prev => prev + 1);
  }

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [UserServices.getUsers.key, username, searchId],
    queryFn: ({ queryKey, pageParam = 1 }) => {
      const [, username] = queryKey as [string, string];
      return UserServices.getUsers.call(username, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.total_count / 5);
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    enabled: !!username,
    refetchOnWindowFocus: false,
  });


  const allItems = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap(page => page.items ?? []);
  }, [data]);

  const totalCount = useMemo(() => {
    if (!data?.pages) return 0;
    return data.pages[0]?.total_count ?? 0;
  }, [data])


  return {
    username,
    handleSubmit,
    allItems,
    fetchNextPage,
    hasNextPage,
    isFetching,
    totalCount
  }
}
