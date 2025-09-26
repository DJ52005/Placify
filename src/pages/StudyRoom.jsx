import { useState, useEffect } from "react";

function StudyRoom() {
  // Timer state
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 min default
  const [isRunning, setIsRunning] = useState(false);

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { user: "System", text: "Welcome to the Study Room!" },
  ]);

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Format mm:ss
  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle chat submit
  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { user: "You", text: chatInput }]);
    setChatInput("");
  };

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold mb-6">📚 Study Room</h1>

        {/* Timer */}
        <div className="bg-white/10 rounded-xl shadow-lg p-10 text-center">
          <h2 className="text-6xl font-mono mb-6">{formatTime(secondsLeft)}</h2>
          <div className="space-x-4">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600"
              >
                ▶ Start
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="px-6 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                ⏸ Pause
              </button>
            )}
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(25 * 60);
              }}
              className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar (Chat + Participants) */}
      <div className="w-80 bg-black/40 border-l border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">👥 Participants</h2>
          <ul className="mt-2 space-y-1 text-sm text-gray-300">
            <li>✅ You</li>
            <li>📖 Alice</li>
            <li>💻 Bob</li>
          </ul>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          <h2 className="text-lg font-semibold mb-2">💬 Chat</h2>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg ${
                msg.user === "You" ? "bg-purple-600 self-end" : "bg-gray-700"
              }`}
            >
              <strong>{msg.user}: </strong>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat input */}
        <form onSubmit={sendMessage} className="p-4 border-t border-white/10 flex">
          <input
            type="text"
            className="flex-1 rounded-lg px-3 py-2 text-black"
            placeholder="Type a message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudyRoom;
