import { useState, useRef, useEffect } from 'react';
import type { Message } from '../types/message';
import { mockMessages } from '../data/mockMessages';

export function useInbox() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isComposing, setIsComposing] = useState(false);
  const [composeMode, setComposeMode] = useState<'new' | 'reply'>('new');
  const [replyTo, setReplyTo] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myEmail] = useState('my-email@example.com'); // User's email address
  const listEndRef = useRef<HTMLDivElement>(null);

  // Dynamic items per page based on compose state
  const itemsPerPage = isComposing ? 5 : 10;
  const totalMessages = messages.length;

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (listEndRef.current && messages.length > mockMessages.length) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const handleSendMessage = (data: { from: string; to: string[]; subject: string; body: string }) => {
    const newMessage = {
      id: `reply-${Date.now()}`,
      from: data.from,
      subject: data.subject,
      date: new Date().toISOString().split('T')[0],
      preview: data.body.substring(0, 100) + (data.body.length > 100 ? '...' : ''),
    };

    // If replying to an existing message, add to its related messages
    if (composeMode === 'reply' && selectedMessage) {
      const updatedMessages = messages.map(message => {
        if (message.id === selectedMessage.id) {
          return {
            ...message,
            relatedMessages: [newMessage, ...(message.relatedMessages || [])],
          };
        }
        return message;
      });
      
      setMessages(updatedMessages);
      // Update selected message to show new reply
      setSelectedMessage({
        ...selectedMessage,
        relatedMessages: [newMessage, ...(selectedMessage.relatedMessages || [])],
      });
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

      setMessages([newMsg, ...messages]);
      setSelectedMessage(newMsg);
    }
    
    setIsComposing(false);
  };

  const handleReply = (message: Message) => {
    setComposeMode('reply');
    // Reply to sender, or if I'm the sender, reply to all recipients
    const replyToEmail = message.from.email === myEmail 
      ? message.recipients.join(', ')
      : message.from.email;
    setReplyTo(replyToEmail);
    setReplySubject(message.subject);
    setIsComposing(true);
  };

  const handleCompose = () => {
    setComposeMode('new');
    setReplyTo('');
    setReplySubject('');
    setIsComposing(true);
  };

  const handleCancelCompose = () => {
    setIsComposing(false);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app: const data = await fetchEmails();
      console.log('Refresh completed');
    } catch (err) {
      setError('Failed to refresh messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Paginate messages based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMessages = messages.slice(startIndex, endIndex);

  // Calculate current range for header display
  const currentRange = {
    start: startIndex + 1,
    end: Math.min(endIndex, totalMessages),
  };

  return {
    // State
    messages,
    selectedMessage,
    currentPage,
    currentRange,
    isComposing,
    composeMode,
    replyTo,
    replySubject,
    displayedMessages,
    listEndRef,
    myEmail,
    itemsPerPage,
    totalMessages,
    isLoading,
    error,
    
    // Handlers
    setSelectedMessage,
    setCurrentPage,
    handleSendMessage,
    handleReply,
    handleCompose,
    handleCancelCompose,
    handleRefresh,
  };
}
