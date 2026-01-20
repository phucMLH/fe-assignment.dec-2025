import { useState } from 'react';
import { usePagination } from '../../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [goToValue, setGoToValue] = useState('');

  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage,
    totalPages,
  });

  const handleGoTo = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(goToValue);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGoToValue('');
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-6 py-3">
      {/* Total count */}
      <div className="text-sm font-medium text-neutral-800">
        Total {totalItems}
      </div>

      {/* Center: Items per page + pagination */}
      <div className="flex items-center gap-4">
        {/* Items per page dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
            className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-neutral-600">/page</span>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            className="rounded border border-neutral-300 p-2 text-neutral-600 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
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
              className={`h-9 w-9 rounded border text-sm font-medium transition ${
                currentPage === page
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            className="rounded border border-neutral-300 p-2 text-neutral-600 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right: Go to */}
      <form onSubmit={handleGoTo} className="flex items-center gap-2">
        <span className="text-sm text-neutral-600">Go to</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={goToValue}
          onChange={(e) => setGoToValue(e.target.value)}
          placeholder="1"
          className="w-16 rounded border border-neutral-300 px-2 py-1.5 text-sm text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </form>
    </div>
  );
}
