interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
}

export function usePagination({ 
  currentPage, 
  totalPages, 
  maxVisible = 5 
}: UsePaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is maxVisible or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sliding window logic
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = startPage + maxVisible - 1;

      // Adjust if we're near the end
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return {
    pageNumbers: getPageNumbers(),
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < totalPages,
  };
}
