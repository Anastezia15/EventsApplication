import Event from "../components/Event";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";
import { useEffect } from "react";
import { useCreateUserMutation } from "../store/getEvent";

const EventsPage = () => {
  const [getEnetes] = useCreateUserMutation();

  const evets = useSelector((state: RootState) => state.event);
  useEffect(() => {
    getEnetes([]);
  }, []);
  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">All Events</h1>
      <div className="grid grid-cols-3 gap-4 pb-[25px]">
        {evets.map((value, index) => (
          <Event
          creatorId={value.creatorId}

            id={index}
            title={value.title}
            imageUrl={value.imageUrl}
            description={value.description}
            date={value.date}
            location={value.location}
            time={value.time}
            category={value.category}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
