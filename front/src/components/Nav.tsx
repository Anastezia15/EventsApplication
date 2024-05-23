import { DarkThemeToggle, Navbar } from "flowbite-react";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Nav = ({
  activeLink,
  setActiveLink,
}: {
  activeLink: number;
  setActiveLink: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const setLink = (index: number) => {
    setActiveLink(index);
  };
  return (
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
            to={"/"}
            className={({ isActive }) => [isActive ? setLink(0) : ""].join(" ")}
          >
            All Events
          </NavLink>
        </Navbar.Link>
        <Navbar.Link active={activeLink === 1}>
          <NavLink
            to={"subscriptions"}
            className={({ isActive }) => [isActive ? setLink(1) : ""].join(" ")}
          >
            Subscriptions
          </NavLink>
        </Navbar.Link>
        <Navbar.Link active={activeLink === 2}>
          <NavLink
            to={"events"}
            className={({ isActive }) => [isActive ? setLink(2) : ""].join(" ")}
          >
            My events
          </NavLink>
        </Navbar.Link>
        <Navbar.Link active={activeLink === 3}>
          <NavLink
            to={"create"}
            className={({ isActive }) => [isActive ? setLink(3) : ""].join(" ")}
          >
            Create event
          </NavLink>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
