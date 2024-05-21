import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "./store/reducers/rootReducer";
import { useCreateUserMutation } from "./store/createCategories";

function App() {
  const [createCategory] = useCreateUserMutation();
  const [activeLink, setActiveLink] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user?.firstName != "") {
      createCategory({ name: "Music", description: " " });
      createCategory({ name: "Sport", description: " " });
      createCategory({ name: "Concert", description: " " });
      createCategory({ name: "Musium", description: " " });
    } else {
      navigate("/auth/signin");
    }
  }, []);

  return (
    <>
      <div className="flex h-screen bg2 w-full flex-col gap-[25px] bg-slate-100 p-[25px] dark:bg-slate-900">
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
