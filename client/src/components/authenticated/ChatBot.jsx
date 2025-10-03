import React, { useState, useEffect, useRef } from "react";
import { useChatBot, useGetChatBotMessages } from "../../hooks/aiHooks";
import { Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {motion} from "framer-motion";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const { getChatBotMessages, loading: loadingHistory } =
    useGetChatBotMessages();
  const { chatBot, loading: sending } = useChatBot();

  const toggleChat = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const { success } = await getChatBotMessages();
      if (success) setChatHistory(success);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMessage = message;
    setChatHistory((prev) => [...prev, { role: "user", message: userMessage }]);
    setMessage("");
    const { success } = await chatBot(userMessage);
    if (success)
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", message: success },
      ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
      >
        {isOpen ? <X size={24} /> : "💬"}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
              <span>Chat Bot</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
              {loadingHistory ? (
                <p className="text-gray-500 text-sm">Loading chat...</p>
              ) : chatHistory.length ? (
                chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl max-w-[70%] break-words ${
                      msg.role === "user"
                        ? "bg-blue-100 text-blue-800 self-end"
                        : "bg-gray-100 text-gray-800 self-start"
                    }`}
                  >
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No messages yet.</p>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition flex items-center"
                disabled={sending}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
