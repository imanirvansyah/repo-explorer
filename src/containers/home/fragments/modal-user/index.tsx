import { useQuery } from "@tanstack/react-query";
import { UserServices } from "../../../../services/users";
import { Icon } from "@iconify-icon/react";
import { formatDistanceToNow } from "../../../../lib/date";
const ModalUser: React.FC<{
  login: string;
  onClose: () => void;
}> = ({ login, onClose }) => {

  const { data, isPending } = useQuery({
    queryKey: [UserServices.getUserDetail.key, login],
    queryFn: () => UserServices.getUserDetail.call(login),
    enabled: !!login
  })

  const { data: repos, isPending: isPendingRepos } = useQuery({
    queryKey: [UserServices.getUserRepos.key, login],
    queryFn: () => UserServices.getUserRepos.call(login),
    enabled: !!login
  })


  if (isPending) return <div>Loading...</div>
  if (!data) return <div>No data</div>
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-30 flex items-end backdrop-blur-sm">
      <div
        className="bg-white rounded-t-2xl p-4 pt-16 h-[80vh] w-full overflow-y-hidden relative"
      >
        <div className="absolute top-4 right-4 p-2 rounded-full cursor-pointer"
          onClick={() => onClose()}
        >
          <Icon icon="material-symbols:close" width={16} height={16} />
        </div>
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
        <p className="mt-24 text-sm">Repositories</p>
        <div className="h-full overflow-y-auto">
          {isPendingRepos && <div>Loading repos...</div>}
          {repos && repos.length === 0 && <div>No repos found</div>}
          {repos && repos.length > 0 && (
            <ul>
              {repos.map(repo => (
                <RepoItem key={repo.id} name={repo.name} description={repo.description || ""} updatedAt={repo.updated_at} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalUser;

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