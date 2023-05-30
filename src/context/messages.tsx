import { Message } from "@/lib/validators/message";
import { createContext, useState } from "react";
import { nanoid } from "nanoid";

export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: nanoid(),
            text: 'Hello, how can I help you?',
            isUserMessage: false,
        }
    ]);
    const [isMessageUpdating, setIsMessageUpdating] = useState(false);
    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }
    const removeMessage = (id: string) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    }
    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessages((prevMessages) => prevMessages.map((message) => {
            if(message.id === id) {
                return {
                    ...message,
                    text: updateFn(message.text),
                }
            }
            return message;
        }))
    }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
