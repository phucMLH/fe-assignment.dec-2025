import { useState, useRef, useEffect } from 'react';
import type { Message, RelatedMessage } from '../types/message';
import { mockMessages } from '../data/mockMessages';

export function useMessageState() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (listEndRef.current && messages.length > mockMessages.length) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const addNewMessage = (message: Message) => {
    setMessages(prev => [message, ...prev]);
    return message;
  };

  const updateMessage = (messageId: string, updates: Partial<Message>) => {
    let updatedMessage: Message | undefined;
    setMessages(prev => {
      const updated = prev.map(msg =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      );
      updatedMessage = updated.find(msg => msg.id === messageId);
      return updated;
    });
    return updatedMessage;
  };

  const addReplyToMessage = (messageId: string, reply: RelatedMessage) => {
    let updatedMessage: Message | undefined;
    setMessages(prev => {
      const updated = prev.map(message => {
        if (message.id === messageId) {
          return {
            ...message,
            relatedMessages: [reply, ...(message.relatedMessages || [])],
          };
        }
        return message;
      });
      updatedMessage = updated.find(msg => msg.id === messageId);
      return updated;
    });
    return updatedMessage;
  };

  return {
    messages,
    listEndRef,
    addNewMessage,
    updateMessage,
    addReplyToMessage,
  };
}
