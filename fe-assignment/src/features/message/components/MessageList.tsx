import { useState } from 'react';
import type { Message } from '../types/message';
import MessageRow from './MessageRow';

interface MessageListProps {
  messages: Message[];
  onSelectMessage: (message: Message) => void;
}

export default function MessageList({ messages, onSelectMessage }: MessageListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(messages.map((m) => m.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRowClick = (id: string) => {
    const message = messages.find((m) => m.id === id);
    if (message) {
      onSelectMessage(message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-primary-600 text-white">
            <th className="w-10 px-2 py-1.5">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="h-3.5 w-3.5 rounded border-white/30 bg-primary-700 text-primary-600 focus:ring-primary-500"
              />
            </th>
            <th className="px-2 py-1.5 text-left text-xs font-semibold">From</th>
            <th className="px-2 py-1.5 text-left text-xs font-semibold">Recipients</th>
            <th className="px-2 py-1.5 text-left text-xs font-semibold">Subject</th>
            <th className="px-2 py-1.5 text-left text-xs font-semibold">Date</th>
            <th className="px-2 py-1.5 text-left text-xs font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              isSelected={selectedIds.includes(message.id)}
              onSelect={handleSelectOne}
              onClick={handleRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
