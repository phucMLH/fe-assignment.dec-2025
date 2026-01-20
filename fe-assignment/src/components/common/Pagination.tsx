import { usePagination } from '../../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage,
    totalPages,
  });

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-3 py-1.5">
      {/* Total count */}
      <div className="text-xs text-neutral-600">
        Total {totalItems}
      </div>

      {/* Items shown */}
      <div className="text-xs text-neutral-600">
        {start}-{end} items
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="rounded p-1 text-neutral-600 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page: number) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-6 w-6 rounded text-xs font-medium transition ${
              currentPage === page
                ? 'bg-primary-600 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="rounded p-1 text-neutral-600 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
