import InboxHeader from './components/InboxHeader';
import MessageList from './components/MessageList';
import MessageDetail from './components/MessageDetail';
import Pagination from '../../components/common/Pagination';
import ComposeForm from './components/ComposeForm';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { useInbox } from './hooks/useInbox';

export default function MessagePage() {
  const {
    selectedMessage,
    currentPage,
    isComposing,
    composeMode,
    replyTo,
    replySubject,
    displayedMessages,
    listEndRef,
    itemsPerPage,
    totalMessages,
    currentRange,
    isLoading,
    error,
    myEmail,
    setSelectedMessage,
    setCurrentPage,
    handleSendMessage,
    handleReply,
    handleCompose,
    handleCancelCompose,
    handleRefresh,
  } = useInbox();

  return (
    <>
      {/* Center panel - Message List */}
      <div className="flex flex-1 flex-col overflow-hidden border-r border-neutral-200 bg-white">
        <InboxHeader
          totalMessages={totalMessages}
          currentRange={currentRange}
          onRefresh={handleRefresh}
          onCompose={handleCompose}
        />
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRefresh} />
          ) : totalMessages === 0 ? (
            <EmptyState 
              title="No messages yet" 
              description="Your inbox is empty. Compose a new message to get started."
            />
          ) : (
            <>
              <MessageList messages={displayedMessages} onSelectMessage={setSelectedMessage} />
              <div ref={listEndRef} />
            </>
          )}
        </div>
        {totalMessages > 0 && !isLoading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalMessages / itemsPerPage)}
            totalItems={totalMessages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
        {isComposing && (
          <ComposeForm
            onSend={handleSendMessage}
            onCancel={handleCancelCompose}
            mode={composeMode}
            replyTo={replyTo}
            replySubject={replySubject}
            myEmail={myEmail}
          />
        )}
      </div>

      {/* Right panel - Message Detail */}
      <div className="hidden w-full overflow-y-auto bg-white lg:block lg:w-96">
        <MessageDetail message={selectedMessage} onReply={handleReply} />
      </div>
    </>
  );
}
