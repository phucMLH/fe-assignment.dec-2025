import { useState } from 'react';
import type { Message } from '../types/message';
import { mockMessages } from '../data/mockMessages';

export function useInbox() {
  const [messages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalMessages = messages.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMessages = messages.slice(startIndex, endIndex);

  const currentRange = {
    start: startIndex + 1,
    end: Math.min(endIndex, totalMessages),
  };

  return {
    messages,
    selectedMessage,
    currentPage,
    currentRange,
    displayedMessages,
    itemsPerPage,
    totalMessages,
    setSelectedMessage,
    setCurrentPage,
  };
}