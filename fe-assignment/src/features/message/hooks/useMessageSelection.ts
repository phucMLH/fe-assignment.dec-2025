import { useState } from 'react';
import type { Message } from '../types/message';

export function useMessageSelection() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const selectMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const clearSelection = () => {
    setSelectedMessage(null);
  };

  return {
    selectedMessage,
    selectMessage,
    setSelectedMessage,
    clearSelection,
  };
}
