import { Button, Card } from "flowbite-react";
import { IUser, useUserStore } from "../store/user.store";
import { deleteRequest, getRequest, patchRequest, postRequest } from "../api";
import { useEffect, useState } from "react";

export interface IEvent {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
  location: string;
  time: string;
  category: {
    name: string;
    id: number;
  };
  creatorId: string;
  my?: boolean;
  sub?: boolean;
}

const Event = ({
  id,
  title,
  imageUrl,
  description,
  date,
  location,
  category,
  time,
  creatorId,
  my,
  sub,
}: IEvent) => {
  const { user } = useUserStore();

  const [subs, setSubs] = useState<IUser[]>([]);
  const handleClick = async () => {
    await postRequest({
      url: `/users/subscribe/${user.id}/${id}`,
    });
  };
  const deleteClick = async () => {
    await deleteRequest({
      url: `/events/${id}`,
    });
    window.location.reload();

  };

  const unSubClick = async () => {
    await patchRequest({
      url: `/events/unsubscribe/${id}/${user.id}`,
    });
    window.location.reload();
  };
  const init = async () => {
    if (my) {
      const data = await getRequest({
        url: `/events/subscribers/${id}`,
      });
      setSubs(data);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Card>
      <div>
        <h2 className="text-center text-[22px] dark:text-white">{title}</h2>
      </div>
      <div className="flex w-full justify-center">
        <img
          className="max-h-[150px] w-[180px] rounded border border-[#e5e7eb] dark:border-[#374151]"
          src={imageUrl}
          alt="image"
        />
      </div>
      <div>
        <h2 className="text-center text-[20px] dark:text-white">
          {description}
        </h2>
        <h2 className="text-center text-[20px] dark:text-white">
          Date: {date} Time: {time}
        </h2>
        <h2 className="text-center text-[20px] dark:text-white">
          Location: {location}
        </h2>
        <h2 className="text-center text-[20px] dark:text-white">
          Category: {category.name}
        </h2>
        {my && (
          <h3 className="text-center text-[15px] dark:text-white">
            Subscribers:{" "}
            {subs.map((user) => (
              <p>{user.username}</p>
            ))}
          </h3>
        )}
      </div>
      {sub && <Button onClick={unSubClick}>Unsubscribe</Button>}
      {my && <Button onClick={deleteClick}>Delete</Button>}
      {user.role === "ROLE_USER" && !my && !sub && (
        <Button onClick={handleClick}>Subscribe</Button>
      )}
    </Card>
  );
};

export default Event;
