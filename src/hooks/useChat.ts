"use client";

import { useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;
    
    const newMessage: ChatMessage = { role: "user", content: userMessage };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error from chat API");
        return;
      }

      // Extract the assistant's message from OpenRouter response
      const aiMessage = data?.choices?.[0]?.message;
      if (aiMessage) {
        setMessages([...updatedMessages, aiMessage]);
      } else {
        setError("Invalid response format from AI service");
      }
    } catch (err: any) {
      console.error("sendMessage error:", err);
      setError("Network error - please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return { messages, isLoading, error, sendMessage, clearChat };
}
