import { useEffect, useState } from "react";
import Link from "next/link";
import pb from "@/lib/pocketbase";

export default function Header() {
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (pb.authStore.isValid) {
      setIsValid(true);
    }else{
      setIsValid(false);
    }
  }, [pb.authStore]);

  function disconnect() {
    pb.authStore.clear();
    window.location.href = "/";
   }
   
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap  py-4 lg:px-12 shadow border-solid bg-[#b3f0a2] ">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <Link
            href={"/"}
            className="flex items-center flex-shrink-0 text-gray-800 mr-16"
          >
            <span className="font-semibold text-xl tracking-tight">
              TicketApp
            </span>
          </Link>
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="menu   flex-menu w-full  flex-grow lg:flex px-8grow lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="text-md font-bold text-blue-700 lg:flex-grow">
            <a
              href="/"
              className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Bus
            </a>
          </div>

          <div className="relative mx-auto text-gray-600 lg:block hidden">
            <button
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-2"
            ></button>
          </div>
          {!isValid ? (
            <div className="flex float-right  ">
              <Link href="/auth/register">
                <span className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">
                  Register
                </span>
              </Link>

              <Link href="/auth/login">
                <span className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0">
                  Login
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <button className="flex flex-col text-black items-center ">
                {pb.authStore?.model?.email}
                <b>Welcome</b>
              </button>
              <button onClick={disconnect}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 hover:text-gray-500 transition-colors"
                  viewBox="0 0 512 512"
                >
                  <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
