"use client";

import React from "react";
import ChatContainer from "@/components/chat/ChatContainer";

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">AI Chat Assistant</h1>
        <p className="text-center text-muted-foreground">
          Have a conversation with our intelligent AI assistant powered by Claude Sonnet 4
        </p>
      </div>
      
      <ChatContainer />
    </div>
  );
}
