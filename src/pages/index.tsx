import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "./components/navbar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, status } = useSession();
  const [posts, setPosts] = useState([
    {
      id: "",
      mood: "0",
      text: "some text tbh",
    },
    {
      id: "2",
      mood: "1",
      text: "SDFDSFSD",
    },
    {
      id: "2",
      mood: "1",
      text: "SDFDSFSD",
    },    {
      id: "2",
      mood: "1",
      text: "SDFDSFSD",
    },    {
      id: "2",
      mood: "1",
      text: "SDFDSFSD",
    },    {
      id: "2",
      mood: "1",
      text: "SDFDSFSD",
    },
    {
      id: "2",
      mood: "1",
      text: "SDFDSFSD",
    },{
      id: "2",
      mood: "1",
      text: "SDFDSFSD",
    },
  ]);
  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-cover">
        <NavBar data={data} signOut={signOut} />
        <div className="grid grid-cols-3">
          <div className="col-start-2">
            <div className="flex flex-col outline outline-2 rounded-xl p-2 bg-white shadow-2xl">
              <div className="flex flex-row item items-center">
                <img
                  src={data.user?.image as (string | undefined)}
                  className="rounded-full h-12 w-12 object-cover"
                  alt="profile photo"
                />
                <div className="outline outline-1 rounded-full w-full flex items-center ml-2">
                  <h1 className="ml-4 font-semibold">Rate You Day: </h1>
                  <div className="ml-4 flex">
                    <button className="rounded-full h-10 w-10 m-1  focus:outline-none focus:ring-4 focus:ring-cyan-500">
                      <img
                        src={data.user?.image as (string | undefined)}
                        className="rounded-full h-10 w-10 object-cover"
                        alt="profile photo"
                      />
                    </button>
                    <button className="rounded-full h-10 w-10 m-1  focus:outline-none focus:ring-4 focus:ring-cyan-500">
                      <img
                        src={data.user?.image as (string | undefined)}
                        className="rounded-full h-10 w-10 object-cover"
                        alt="profile photo"
                      />
                    </button>                    
                    <button className="rounded-full h-10 w-10 m-1  focus:outline-none focus:ring-4 focus:ring-cyan-500">
                      <img
                        src={data.user?.image as (string | undefined)}
                        className="rounded-full h-10 w-10 object-cover"
                        alt="profile photo"
                      />
                    </button> 
                    <button className="rounded-full h-10 w-10 m-1  focus:outline-none focus:ring-4 focus:ring-cyan-500">
                      <img
                        src={data.user?.image as (string | undefined)}
                        className="rounded-full h-10 w-10 object-cover"
                        alt="profile photo"
                      />
                    </button> 
                    <button className="rounded-full h-10 w-10 m-1  focus:outline-none focus:ring-4 focus:ring-cyan-500">
                      <img
                        src={data.user?.image as (string | undefined)}
                        className="rounded-full h-10 w-10 object-cover"
                        alt="profile photo"
                      />
                    </button> 
                  </div>
                </div>
              </div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write how your day was here..."
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="w-20 text-white bg-blue-700 hover:bg-blue-800 hover:outline-none hover:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Post
                </button>
              </div>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            {posts.map((item, index) => {
              return (
              <div key={index} className="flex flex-col outline outline-2 rounded-xl p-2 bg-white shadow-2xl mb-4">
                <div className="flex flex-row item items-center">
                  <img
                    src={data.user?.image as (string | undefined)}
                    className="rounded-full h-12 w-12 object-cover"
                    alt="profile photo"
                  />
                  <div className="rounded-full w-full flex items-center ml-2">
                    name had a {item.mood} day
                  </div>
                </div>
                <div>{item.text}</div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-gradient-to-r from-pink-500 to-yellow-500">
      <div>Welcom to Share-Journals</div>
      <button
        onClick={() => signIn("google")}
        type="button"
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
