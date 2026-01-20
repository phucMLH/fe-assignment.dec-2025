import { useState, useEffect } from 'react';
import type { Attachment } from '../types/attachment';
import { mockAttachments } from '../data/mockAttachments';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '../types/attachment';

export function useAttachmentState() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Simulate API call to load attachments
  useEffect(() => {
    const loadAttachments = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setAttachments(mockAttachments);
      } catch (err) {
        setError('Failed to load attachments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAttachments();
  }, []);

  const uploadFiles = async (files: File[]) => {
    try {
      setError(null);
      
      // Validate files
      const invalidFiles: string[] = [];
      files.forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          invalidFiles.push(`${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        }
        const fileType = file.type;
        if (!ALLOWED_FILE_TYPES.includes(fileType)) {
          invalidFiles.push(`${file.name} has unsupported type`);
        }
      });

      if (invalidFiles.length > 0) {
        throw new Error(invalidFiles.join('; '));
      }

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Convert File[] to Attachment[]
      const newAttachments: Attachment[] = files.map((file) => ({
        id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        mimetype: file.type,
        size: file.size,
        uploadDate: new Date(),
      }));

      setAttachments((prev) => [...newAttachments, ...prev]);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  const deleteAttachment = async (id: string) => {
    try {
      setError(null);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAttachments((prev) => prev.filter((att) => att.id !== id));
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    } catch (err) {
      setError('Failed to delete attachment. Please try again.');
    }
  };

  const downloadAttachment = (attachment: Attachment) => {
    // Mock download - in real app would fetch file and trigger browser download
    console.log(`Downloading: ${attachment.name}`);
    alert(`Mock download: ${attachment.name}`);
  };

  const selectAll = () => {
    if (selectedIds.length === attachments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(attachments.map((att) => att.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return {
    attachments,
    loading,
    error,
    selectedIds,
    uploadFiles,
    deleteAttachment,
    downloadAttachment,
    selectAll,
    toggleSelect,
  };
}
