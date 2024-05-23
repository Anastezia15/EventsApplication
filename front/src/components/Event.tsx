import { Button, Card } from "flowbite-react";
import { useCreateUserMutation } from "../store/Subscribe";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";

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
}: IEvent) => {
  const [setSub] = useCreateUserMutation();
  const user = useSelector((state: RootState) => state.user);
  const handleClick = () => {
    setSub({ eventId: `${id + 1}`, userId: user.id });
  };
  
  return (
    <Card>
      <div>
        <h2 className="text-center text-[22px] dark:text-white">{title}</h2>
      </div>
      <div className="flex w-full justify-center">
        <img
          className="w-[180px] rounded border max-h-[150px] border-[#e5e7eb] dark:border-[#374151]"
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
      <Button onClick={handleClick}>Subscribe by Category</Button>
    </Card>
  );
};

export default Event;
