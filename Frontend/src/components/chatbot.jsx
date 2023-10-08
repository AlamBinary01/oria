import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const newMessage = { text: input, type: "user", timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInput("");
    setTimeout(() => {
      const botResponse = {
        text: "Hello, I am your chatbot!",
        type: "bot",
        timestamp: new Date(),
      };
      setMessages([...messages, botResponse]);
    }, 1000);
  };

  const formatTimestamp = (timestamp) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(timestamp).toLocaleString("en-US", options);
  };

  useEffect(() => {
    // Clear messages after 20 seconds
    const clearMessagesTimeout = setTimeout(() => {
      setMessages([]);
    }, 20000);

    return () => {
      clearTimeout(clearMessagesTimeout);
    };
  }, [messages]);

  return (
    <div className="bg-gray-300 h-screen flex flex-col">
      <div className="flex-grow p-10" style={{ maxHeight: "70vh" }}>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 max-w-md ${
                message.type === "user"
                  ? "bg-blue-400 text-white self-end"
                  : "bg-white self-start"
              }`}
            >
              <div>{message.text}</div>
              <div className="text-gray-500 text-sm">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        className="p-2 flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border rounded-full p-7 w-3/4"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white ml-2 px-20 py-7 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
