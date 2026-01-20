import { useState } from 'react';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '../types/attachment';
import { formatFileSize } from '../../../utils/fileUtils';

interface UploadBoxProps {
  onUpload: (files: File[]) => void;
}

export default function UploadBox({ onUpload }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (files: FileList | File[]): { valid: File[]; errors: string[] } => {
    const fileArray = Array.from(files);
    const valid: File[] = [];
    const errors: string[] = [];

    fileArray.forEach((file) => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File size exceeds ${formatFileSize(MAX_FILE_SIZE)}`);
        return;
      }

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name}: File type not allowed`);
        return;
      }

      valid.push(file);
    });

    return { valid, errors };
  };

  const handleFiles = (files: FileList | File[]) => {
    setError(null);
    const { valid, errors } = validateFiles(files);

    if (errors.length > 0) {
      setError(errors.join(', '));
    }

    if (valid.length > 0) {
      onUpload(valid);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-8 text-center transition ${
          isDragging
            ? 'border-primary-600 bg-primary-50'
            : 'border-neutral-300 bg-white hover:border-primary-400'
        }`}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <svg className="h-8 w-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-neutral-900">
          Drop files here or click to browse
        </h3>
        <p className="mb-4 text-sm text-neutral-600">
          Supported: PDF, DOC, XLS, TXT, ZIP, JPG, PNG (Max {formatFileSize(MAX_FILE_SIZE)})
        </p>
        <label className="inline-block cursor-pointer rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700">
          Select Files
          <input
            type="file"
            multiple
            accept={ALLOWED_FILE_TYPES.join(',')}
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
