import { Button, Card } from "flowbite-react";
import { useUserStore } from "../store/user.store";
import { postRequest } from "../api";

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
}: IEvent) => {
  const { user } = useUserStore();
  const handleClick = async () => {
    await postRequest({
      url: `/users/subscribe/${creatorId}/${id + 1}`,
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
      {user.role === "ROLE_USER" && (
        <Button onClick={handleClick}>Subscribe </Button>
      )}
    </Card>
  );
};

export default Event;
