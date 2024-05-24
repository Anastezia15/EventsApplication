import { Card, DarkThemeToggle, Navbar } from "flowbite-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AuthPage = () => {
  const [activeLink, setActiveLink] = useState(0);
  const setLink = (index: number) => {
    setActiveLink(index);
  };
  return (
    <div className="relative flex h-screen w-full flex-col gap-[5px] bg-slate-100 p-[25px] bg dark:bg-slate-900">
      <Card className="relative z-[2]">
        <Navbar fluid rounded>
          <Navbar.Brand>
            <p className=" dark:text-white ">Events Application</p>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <DarkThemeToggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link active={activeLink === 0}>
              <NavLink
                to={"signin"}
                className={({ isActive }) =>
                  [isActive ? setLink(0) : ""].join(" ")
                }
              >
                Sign in
              </NavLink>
            </Navbar.Link>
            <Navbar.Link active={activeLink === 1}>
              <NavLink
                to={"signup"}
                className={({ isActive }) =>
                  [isActive ? setLink(1) : ""].join(" ")
                }
              >
                Sign up
              </NavLink>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </Card>
      <div className="relative flex h-full w-full items-center justify-center">
          <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
