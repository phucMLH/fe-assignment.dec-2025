import type { Message } from '../../types/message';

interface MessageRowProps {
  message: Message;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick: (id: string) => void;
}

export default function MessageRow({ message, isSelected, onSelect, onClick }: MessageRowProps) {
  return (
    <tr
      className={`cursor-pointer border-b border-neutral-200 transition hover:bg-neutral-50 ${
        isSelected ? 'bg-neutral-100' : ''
      }`}
      onClick={() => onClick(message.id)}
    >
      {/* Checkbox */}
      <td className="w-10 px-2 py-1.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(message.id);
          }}
          className="h-3.5 w-3.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
      </td>

      {/* From */}
      <td className="px-2 py-1.5">
        <div className={`text-xs ${message.isRead ? 'font-normal text-neutral-700' : 'font-bold text-neutral-900'}`}>
          {message.from.name}
        </div>
      </td>

      {/* Recipients */}
      <td className="px-2 py-1.5">
        <div className="text-xs text-neutral-600">
          {message.recipients.slice(0, 2).join(', ')}
          {message.recipients.length > 2 && `, +${message.recipients.length - 2}`}
        </div>
      </td>

      {/* Subject */}
      <td className="px-2 py-1.5">
        <div className={`text-xs ${message.isRead ? 'font-normal text-neutral-700' : 'font-semibold text-neutral-900'}`}>
          {message.subject}
        </div>
      </td>

      {/* Date */}
      <td className="px-2 py-1.5">
        <div className="text-xs text-neutral-600">{message.date}</div>
      </td>

      {/* Action */}
      <td className="px-2 py-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle action menu
          }}
          className="rounded p-0.5 text-neutral-600 hover:bg-neutral-200"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
