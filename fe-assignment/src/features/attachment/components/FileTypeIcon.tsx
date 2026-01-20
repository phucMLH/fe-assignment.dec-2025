import type { FileType } from '../types/attachment';

interface FileTypeIconProps {
  mimetype: string;
  className?: string;
}

export default function FileTypeIcon({ mimetype, className = 'h-8 w-8' }: FileTypeIconProps) {
  const getFileType = (): FileType => {
    if (mimetype.includes('pdf')) return 'pdf';
    if (mimetype.includes('word') || mimetype.includes('msword')) return 'doc';
    if (mimetype.includes('excel') || mimetype.includes('spreadsheet')) return 'xls';
    if (mimetype.includes('text')) return 'txt';
    if (mimetype.includes('zip')) return 'zip';
    if (mimetype.includes('image/jpeg') || mimetype.includes('image/jpg')) return 'jpg';
    if (mimetype.includes('image/png')) return 'png';
    return 'other';
  };

  const fileType = getFileType();

  const getBadgeStyles = () => {
    switch (fileType) {
      case 'pdf':
        return 'bg-accent-100 text-accent-700'; // Use accent (green) for PDF
      case 'doc':
        return 'bg-primary-100 text-primary-700'; // Use primary (blue) for DOC
      case 'xls':
      case 'xlsx':
        return 'bg-secondary-100 text-secondary-700'; // Use secondary (purple) for XLS
      case 'txt':
        return 'bg-neutral-100 text-neutral-700';
      case 'zip':
        return 'bg-primary-100 text-primary-700'; // Use primary for ZIP
      case 'jpg':
      case 'png':
        return 'bg-accent-100 text-accent-700'; // Use accent for images
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getLabel = () => {
    return fileType.toUpperCase();
  };

  return (
    <div className={`flex items-center justify-center rounded px-2 py-1 text-xs font-semibold ${getBadgeStyles()} ${className}`}>
      {getLabel()}
    </div>
  );
}
