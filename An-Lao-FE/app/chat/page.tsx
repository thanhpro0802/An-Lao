"use client";

import { useState, useRef, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { Send, Bot, User, Sparkles, Building2, ArrowLeft, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { facilityId: number; facilityName: string }[];
}

const SUGGESTED_QUESTIONS = [
  "Viện dưỡng lão nào ở Thanh Xuân có giá dưới 10 triệu?",
  "Tôi cần tìm nơi có phục hồi chức năng sau tai biến",
  "Cơ sở nào có dịch vụ bán trú, tức là ban ngày gửi, tối về nhà?",
  "Giới thiệu cho tôi viện có đánh giá cao nhất",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào! Tôi là trợ lý AI của **An Lão** 🌿\n\nTôi có thể giúp bạn tìm kiếm và so sánh các viện dưỡng lão phù hợp với nhu cầu của gia đình. Hãy cho tôi biết bạn đang tìm kiếm điều gì nhé!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetchApi("/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.status === 200 && response.data?.data) {
        const data = response.data.data;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            sources: data.sources,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Rất tiếc, đã xảy ra lỗi. Vui lòng thử lại sau!",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lỗi kết nối. Vui lòng thử lại!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Simple markdown: bold **text**, newlines
  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split("\n").map((line, j) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < part.split("\n").length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <div className="flex flex-col h-screen bg-surface pb-[80px] md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-outline-variant flex items-center gap-3 px-4 h-16 sticky top-0 z-40 shrink-0">
        <Link href="/" className="p-2 -ml-2 text-outline hover:text-primary md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="font-bold text-on-surface">Trợ lý AI An Lão</div>
          <div className="text-xs text-on-surface-variant flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            Đang hoạt động • Powered by Gemini
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-3xl mx-auto w-full">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "user" ? "bg-primary text-white" : "bg-primary-container text-primary"
            }`}>
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-tr-sm"
                  : "bg-white border border-outline-variant text-on-surface rounded-tl-sm shadow-sm"
              }`}>
                {renderContent(msg.content)}
              </div>

              {/* Source chips */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {msg.sources.map((src) => (
                    <Link
                      key={src.facilityId}
                      href={`/facility/${src.facilityId}`}
                      className="flex items-center gap-1.5 bg-surface-container border border-outline-variant rounded-full px-3 py-1 text-xs text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      {src.facilityName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="bg-white border border-outline-variant rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </div>
          </div>
        )}

        {/* Suggested questions - only show on first message */}
        {messages.length === 1 && !isLoading && (
          <div className="space-y-2">
            <p className="text-xs text-on-surface-variant text-center">Bạn có thể hỏi ví dụ:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm bg-white border border-outline-variant rounded-xl px-4 py-3 text-on-surface hover:border-primary hover:bg-surface-container-lowest transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="shrink-0 bg-white border-t border-outline-variant px-4 py-3 md:sticky md:bottom-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            disabled={isLoading}
            className="flex-1 bg-surface-container-low rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary transition-all disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <Navigation />
    </div>
  );
}
