import { useState } from 'react';
import type { Message } from '../types/message';

export function useCompose(myEmail: string) {
  const [isComposing, setIsComposing] = useState(false);
  const [composeMode, setComposeMode] = useState<'new' | 'reply'>('new');
  const [replyTo, setReplyTo] = useState('');
  const [replySubject, setReplySubject] = useState('');

  const startCompose = () => {
    setComposeMode('new');
    setReplyTo('');
    setReplySubject('');
    setIsComposing(true);
  };

  const startReply = (message: Message) => {
    setComposeMode('reply');
    // Reply to sender, or if I'm the sender, reply to all recipients
    const replyToEmail = message.from.email === myEmail 
      ? message.recipients.join(', ')
      : message.from.email;
    setReplyTo(replyToEmail);
    setReplySubject(message.subject);
    setIsComposing(true);
  };

  const cancelCompose = () => {
    setIsComposing(false);
  };

  const finishCompose = () => {
    setIsComposing(false);
  };

  return {
    isComposing,
    composeMode,
    replyTo,
    replySubject,
    startCompose,
    startReply,
    cancelCompose,
    finishCompose,
  };
}
