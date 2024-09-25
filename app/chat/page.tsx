"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { marked } from "marked";
import { FaArrowCircleUp } from "react-icons/fa";

interface Message {
  id: number;
  data: string;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currMessage, setCurrMessage] = useState<{
    data: string;
    isUser: boolean;
  }>({ data: "", isUser: true });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseBuffer, setResponseBuffer] = useState<string>("");

  const handleOnSubmit = async () => {
    if (currMessage.data.trim() === "") return;

    const userMessage: Message = { ...currMessage, id: messages.length + 1 };
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setCurrMessage({ data: "", isUser: true });
    setResponseBuffer("");

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currMessage.data }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const ress = await res.json();
      const formattedResponse = marked(ress.data);
      const newResponse: Message = {
        id: messages.length + 2,
        data: formattedResponse as string,
        isUser: false,
      };

      setMessages((currMessages) => [...currMessages, newResponse]);
    } catch (err) {
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-[60vh] h-auto my-8 mx-4 border border-blue-700 rounded-2xl items-center justify-center ">
        <div className="chatbox overflow-y-auto  flex-grow">
          {messages.map((message) => (
            <div
               key={message.data}
               className={`flex ${message.isUser? "justify-end":"justify-start"}`}
            >
              <div
                className={`p-4 m-4 rounded-xl ${
                  message.isUser
                    ? " bg-blue-100   font-medium"
                    : " border border-green-600 font-medium  bg-green-100"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: message.data }} />
              </div>
            </div>
          ))}
          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
      </div>
      <div className="h-auto flex items-center gap-2 justify-center sticky bottom-0 p-2">
        <textarea
          wrap="soft"
          className="w-[70vw] p-2 border border-black resize-none rounded-xl"
          value={currMessage.data}
          placeholder="Ask me Anything"
          onChange={(e) =>
            setCurrMessage({ data: e.target.value, isUser: true })
          }
          aria-label="Chat message input"
        />
        <button
          type="button"
          onClick={handleOnSubmit}
          aria-label="Send message"
        >
          <FaArrowCircleUp size={30} />
        </button>
      </div>
    </>
  );
};

export default Chat;
