import { useEffect } from "react";
import Event from "../components/Event";
import { useAllSubsStore } from "../store/allSubs.store";
import { useUserStore } from "../store/user.store";
import { getRequest } from "../api";

const SubscriptionsPage = () => {
  const { allSubs, setSubEvents } = useAllSubsStore();
  const { user } = useUserStore();
  const init = async () => {
    const getData = await getRequest({
      url: `/events/user_subscriptions/${user.id}`,
    });
    setSubEvents(getData);
  };
  useEffect(() => {
    init()
  }, []);

  return (
    <div className="flex h-full w-full flex-col  items-center justify-start gap-[25px]">
      <h1 className=" text-center text-[25px] dark:text-white">
        Subscriptions
      </h1>
      <div className="grid grid-cols-3 gap-4 pb-[25px]">
        {allSubs.map((value, index) => (
          <Event
            key={index}
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

export default SubscriptionsPage;
