import type { Attachment } from '../types/attachment';

export const mockAttachments: Attachment[] = [
  // Root level files
  {
    id: 'att-1',
    name: 'Sample_Document.pdf',
    mimetype: 'application/pdf',
    size: 2097152, // 2.0MB
    uploadDate: new Date('2021-01-12'),
  },
  {
    id: 'att-2',
    name: 'Sample_Document.doc',
    mimetype: 'application/msword',
    size: 2097152,
    uploadDate: new Date('2021-01-12'),
  },
  {
    id: 'att-3',
    name: 'Sample_Document.xls',
    mimetype: 'application/vnd.ms-excel',
    size: 2097152,
    uploadDate: new Date('2021-01-12'),
  },
  {
    id: 'att-4',
    name: 'Sample_Document.xls',
    mimetype: 'application/vnd.ms-excel',
    size: 2097152,
    uploadDate: new Date('2021-01-12'),
  },
  {
    id: 'att-5',
    name: 'Sample_Document.pdf',
    mimetype: 'application/pdf',
    size: 2097152,
    uploadDate: new Date('2021-01-12'),
  },
  // Subpath files
  {
    id: 'att-6',
    name: 'Sample_Document.pdf',
    mimetype: 'application/pdf',
    size: 2097152,
    uploadDate: new Date('2021-01-12'),
    path: '/SUBPATH',
  },
  {
    id: 'att-7',
    name: 'Report_2021.xlsx',
    mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 3145728, // 3MB
    uploadDate: new Date('2021-02-15'),
    path: '/SUBPATH',
  },
  {
    id: 'att-8',
    name: 'Meeting_Notes.docx',
    mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1048576, // 1MB
    uploadDate: new Date('2021-03-20'),
    path: '/DOCUMENTS',
  },
  {
    id: 'att-9',
    name: 'Budget_Plan.xlsx',
    mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 4194304, // 4MB
    uploadDate: new Date('2021-04-10'),
    path: '/DOCUMENTS',
  },
  {
    id: 'att-10',
    name: 'Archive.zip',
    mimetype: 'application/zip',
    size: 10485760, // 10MB
    uploadDate: new Date('2021-05-05'),
  },
];
