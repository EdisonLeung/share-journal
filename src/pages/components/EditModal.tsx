import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MOODS } from "..";
import { Router, useRouter } from "next/router";

export default function EditModal({ isOpen, setIsOpen, post }) {
  const [mood, setMood] = useState(post.mood);
  const [content, setContent] = useState<string | undefined>(post.content);
  const router = useRouter();
  function closeModal() {
    setIsOpen(false);
  }

  async function updatePost(
    id: string,
    mood: number,
    content: string
  ): Promise<void> {
    const body = { mood: mood, content: content };
    await fetch(`/api/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    await router.push("/");
    closeModal();
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white border text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col rounded-xl outline outline-2 p-2 bg-white shadow-2xl">
                  <div className="flex flex-row item items-center">
                    <div className="outline outline-1 rounded-full w-full flex items-center ml-2">
                      <h1 className="ml-4 font-semibold">Rate You Day: </h1>
                      <div className="ml-4 flex">
                        <button
                          className={`rounded-full h-10 w-10 m-1 ${
                            mood == 1 ? "ring-4 ring-cyan-500" : ""
                          }`}
                          onClick={() => setMood(1)}
                        >
                          {MOODS[1].svg}
                        </button>
                        <button
                          className={`rounded-full h-10 w-10 m-1 ${
                            mood == 2 ? "ring-4 ring-cyan-500" : ""
                          }`}
                          onClick={() => setMood(2)}
                        >
                          {MOODS[2].svg}
                        </button>
                        <button
                          className={`rounded-full h-10 w-10 m-1 ${
                            mood == 3 ? "ring-4 ring-cyan-500" : ""
                          }`}
                          onClick={() => setMood(3)}
                        >
                          {MOODS[3].svg}
                        </button>
                        <button
                          className={`rounded-full h-10 w-10 m-1 ${
                            mood == 4 ? "ring-4 ring-cyan-500" : ""
                          }`}
                          onClick={() => setMood(4)}
                        >
                          {MOODS[4].svg}
                        </button>
                        <button
                          className={`rounded-full h-10 w-10 m-1 ${
                            mood == 5 ? "ring-4 ring-cyan-500" : ""
                          }`}
                          onClick={() => setMood(5)}
                        >
                          {MOODS[5].svg}
                        </button>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={() => updatePost(post.id, mood, content)}>
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
                        type="button"
                        className="w-20 text-white bg-red-700 hover:outline-none hover:ring-4 ring-red-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mt-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-20 text-white bg-green-700 hover:outline-none hover:ring-4 ring-green-600 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mt-2"
                        onClick={() => updatePost(post.id, mood, content)}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
