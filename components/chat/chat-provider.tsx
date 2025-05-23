"use client";

import { useEffect, useState } from "react";
import { ChatPopup } from "./chat-popup";

export function ChatProvider() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);

    // Listen for custom event to toggle chat
    const handleToggleChat = () => {
      // Create a synthetic click event on the chat button
      document.querySelector('[aria-label="Chat with Malek"]')?.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
      );
    };

    document.addEventListener('toggle-chat', handleToggleChat);

    return () => {
      document.removeEventListener('toggle-chat', handleToggleChat);
    };
  }, []);

  // Only render on client-side to avoid hydration issues
  if (!isInitialized) return null;

  return <ChatPopup />;
}