import { useState } from "react";
import { ExternalLink, Menu, XIcon } from "lucide-react";
import { Button } from "@headlessui/react";
import { NavLink } from "react-router";
import { LINKS } from "../utils/config";
import logo from "/logo.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full py-10">
      <NavLink to="/">
        <img
          src={logo}
          width={75}
          height={75}
          alt="hocvnu"
          className="w-[75px] pt-2"
        />
      </NavLink>
      <ul className="items-center justify-end flex-1 hidden gap-5 font-bold list-none sm:flex">
        <li>
          <NavLink
            style={({ isActive, isTransitioning }) => {
              return {
                color: isActive ? "#f7b136" : "",
                viewTransitionName: isTransitioning ? "slide" : "",
              };
            }}
            to="/"
          >
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive, isTransitioning }) => {
              return {
                color: isActive ? "#f7b136" : "",
                viewTransitionName: isTransitioning ? "slide" : "",
              };
            }}
            to="/practice"
          >
            Ôn tập
          </NavLink>
        </li>
        <li>
          <a href={LINKS.feedbackForm} target="_blank">
            Đóng góp
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="https://github.com/betothewizard/hocvnu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
          >
            @betothewizard <ExternalLink size={14} />
          </a>
        </li>
      </ul>

      <div className="flex items-center justify-end sm:hidden">
        <Button
          onClick={() => setToggle((t) => !t)}
          className="transition-transform duration-200 ease-in-out hover:scale-110"
        >
          {toggle ? <XIcon /> : <Menu />}
        </Button>
        <div
          className={`absolute right-0 top-24 mx-4 my-2 min-w-[150px] transform rounded-xl border-2 bg-gradient-to-br from-zinc-200 to-zinc-100 p-6 transition-all duration-300 ease-in-out ${toggle ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"} origin-top-right`}
        >
          <ul className="flex flex-col items-center justify-end flex-1 gap-5 font-bold list-none">
            <li className="w-full transition-all duration-200 ease-in-out">
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    color: isActive ? "#f7b136" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/"
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="w-full transition-all duration-200 ease-in-out">
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    color: isActive ? "#f7b136" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/practice"
              >
                Ôn tập
              </NavLink>
            </li>
            <li className="w-full transition-all duration-200 ease-in-out">
              <a href={LINKS.feedbackForm} target="_blank">
                Đóng góp
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://github.com/betothewizard/hocvnu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                @betothewizard <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
