import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { useUserStore } from "./store/user.store";
import { useAllEventsStore } from "./store/allEvents.store";

function App() {
  const [activeLink, setActiveLink] = useState(0);
  const navigate = useNavigate()
  const { user } = useUserStore();
  useEffect(() => {
    if (user) {
      

    }
    else{
      navigate('/auth/signin')
    }
  }, []);

  return (
    <>
      <div className="bg2 flex h-screen w-full flex-col gap-[25px] bg-slate-100 p-[25px] dark:bg-slate-900">
        <Nav activeLink={activeLink} setActiveLink={setActiveLink} />
        <div className="flex  max-h-[90%] w-full items-center justify-center">
          <Card className="flex h-full min-h-[80vh] w-full overflow-auto">
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
