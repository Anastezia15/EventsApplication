import Event from "../components/Event";
import { useEffect } from "react";
import { useAllEventsStore } from "../store/allEvents.store";
import { getRequest } from "../api";
import { Spinner } from "flowbite-react";

const EventsPage = () => {
  const { allEvents, setAllEvents } = useAllEventsStore();
  const init = async () => {
    const getData = await getRequest({ url: "/events/admin" });
    setAllEvents(getData);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">All Events</h1>
      {allEvents.length != 0 ? (
        <div className="grid grid-cols-3 gap-4 pb-[25px]">
          {allEvents.map((value, index) => (
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
            />
          ))}
        </div>
      ) : (
        <Spinner color="info" aria-label="Info spinner example" size="xl" />
      )}
    </div>
  );
};

export default EventsPage;
