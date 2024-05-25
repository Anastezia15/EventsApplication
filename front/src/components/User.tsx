import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { deleteRequest } from "../api";

const User = ({ username, id }: { username: string; id: string }) => {
  const navigate = useNavigate();
  const deleteClick = () => {
    deleteRequest({ url: `/users/admin/${id}` });
    window.location.reload();
  };
  const editClick = () => {
    navigate(`${username}`);
  };
  return (
    <Card>
      <div className="flex gap-[15px] dark:text-white">
        <h2>{username}</h2>
        <p className="cursor-pointer text-green-500" onClick={editClick}>
          Edit
        </p>
        <p className="cursor-pointer text-red-500" onClick={deleteClick}>
          Delete
        </p>
      </div>
    </Card>
  );
};

export default User;
