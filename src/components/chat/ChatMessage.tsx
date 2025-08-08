import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user";
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
        isUser 
          ? "bg-primary text-primary-foreground ml-12" 
          : "bg-muted text-muted-foreground mr-12"
      )}>
        <div className="text-sm font-medium mb-1">
          {isUser ? "You" : "AI Assistant"}
        </div>
        <div className="text-sm whitespace-pre-wrap break-words">
          {content}
        </div>
        {timestamp && (
          <div className="text-xs opacity-70 mt-2">
            {timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
