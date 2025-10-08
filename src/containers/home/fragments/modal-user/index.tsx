import { Icon } from "@iconify-icon/react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/ui/skeleton";
import { formatDistanceToNow } from "@/lib/date";
import { UserServices } from "@/services/users";
import type { IUserDetail } from "@/types/users";
import { ERROR, NO_DATA } from "@/constants/negative-case";
import { NegativeCase } from "@/components/fragments/negative-case";

const ModalUser: React.FC<{
  login: string;
  onClose: () => void;
}> = ({ login, onClose }) => {

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [UserServices.getUserDetail.key, login],
    queryFn: () => UserServices.getUserDetail.call(login),
    enabled: !!login
  })

  const { data: repos, isPending: isPendingRepos, isError: isErrorRepos } = useQuery({
    queryKey: [UserServices.getUserRepos.key, login],
    queryFn: () => UserServices.getUserRepos.call(login),
    enabled: !!login
  })

  return (
    <div className="fixed bottom-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-30 flex items-end backdrop-blur-sm">
      <div className="bg-background border border-muted rounded-t-2xl p-4 pt-16 h-[80vh] w-full overflow-y-hidden relative container mx-auto flex flex-col overflow-hidden">
        <Icon icon="material-symbols:close" width={16} height={16} className="absolute top-4 right-4 p-2 rounded-full cursor-pointer" onClick={() => onClose()} />
        {isError && (
          <NegativeCase
            title={ERROR.title}
            subtitle={ERROR.subtitle}
            image={ERROR.image}
            onRefresh={() => refetch()}
          />
        )}
        {!data && !isError && !isPendingRepos && <NegativeCase
          title={NO_DATA.title}
          subtitle={NO_DATA.subtitle}
          image={NO_DATA.image}
        />}

        {!!data && !isError && !isPendingRepos && (
          <>
            {isPending ? <UserInfoLoading /> : <UserInfo data={data!} />}
            <p className="mt-24 text-sm">Repositories</p>
            <div className="flex-1 overflow-y-auto my-8">
              {isPendingRepos && <RepoLoading />}
              {isErrorRepos && <NegativeCase
                title={ERROR.title}
                subtitle={ERROR.subtitle}
                image={ERROR.image}
                onRefresh={() => refetch()}
              />}
              {repos && !isErrorRepos && !isPendingRepos && repos.length === 0 &&
                <NegativeCase
                  title={NO_DATA.title}
                  subtitle={NO_DATA.subtitle}
                  image={NO_DATA.image}
                />}
              {repos && repos.length > 0 && (
                <ul>
                  {repos.map(repo => (
                    <RepoItem key={repo.id} name={repo.name} description={repo.description || ""} updatedAt={repo.updated_at} />
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ModalUser;

const UserInfo: React.FC<{ data: IUserDetail }> = ({ data }) => {
  return (
    <div>
      <div className="flex gap-3">
        <img src={data.avatar_url || ""} alt={data.avatar_url || ""} className="aspect-square object-cover w-12 h-12" />
        <div>
          <h1 className="font-semibold">{data.name}</h1>
          <p>{data.bio}</p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <IconText icon="mingcute:location-line" text={data.location || "N/A"} />
        <div className="flex gap-4">
          <IconText icon="meteor-icons:bookmark-alt" text={data.public_repos || 0} />
          <IconText icon="mynaui:users" text={data.followers || 0} />
        </div>
      </div>
    </div>
  )
}

const UserInfoLoading: React.FC = () => {
  return (
    <div>
      <div className="flex gap-3">
        <Skeleton className="w-12 h-12" />
        <div>
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-32 h-2 mt-2" />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Skeleton className="w-18 h-4" />
        <div className="flex gap-4">
          <Skeleton className="w-18 h-4" />
          <Skeleton className="w-18 h-4" />
        </div>
      </div>
    </div>
  )
}

const IconText: React.FC<{ icon: string; text: string | number }> = ({ icon, text, }) => {
  return (
    <div className="inline-flex items-center justify-between gap-0.5">
      <Icon icon={icon} width={16} height={16} className="text-gray-400" />
      <span className="text-sm text-gray-400">{text}</span>
    </div>
  )
}

const RepoItem: React.FC<{ name: string; description: string; updatedAt: string }> = ({ name, description, updatedAt }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="flex justify-between mt-4">
        <div className="flex gap-4">
          <IconText icon="mdi:star-outline" text="0" />
          <IconText icon="fe:fork" text="0" />
          <IconText icon="mdi:code-tags" text="JavaScript" />
        </div>
        <p className="text-sm text-gray-400">{formatDistanceToNow(new Date(updatedAt))}</p>
      </div>
    </div>
  )
}

const RepoLoading: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-24 mb-2" />
      ))}
    </div>
  )
}