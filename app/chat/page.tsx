"use client";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import { marked } from "marked";
import { FaArrowCircleUp } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, currentUser } = useAuth();

  const chatEndRef = useRef<HTMLDivElement>(null);  // Reference for auto-scroll

  // Scroll to bottom whenever the messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);  // Trigger when messages state changes

  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    // Add user's message
    const userMessage: Message = {
      id: uuidv4(),
      content: trimmedMessage,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://oneai-backend.onrender.com/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const responseData = await res.json();
      const formattedContent = await marked(responseData.response ?? "No response");

      const botMessage: Message = {
        id: uuidv4(),
        content: formattedContent,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center h-screen text-2xl font-bold">
          Please login to access the chat.
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-[60vh] h-auto m-8 border border-blue-700 rounded-2xl items-center justify-center">
        <div className="chatbox flex-grow w-full">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-4 m-4 rounded-xl font-medium ${
                  msg.isUser
                    ? "bg-blue-100"
                    : "bg-green-100 border border-green-600"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              </div>
            </div>
          ))}
          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
        <div ref={chatEndRef} />  {/* Empty div to act as the scroll target */}
      </div>

      <div className="h-auto flex items-center gap-2 justify-center sticky bottom-0 p-2">
        <textarea
          wrap="soft"
          className="w-[70vw] p-2 border border-black resize-none rounded-xl"
          value={inputMessage}
          placeholder="Ask me anything..."
          onChange={(e) => setInputMessage(e.target.value)}
          aria-label="Chat message input"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          aria-label="Send message"
        >
          <FaArrowCircleUp size={30} />
        </button>
      </div>
    </>
  );
};

export default Chat;
