import React, { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <header className="py-6 border-b border-border">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold">My App</h1>
            <nav className="flex gap-4">
              <Link href="/">
                <Button variant="ghost">Todo</Button>
              </Link>
              <Link href="/chat">
                <Button variant="ghost">AI Chat</Button>
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
