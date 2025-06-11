"use client";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import { marked } from "marked";
import { HiPaperAirplane, HiUser, HiSparkles } from "react-icons/hi2";
import { BsRobot } from "react-icons/bs";
import { FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

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

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputMessage]);

  // Scroll to bottom whenever the messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || loading) return;

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <NavBar />
        <div className="flex items-center justify-center min-h-[80vh] px-8">
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-200 shadow-2xl max-w-md mx-auto">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiLock className="text-white" size={32} />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Authentication Required
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Please log in to start chatting with our AI assistant and unlock the full potential of OneAI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <FiUser size={18} />
                    Login
                  </button>
                </Link>
                
                <Link href="/signup">
                  <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full font-medium transition-all duration-300 border border-gray-200 hover:border-gray-300">
                    Create Account
                    <FiArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NavBar />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
              <BsRobot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OneAI Assistant
              </h1>
              <p className="text-gray-600">Always here to help you</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white/60 backdrop-blur-sm border-x border-gray-200 min-h-[60vh] max-h-[60vh] overflow-y-auto chatbox">
          <div className="p-6 space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiSparkles className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to OneAI!</h3>
                <p className="text-gray-600">Start a conversation and experience the power of AI assistance.</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 message-enter ${msg.isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.isUser 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}>
                  {msg.isUser ? (
                    <HiUser className="text-white" size={20} />
                  ) : (
                    <BsRobot className="text-white" size={20} />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-[80%] ${msg.isUser ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`p-4 rounded-2xl ${
                    msg.isUser
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                  }`}>
                    {msg.isUser ? (
                      <p className="leading-relaxed">{msg.content}</p>
                    ) : (
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: msg.content }} 
                      />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-2">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Message */}
            {loading && (
              <div className="flex gap-4 message-enter">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <BsRobot className="text-white" size={20} />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-gray-500 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white/80 backdrop-blur-sm rounded-b-3xl border border-gray-200 p-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="w-full p-4 pr-12 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 min-h-[56px] max-h-32"
                value={inputMessage}
                placeholder="Type your message here..."
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                rows={1}
              />
            </div>
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={loading || !inputMessage.trim()}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-400 text-white p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              <HiPaperAirplane size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
