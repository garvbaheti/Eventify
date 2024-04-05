import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { useAuth } from '@clerk/clerk-react'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { userId } = useAuth();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className=" sticky top-0 z-50 py-3 backdrop-blur-lg border-neutral-700/80 shadow-2xl ">
      <div className="container px-10 mx-auto relative lg:text-sm ">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
          <a href="/"><img className="size-[6rem] mr-2" src={logo} alt="Logo" /></a>
            <a href="/"><span className="text-3xl tracking-tight text-[#8A17E8] font-bold">Eventify</span></a>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 text-md">
            {navItems.map((item, index) => (
              <li key={index} className="hover:font-bold transition duration-250 ease-in-out">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <SignedOut>
              <button className="py-2 px-3 text-md border rounded-md transition duration-300 ease-in-out hover:text-white hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                <SignInButton />
              </button>
              <a href="createevent"><button className="bg-gradient-to-r bg-[#1da1f2] py-2 px-3 rounded-md text-md hover:bg-[#5656f8]">
                Create an Event
              </button></a>

            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <a href="createevent"><button className="bg-gradient-to-r bg-[#1da1f2] py-2 px-3 rounded-md text-md text-white hover:bg-[#5656f8]">
                Create an Event
              </button></a>
            </SignedIn>

          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 backdrop-blur-lg border-b bg-white/100 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4 hover:font-bold transition duration-250 ease-in-out">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
            <SignedOut>
              <button className="py-2 px-3 text-md border rounded-md transition duration-300 ease-in-out hover:text-white hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                <SignInButton />
              </button>
              <a href="createevent"><button className="bg-gradient-to-r bg-[#1da1f2] py-2 px-3 rounded-md text-md text-white hover:bg-[#5656f8]">
                Create an Event
              </button></a>

            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <a href="createevent"><button className="bg-gradient-to-r bg-[#1da1f2] py-2 px-3 rounded-md text-md hover:bg-[#5656f8]">
                Create an Event
              </button></a>
            </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>


  );
};

export default Navbar;
