import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import NavBar from "./components/navbar";
import React, { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  let feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  }); 
  feed = JSON.parse(JSON.stringify(feed));
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: any[];
};
const MOODS = {
  1: {
    text: "very bad",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="Sad"
      >
        <path
          d="M9,11.71l.29-.3.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-.3-.29.3-.29A1,1,0,0,0,9.54,8.29l-.29.3L9,8.29A1,1,0,1,0,7.54,9.71l.3.29-.3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0Zm-.6,3.62a1,1,0,0,0-.13,1.4,1,1,0,0,0,1.41.13,3.76,3.76,0,0,1,4.72,0,1,1,0,0,0,1.41-.13,1,1,0,0,0-.13-1.4A5.81,5.81,0,0,0,8.36,15.33ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM17,8.29a1,1,0,0,0-1.42,0l-.29.3L15,8.29a1,1,0,0,0-1.42,1.42l.3.29-.3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l.29-.3.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-.3-.29.3-.29A1,1,0,0,0,17,8.29Z"
          fill="#d85b53"
          className="color000000 svgShape"
        ></path>
      </svg>
    ),
  },
  2: {
    text: "bad",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="Sad"
      >
        <path
          d="M8.36,15.33a1,1,0,0,0-.13,1.4,1,1,0,0,0,1.41.13,3.76,3.76,0,0,1,4.72,0,1,1,0,0,0,1.41-.13,1,1,0,0,0-.13-1.4A5.81,5.81,0,0,0,8.36,15.33ZM9,11a1,1,0,1,0-1-1A1,1,0,0,0,9,11Zm3-9A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM15,9a1,1,0,1,0,1,1A1,1,0,0,0,15,9Z"
          fill="#d87e2a"
          className="color000000 svgShape"
        ></path>
      </svg>
    ),
  },
  3: {
    text: "ok",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="Sad"
      >
        <path
          d="M9,11a1,1,0,1,0-1-1A1,1,0,0,0,9,11Zm6,3H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm0-5a1,1,0,1,0,1,1A1,1,0,0,0,15,9ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          fill="#d8a353"
          className="color000000 svgShape"
        ></path>
      </svg>
    ),
  },
  4: {
    text: "good",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="Happy"
      >
        <path
          d="M14.36,14.23a3.76,3.76,0,0,1-4.72,0,1,1,0,0,0-1.28,1.54,5.68,5.68,0,0,0,7.28,0,1,1,0,1,0-1.28-1.54ZM9,11a1,1,0,1,0-1-1A1,1,0,0,0,9,11Zm6-2a1,1,0,1,0,1,1A1,1,0,0,0,15,9ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          fill="#6cc082"
          className="color000000 svgShape"
        ></path>
      </svg>
    ),
  },
  5: {
    text: "fantastic",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="Happy"
      >
        <path
          d="M14.36,14.23a3.76,3.76,0,0,1-4.72,0,1,1,0,0,0-1.28,1.54,5.68,5.68,0,0,0,7.28,0,1,1,0,1,0-1.28-1.54ZM9.21,10.54a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41,3.08,3.08,0,0,0-4.24,0,1,1,0,1,0,1.41,1.41A1,1,0,0,1,9.21,10.54Zm8.41-1.41a3.08,3.08,0,0,0-4.24,0,1,1,0,0,0,1.41,1.41,1,1,0,0,1,1.42,0,1,1,0,0,0,1.41,0A1,1,0,0,0,17.62,9.13ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          fill="#34a853"
          className="color000000 svgShape"
        ></path>
      </svg>
    ),
  },
};

export const Home: React.FC<Props> = (props) => {
  const { data, status } = useSession();
  const [mood, setMood] = useState(3);
  const [content, setContent] = useState<string | undefined>();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const createPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { content: content, mood: mood, email: data.user.email };
      await fetch("/api/post", {
        method: "POST",
        headers: {},
        body: JSON.stringify(body),
      });
      console.log(posts);
      setPosts([...posts, {
        author: {name: data.user?.name, image: data.user?.image },
        authorId: "temp",
        content: content,
        mood: 3,
        published: true
      }])
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    setPosts(props.feed);
  }, [props.feed])
  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-cover min-h-screen">
        <NavBar data={data} signOut={signOut} />
        <div className="grid grid-cols-3">
          <div className="col-start-2">
            <div className="flex flex-col outline outline-2 rounded-xl p-2 bg-white shadow-2xl">
              <div className="flex flex-row item items-center">
                <picture>
                  <img
                    src={data.user?.image as string | undefined}
                    className="rounded-full h-12 w-12 object-cover"
                    alt="profile photo"
                  />
                </picture>
                <div className="outline outline-1 rounded-full w-full flex items-center ml-2">
                  <h1 className="ml-4 font-semibold">Rate You Day: </h1>
                  <div className="ml-4 flex">
                    <button
                      className={`rounded-full h-10 w-10 m-1 ${mood == 1 ? "ring-4 ring-cyan-500" : ""} focus:outline-none focus:ring-4 focus:ring-cyan-500`}
                      onClick={() => setMood(1)}
                    >
                      {MOODS[1].svg}
                    </button>
                    <button
                      className={`rounded-full h-10 w-10 m-1 ${mood == 2 ? "ring-4 ring-cyan-500" : ""} focus:outline-none focus:ring-4 focus:ring-cyan-500`}
                      onClick={() => setMood(2)}
                    >
                      {MOODS[2].svg}
                    </button>
                    <button
                      className={`rounded-full h-10 w-10 m-1 ${mood == 3 ? "ring-4 ring-cyan-500" : ""} focus:outline-none focus:ring-4 focus:ring-cyan-500`}
                      onClick={() => setMood(3)}
                    >
                      {MOODS[3].svg}
                    </button>
                    <button
                      className={`rounded-full h-10 w-10 m-1 ${mood == 4 ? "ring-4 ring-cyan-500" : ""} focus:outline-none focus:ring-4 focus:ring-cyan-500`}
                      onClick={() => setMood(4)}
                    >
                      {MOODS[4].svg}
                    </button>
                    <button
                      className={`rounded-full h-10 w-10 m-1 ${mood == 5 ? "ring-4 ring-cyan-500" : ""} focus:outline-none focus:ring-4 focus:ring-cyan-500`}
                      onClick={() => setMood(5)}
                    >
                      {MOODS[5].svg}
                    </button>
                  </div>
                </div>
              </div>
              <form onSubmit={createPost}>
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
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                  }
                  value={content}
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-20 text-white bg-blue-700 hover:bg-blue-800 hover:outline-none hover:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            {posts
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col outline outline-2 rounded-xl p-2 bg-white shadow-2xl mb-4"
                  >
                    <div className="flex flex-row item items-center">
                      <picture>
                        <img
                          src={item.author.image as string | undefined}
                          className="rounded-full h-12 w-14 object-cover"
                          alt="profile photo"
                        />
                      </picture>
                      <div
                        className="rounded-full w-full flex flex-col items-center ml-2"
                        onClick={() => console.log(item)}
                      >
                        <h1 className=" font-semibold">{item.author.name} had a {MOODS[item.mood].text} day</h1>
                        <h1>{new Date(item.createdAt).toDateString()}</h1>
                      </div>
                      <div className="w-12 h-12">
                      {MOODS[item.mood].svg}
                      </div>
                    </div>
                    <div><h1 className="font-semibold">Summary: </h1>{item.content}</div>
                  </div>
                );
              })
              .reverse()}
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
};
export default Home;
