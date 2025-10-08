import { useState } from "react";
import type { IUser } from "@/types/users";

const ItemUser: React.FC<{
  data: IUser;
  onClick: () => void;
}> = ({ data, onClick }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-2 border border-muted rounded cursor-pointer hover:border-2"
      onClick={() => {
        setToggle(!toggle)
        onClick()
      }}
    >
      <img src={data.avatar_url || ""} alt={data.avatar_url || "avatar image"} width={150} height={150} className="object-cover w-full" />
      <p>{data.login}</p>
    </div >
  )
}

export default ItemUser;