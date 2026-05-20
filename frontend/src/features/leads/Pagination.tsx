import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationMeta } from "../../types/lead.types";

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-ink-500 dark:text-slate-400">
        Page <span className="font-bold text-ink-900 dark:text-white">{pagination.page}</span>{" "}
        of{" "}
        <span className="font-bold text-ink-900 dark:text-white">
          {pagination.totalPages}
        </span>
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!pagination.hasPrevPage}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-ink-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ChevronLeft size={17} />
          Previous
        </button>

        <button
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNextPage}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-ink-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Next
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
