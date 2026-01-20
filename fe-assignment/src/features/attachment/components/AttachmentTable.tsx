import { Fragment } from 'react';
import type { Attachment } from '../types/attachment';
import AttachmentRow from './AttachmentRow';

interface AttachmentTableProps {
  attachments: Attachment[];
  selectedIds: string[];
  onSelectAll: () => void;
  onSelect: (id: string) => void;
  onDownload: (attachment: Attachment) => void;
  onDelete: (id: string) => void;
}

export default function AttachmentTable({
  attachments,
  selectedIds,
  onSelectAll,
  onSelect,
  onDownload,
  onDelete,
}: AttachmentTableProps) {
  const allSelected = attachments.length > 0 && selectedIds.length === attachments.length;

  // Group attachments by path - root first, then others
  const grouped: { [key: string]: Attachment[] } = {};
  attachments.forEach((att) => {
    const key = att.path || 'root';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(att);
  });

  // Sort keys so 'root' comes first, then others
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    if (a === 'root') return -1;
    if (b === 'root') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="overflow-hidden bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-primary-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase">NAME</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase">TYPE</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase">SIZE</th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase">DATE</th>
            <th className="px-4 py-3 text-center text-sm font-semibold uppercase">
              <svg className="mx-auto h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedKeys.map((path) => (
            <Fragment key={path}>
              {path !== 'root' && (
                <tr className="bg-neutral-100">
                  <td colSpan={6} className="px-4 py-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      {path}
                    </div>
                  </td>
                </tr>
              )}
              {grouped[path].map((attachment) => (
                <AttachmentRow
                  key={attachment.id}
                  attachment={attachment}
                  isSelected={selectedIds.includes(attachment.id)}
                  onSelect={onSelect}
                  onDownload={onDownload}
                  onDelete={onDelete}
                />
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
