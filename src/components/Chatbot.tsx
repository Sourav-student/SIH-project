"use client";
import { useState } from "react";
import Image from "next/image";

type QAType = {
  question: string;
  answer: string;
};

// Predefined questions and answers
const qaList: QAType[] = [
  { question: "What is eco-tourism?", answer: "Eco-tourism is responsible travel to natural areas that conserves the environment and improves the well-being of local people." },
  { question: "What is cultural tourism?", answer: "Cultural tourism involves experiencing the culture, heritage, and arts of a place, including traditions, rituals, and local history." },
  { question: "Which places are popular in Jharkhand?", answer: "Popular places in Jharkhand include Patratu Valley, Dassam Falls, Netarhat, Parasnath Hill, Hundru Falls, and Betla National Park." },
  { question: "Best time to visit Jharkhand?", answer: "The best time to visit Jharkhand is between October and March when the weather is pleasant and cool." },
  { question: "Where is Patratu Valley?", answer: "Patratu Valley is near Ranchi and is famous for its winding roads, hills, and a scenic dam." },
  { question: "What is unique about Netarhat?", answer: "Netarhat is called the 'Queen of Chotanagpur' and is famous for its sunrise and sunset views, hills, and natural beauty." },
  { question: "Which waterfalls can I visit in Jharkhand?", answer: "Jharkhand has many waterfalls like Hundru Falls, Dassam Falls, Jonha Falls, and Lodh Falls." },
];

export default function ChatBot() {
  const [messages, setMessages] = useState<{ type: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false); // toggle chat popup

  const handleSend = () => {
    if (!input || !input.trim()) return;

    const newMessages = [
      ...messages,
      { type: "user" as "user", text: input }
    ];

    const match = qaList.find(q =>
      q.question.toLowerCase().includes(input.toLowerCase()) ||
      input.toLowerCase().includes(q.question.toLowerCase())
    );

    const botAnswer = match
      ? match.answer
      : "Sorry, I don't have an answer for that. Please ask another question.";

    newMessages.push({ type: "bot" as "bot", text: botAnswer });

    setMessages(newMessages);
    setInput("");
  };



  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-14 right-6 bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-orange-700 transition"
        >
          <Image 
           src="/chatbot.svg"
           alt="💬"
           width={30}
           height={30}/>
        </button>
      )}

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[70vh] bg-white rounded-xl shadow-xl flex flex-col font-sans">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-orange-600 rounded-t-xl text-white">
            <h2 className="font-bold text-lg">Jharkhand Tourism Bot</h2>
            <button onClick={() => setOpen(false)} className="text-white text-xl font-bold">×</button>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-orange-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${msg.type === "user" ? "bg-orange-100 text-orange-900 ml-auto" : "bg-white text-gray-800"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex p-3 gap-2 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
