import { useEffect } from "react";
import Event from "../components/Event";
import { useMyEventsStore } from "../store/myEvents.store";
import { useUserStore } from "../store/user.store";
import { getRequest } from "../api";

const SubscriptionsPage = () => {
  const { myEvents, setMyEvents } = useMyEventsStore();
  const { user } = useUserStore();
  const init = async () => {
    const getData = await getRequest({
      url: `/events/creatorId/${user.id}`,
    });
    setMyEvents(getData);
  };
  useEffect(() => {
    init();
  }, []);

  

  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">My Events</h1>
      <div className="grid grid-cols-3 gap-4 pb-[25px]">
        {myEvents.map((value) => (
          <Event
            creatorId={value.creatorId}
            id={value.id}
            title={value.title}
            imageUrl={value.imageUrl}
            description={value.description}
            date={value.date}
            location={value.location}
            time={value.time}
            category={value.category}
            my
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
