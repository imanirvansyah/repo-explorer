import { useState } from "react";
import type { IUser } from "../../../../types/users";

const ItemUser: React.FC<{
  data: IUser;
  onClick: () => void;
}> = ({ data, onClick }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div style={{
      cursor: "pointer"
    }}
      onClick={() => {
        setToggle(!toggle)
        onClick()
      }}
    >
      <p>{data.login}</p>
    </div >
  )
}

export default ItemUser;