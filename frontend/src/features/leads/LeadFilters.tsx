import { Download, Search } from "lucide-react";
import { LeadFilters as LeadFiltersType } from "../../types/lead.types";

interface LeadFiltersProps {
  filters: LeadFiltersType;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: LeadFiltersType) => void;
  onExportCsv: () => void;
  isExporting: boolean;
}

const LeadFilters = ({
  filters,
  searchValue,
  onSearchChange,
  onFiltersChange,
  onExportCsv,
  isExporting,
}: LeadFiltersProps) => {
  const inputClass =
    "h-11 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 dark:text-slate-400"
          />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            className={`${inputClass} w-full pl-10`}
            placeholder="Search by name or email"
          />
        </div>

        <select
          value={filters.status || ""}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              status: event.target.value as LeadFiltersType["status"],
              page: 1,
            })
          }
          className={inputClass}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={filters.source || ""}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              source: event.target.value as LeadFiltersType["source"],
              page: 1,
            })
          }
          className={inputClass}
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>

        <select
          value={filters.sort || "latest"}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              sort: event.target.value as LeadFiltersType["sort"],
              page: 1,
            })
          }
          className={inputClass}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        <button
          type="button"
          onClick={onExportCsv}
          disabled={isExporting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-ink-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Download size={17} />
          {isExporting ? "Exporting" : "CSV"}
        </button>
      </div>
    </div>
  );
};

export default LeadFilters;
