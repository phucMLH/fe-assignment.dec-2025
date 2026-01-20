import { useState } from 'react';
import { useAttachmentState } from './hooks/useAttachmentState';
import AttachmentHeader from './components/AttachmentHeader';
import AttachmentTable from './components/AttachmentTable';
import UploadBox from './components/UploadBox';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';

export default function AttachmentPage() {
  const {
    attachments,
    loading,
    error,
    selectedIds,
    uploadFiles,
    deleteAttachment,
    downloadAttachment,
    selectAll,
    toggleSelect,
  } = useAttachmentState();

  const [showUploadBox, setShowUploadBox] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(attachments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = attachments.slice(startIndex, endIndex);

  const handleUpload = async (files: File[]) => {
    const result = await uploadFiles(files);
    if (result.success) {
      setShowUploadBox(false);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleRefresh = () => {
    // Trigger refresh logic if needed
    window.location.reload();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <AttachmentHeader 
        onUploadClick={() => setShowUploadBox(!showUploadBox)}
        onRefresh={handleRefresh}
        selectedCount={selectedIds.length}
        actionsOpen={actionsOpen}
        onActionsToggle={() => setActionsOpen(!actionsOpen)}
      />

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* Empty State */}
      {!loading && attachments.length === 0 && (
        <EmptyState
          title="No attachments yet"
          description="Upload your first file to get started"
        />
      )}

      {/* Attachment Table */}
      {attachments.length > 0 && (
        <AttachmentTable
          attachments={currentItems}
          selectedIds={selectedIds}
          onSelectAll={selectAll}
          onSelect={toggleSelect}
          onDownload={downloadAttachment}
          onDelete={deleteAttachment}
        />
      )}

      {/* Upload Box */}
      {showUploadBox && (
        <div className="bg-white p-4 border-t border-neutral-200">
          <UploadBox onUpload={handleUpload} />
        </div>
      )}

      {/* Pagination */}
      {attachments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={attachments.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
}
