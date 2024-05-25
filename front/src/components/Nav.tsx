import { DarkThemeToggle, Navbar } from "flowbite-react";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const Nav = ({
  activeLink,
  setActiveLink,
}: {
  activeLink: number;
  setActiveLink: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigate = useNavigate();
  const setLink = (index: number) => {
    setActiveLink(index);
  };
  const { user } = useUserStore();
  const logOut = () => {
    navigate("/auth/signin");
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <p className=" dark:text-white ">Events Application</p>
      </Navbar.Brand>
      <div className="flex items-center gap-[25px] text-center md:order-2">
        <DarkThemeToggle />
        <p onClick={logOut} className="cursor-pointer dark:text-white">
          logout
        </p>
      </div>
      {user?.role === "ROLE_USER" ? (
        <Navbar.Collapse>
          <Navbar.Link active={activeLink === 0}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                [isActive ? setLink(0) : ""].join(" ")
              }
            >
              All Events
            </NavLink>
          </Navbar.Link>
          <Navbar.Link active={activeLink === 2}>
            <NavLink
              to={"subscriptions"}
              className={({ isActive }) =>
                [isActive ? setLink(2) : ""].join(" ")
              }
            >
              Subscriptions
            </NavLink>
          </Navbar.Link>
          <Navbar.Link active={activeLink === 3}>
            <NavLink
              to={"events"}
              className={({ isActive }) =>
                [isActive ? setLink(3) : ""].join(" ")
              }
            >
              My events
            </NavLink>
          </Navbar.Link>
          <Navbar.Link active={activeLink === 4}>
            <NavLink
              to={"create"}
              className={({ isActive }) =>
                [isActive ? setLink(4) : ""].join(" ")
              }
            >
              Create event
            </NavLink>
          </Navbar.Link>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse>
          <Navbar.Link active={activeLink === 0}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                [isActive ? setLink(0) : ""].join(" ")
              }
            >
              All Events
            </NavLink>
          </Navbar.Link>
          <Navbar.Link active={activeLink === 1}>
            <NavLink
              to={"/users"}
              className={({ isActive }) =>
                [isActive ? setLink(1) : ""].join(" ")
              }
            >
              All Users
            </NavLink>
          </Navbar.Link>
          <Navbar.Link active={activeLink === 2}>
            <NavLink
              to={"catigories"}
              className={({ isActive }) =>
                [isActive ? setLink(2) : ""].join(" ")
              }
            >
              Create Category
            </NavLink>
          </Navbar.Link>
          <Navbar.Link active={activeLink === 4}>
            <NavLink
              to={"create"}
              className={({ isActive }) =>
                [isActive ? setLink(4) : ""].join(" ")
              }
            >
              Create event
            </NavLink>
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Nav;
