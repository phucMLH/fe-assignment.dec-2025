export const getFileTypeLabel = (mimetype: string): string => {
  if (mimetype.includes('pdf')) return 'PDF';
  if (mimetype.includes('word') || mimetype.includes('msword')) return 'DOC';
  if (mimetype.includes('excel') || mimetype.includes('spreadsheet')) return 'XLS';
  if (mimetype.includes('text')) return 'TXT';
  if (mimetype.includes('zip')) return 'ZIP';
  if (mimetype.includes('image')) return 'IMAGE';
  return 'FILE';
};
