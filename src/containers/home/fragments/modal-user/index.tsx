import { NegativeCase } from "@/components/fragments/negative-case";
import { Button } from "@/components/ui/button";
import { UserInfoLoading, RepoLoading } from "../loading";
import { ERROR, NO_DATA } from "@/constants/negative-case";
import { formatDistanceToNow } from "@/lib/date";
import type { IUserDetail, IUserRepo } from "@/types/users";
import { IconText } from "@/components/fragments/IconText";
import { useModal } from "../../hooks/useModal";
import { Overlay } from "../../../../components/fragments/overlay";

const ModalUser: React.FC<{
  login: string;
  onClose: () => void;
}> = ({ login, onClose }) => {
  const {
    data,
    repos,
    isPending,
    isPendingRepos,
    isError,
    isErrorRepos,
    refetch,
    refetchRepos,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = useModal(login);

  return (
    <Overlay onClose={onClose}>
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
      {isPending ? <UserInfoLoading /> : <UserInfo data={data!} />}
      {!!data && !isError && !isPendingRepos && <Repo
        repos={repos}
        refetch={refetchRepos}
        fetchNextPage={fetchNextPage}
        isError={isErrorRepos}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
      />}
    </Overlay>
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

const Repo: React.FC<{
  repos: IUserRepo[];
  isError: boolean;
  hasNextPage: boolean;
  isFetching: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
}> = ({
  repos, isError, refetch, fetchNextPage, hasNextPage, isFetching
}) => {
    return (
      <>
        <p className="mt-24 text-sm">Repositories</p>
        <div className="flex-1 overflow-y-auto my-8">
          {isFetching && <RepoLoading />}
          {isError && <NegativeCase
            title={ERROR.title}
            subtitle={ERROR.subtitle}
            image={ERROR.image}
            onRefresh={() => refetch()}
          />}
          {repos && !isError && !isFetching && repos.length === 0 &&
            <NegativeCase
              title={NO_DATA.title}
              subtitle={NO_DATA.subtitle}
              image={NO_DATA.image}
            />}
          {repos && repos.length > 0 && (
            <>
              {repos.map(repo => (
                <RepoItem key={repo.id} name={repo.name} description={repo.description || ""} updatedAt={repo.updated_at} />
              ))}
              {hasNextPage && !isFetching && (
                <div className='text-center mt-8'>
                  <Button variant="link" onClick={() => fetchNextPage()}>Load More</Button>
                </div>
              )}
            </>
          )}
        </div>

      </>
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
