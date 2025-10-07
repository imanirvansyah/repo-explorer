import { useQuery } from "@tanstack/react-query";
import { UserServices } from "../../../../services/users";
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
    <div style={{ backgroundColor: "rgba(0,0,0,0.3)", position: "absolute", bottom: 0, left: 0, width: "100vw", height: "100vh", overflow: "auto", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "0px",
          width: "100%",
          position: "relative",
        }}
      >
        <p style={{
          position: "absolute",
          top: 10,
          right: 10,
          cursor: "pointer",
        }}
          onClick={() => onClose()}
        >x</p>
        <h1>{data.name}</h1>
        <p>repo list</p>
        {isPendingRepos && <div>Loading repos...</div>}
        {repos && repos.length === 0 && <div>No repos found</div>}
        {repos && repos.length > 0 && (
          <ul>
            {repos.map(repo => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ModalUser;