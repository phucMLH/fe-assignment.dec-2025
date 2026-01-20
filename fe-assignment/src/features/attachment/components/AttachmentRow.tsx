import type { Attachment } from '../types/attachment';
import FileTypeIcon from './FileTypeIcon';
import { formatFileSize } from '../../../utils/fileUtils';
import { formatDateOnly } from '../../../utils/dateUtils';
import { getFileTypeLabel } from '../utils/fileHelpers';

interface AttachmentRowProps {
  attachment: Attachment;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDownload: (attachment: Attachment) => void;
  onDelete: (id: string) => void;
}

export default function AttachmentRow({ attachment, isSelected, onSelect, onDownload, onDelete }: AttachmentRowProps) {
  return (
    <tr className="border-b border-neutral-200 transition hover:bg-neutral-50">
      {/* Checkbox */}
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(attachment.id)}
          className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
      </td>

      {/* Name with icon */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <FileTypeIcon mimetype={attachment.mimetype} className="h-auto w-10" />
          <span className="font-medium text-neutral-900">{attachment.name}</span>
        </div>
      </td>

      {/* Type */}
      <td className="px-4 py-3 text-sm text-neutral-700">{getFileTypeLabel(attachment.mimetype)}</td>

      {/* Size */}
      <td className="px-4 py-3 text-sm text-neutral-700">{formatFileSize(attachment.size)}</td>

      {/* Date */}
      <td className="px-4 py-3 text-sm text-neutral-700">
        {formatDateOnly(attachment.uploadDate)}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onDownload(attachment)}
            className="text-neutral-600 transition hover:text-primary-600"
            title="Download"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(attachment.id)}
            className="text-neutral-600 transition hover:text-red-600"
            title="Delete"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
