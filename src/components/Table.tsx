import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  loading?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  onSort,
  loading = false
}) => {
  const handleSort = (column: Column) => {
    if (column.sortable && onSort) {
      onSort(column.key, 'asc');
    }
  };

  // if (loading) {
  //   return (
  //     <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
  //       <div className="p-8 text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
  //         <p className="text-gray-600 dark:text-gray-400 mt-2">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                    }`}
                  onClick={() => handleSort(column)}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Loading...</p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              data?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left Info */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span> —{" "}
              <span className="font-medium">{totalItems}</span> users
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-1">
              {/* Previous */}
              <button
                onClick={() => onPageChange && onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 
            disabled:opacity-50 disabled:cursor-not-allowed 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition-colors duration-200"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page Numbers with Ellipsis */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                )
                .map((page, idx, arr) => (
                  <React.Fragment key={page}>
                    {/* Ellipsis for skipped pages */}
                    {idx > 0 && arr[idx - 1] !== page - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => onPageChange && onPageChange(page)}
                      className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${currentPage === page
                        ? "bg-primary-500 text-white shadow-md"
                        : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              {/* Next */}
              <button
                onClick={() => onPageChange && onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-2 py-1  border border-gray-300 dark:border-gray-600 
            disabled:opacity-50 disabled:cursor-not-allowed 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition-colors duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};