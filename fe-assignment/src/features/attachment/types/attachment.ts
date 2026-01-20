export interface Attachment {
  id: string;
  name: string;
  mimetype: string;
  size: number; // in bytes
  uploadDate: Date;
  path?: string; // optional path for grouping
}

export interface AttachmentGroup {
  path: string;
  attachments: Attachment[];
}

export type FileType = 'pdf' | 'doc' | 'xls' | 'xlsx' | 'txt' | 'zip' | 'jpg' | 'png' | 'other';

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'application/zip',
  'image/jpeg',
  'image/png',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
