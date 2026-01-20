/**
 * Format file size from bytes to human-readable format
 * Example: 1024 -> "1.0KB", 1048576 -> "1.0MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(1)}${sizes[i]}`;
}

/**
 * Get file extension from filename
 * Example: "document.pdf" -> "pdf"
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}
