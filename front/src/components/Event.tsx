import { Button, Card } from "flowbite-react";
import { useUserStore } from "../store/user.store";
import { deleteRequest, patchRequest, postRequest } from "../api";

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
}: IEvent) => {
  const { user } = useUserStore();
  const handleClick = async () => {
    await postRequest({
      url: `/users/subscribe/${creatorId}/${id + 1}`,
    });
  };
  const deleteClick = async () => {
    await deleteRequest({
      url: `/events/${id + 1}`,
    });
  };

  const unSubClick = async () => {
    await patchRequest({
      url: `/events/unsubscribe/${id + 1}/${creatorId}`,
    });
  };
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
      </div>
      {my && <Button onClick={unSubClick}>Unsubscribe</Button>}
      {my && <Button onClick={deleteClick}>Delete</Button>}
      {user.role === "ROLE_USER" && !my && (
        <Button onClick={handleClick}>Subscribe</Button>
      )}
    </Card>
  );
};

export default Event;
