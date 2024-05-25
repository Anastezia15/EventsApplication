import { useEffect } from "react";
import User from "../components/User";
import { useAllUsersStore } from "../store/allUsers.store";
import { getRequest } from "../api";

const AllUsersPage = () => {
  "users/admin";
  const { allUsers, setUser } = useAllUsersStore();
  const init = async () => {
    const getData = await getRequest({ url: `/users/admin` });
    setUser(getData);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">All Users</h1>
      <div className="grid grid-cols-3 gap-4 pb-[25px]">
        {allUsers.map((user) => (
          <User username={user.username} id={user.id} />
        ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
