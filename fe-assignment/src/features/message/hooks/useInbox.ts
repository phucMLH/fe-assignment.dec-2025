import { useState, useMemo } from 'react';
import type { Message } from '../types/message';
import { useMessageState } from './useMessageState';
import { useMessageSelection } from './useMessageSelection';
import { useCompose } from './useCompose';
import { useLoadingError } from '../../../hooks/useLoadingError';

export function useInbox() {
  const [myEmail] = useState('my-email@example.com');
  const [currentPage, setCurrentPage] = useState(1);

  // Compose các hooks con
  const messageState = useMessageState();
  const messageSelection = useMessageSelection();
  const compose = useCompose(myEmail);
  const loadingError = useLoadingError();

  // Dynamic items per page based on compose state
  const itemsPerPage = compose.isComposing ? 5 : 10;
  const totalMessages = messageState.messages.length;

  // Paginate messages
  const displayedMessages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return messageState.messages.slice(startIndex, endIndex);
  }, [messageState.messages, currentPage, itemsPerPage]);

  // Calculate current range for header display
  const currentRange = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      start: startIndex + 1,
      end: Math.min(endIndex, totalMessages),
    };
  }, [currentPage, itemsPerPage, totalMessages]);

  const handleSendMessage = (data: { from: string; to: string[]; subject: string; body: string }) => {
    // If replying to an existing message, add to its related messages
    if (compose.composeMode === 'reply' && messageSelection.selectedMessage) {
      const newReply = {
        id: `reply-${Date.now()}`,
        from: data.from,
        subject: data.subject,
        date: new Date().toISOString().split('T')[0],
        preview: data.body.substring(0, 100) + (data.body.length > 100 ? '...' : ''),
      };
      
      const updatedMessage = messageState.addReplyToMessage(
        messageSelection.selectedMessage.id,
        newReply
      );
      
      if (updatedMessage) {
        messageSelection.setSelectedMessage(updatedMessage);
      }
    } else {
      // New message (not a reply)
      const fromName = data.from.split('@')[0];
      const newMsg: Message = {
        id: `new-${Date.now()}`,
        from: { name: fromName, email: data.from },
        recipients: data.to,
        subject: data.subject,
        date: new Date().toISOString().split('T')[0],
        isRead: true,
        body: data.body,
        relatedMessages: [],
      };

      const addedMessage = messageState.addNewMessage(newMsg);
      messageSelection.setSelectedMessage(addedMessage);
    }
    
    compose.finishCompose();
  };

  const handleReply = (message: Message) => {
    compose.startReply(message);
  };

  const handleCompose = () => {
    compose.startCompose();
  };

  const handleCancelCompose = () => {
    compose.cancelCompose();
  };

  const handleRefresh = async () => {
    loadingError.startLoading();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app: const data = await fetchEmails();
      console.log('Refresh completed');
    } catch (err) {
      loadingError.setErrorMessage('Failed to refresh messages. Please try again.');
    } finally {
      loadingError.stopLoading();
    }
  };

  return {
    // State
    messages: messageState.messages,
    selectedMessage: messageSelection.selectedMessage,
    currentPage,
    currentRange,
    isComposing: compose.isComposing,
    composeMode: compose.composeMode,
    replyTo: compose.replyTo,
    replySubject: compose.replySubject,
    displayedMessages,
    listEndRef: messageState.listEndRef,
    myEmail,
    itemsPerPage,
    totalMessages,
    isLoading: loadingError.isLoading,
    error: loadingError.error,
    
    // Handlers
    setSelectedMessage: messageSelection.setSelectedMessage,
    setCurrentPage,
    handleSendMessage,
    handleReply,
    handleCompose,
    handleCancelCompose,
    handleRefresh,
  };
}
