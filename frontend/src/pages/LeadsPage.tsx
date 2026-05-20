import { useEffect, useState } from "react";
import {
  createLeadApi,
  deleteLeadApi,
  exportLeadsCsvApi,
  getLeadsApi,
  updateLeadApi,
} from "../api/leads.api";
import LeadFilters from "../features/leads/LeadFilters";
import LeadForm from "../features/leads/LeadForm";
import LeadTable from "../features/leads/LeadTable";
import Pagination from "../features/leads/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { useAuthStore } from "../store/auth.store";
import {
  CreateLeadPayload,
  Lead,
  LeadFilters as LeadFiltersType,
  PaginationMeta,
} from "../types/lead.types";
import { downloadBlob } from "../utils/exportCsv";
import { getErrorMessage } from "../utils/getErrorMessage";

const initialPagination: PaginationMeta = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

const LeadsPage = () => {
  const { user } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] =
    useState<PaginationMeta>(initialPagination);
  const [filters, setFilters] = useState<LeadFiltersType>({
    sort: "latest",
    page: 1,
  });
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fetchLeads = async (nextFilters: LeadFiltersType) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await getLeadsApi(nextFilters);
      setLeads(result.leads);
      setPagination(result.pagination);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const nextFilters = {
      ...filters,
      search: debouncedSearch,
      page: debouncedSearch !== filters.search ? 1 : filters.page,
    };

    setFilters(nextFilters);
    fetchLeads(nextFilters);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchLeads(filters);
  }, [filters.status, filters.source, filters.sort, filters.page]);

  const handleSubmitLead = async (payload: CreateLeadPayload) => {
    setIsSubmitting(true);
    setError("");

    try {
      if (selectedLead) {
        await updateLeadApi(selectedLead._id, payload);
        setSelectedLead(null);
      } else {
        await createLeadApi(payload);
      }

      await fetchLeads(filters);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Delete this lead permanently?")) return;

    setError("");

    try {
      await deleteLeadApi(leadId);
      await fetchLeads(filters);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleExportCsv = async () => {
    setIsExporting(true);
    setError("");

    try {
      const blob = await exportLeadsCsvApi(filters);
      downloadBlob(blob, "leads.csv");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary-600">
            Leads
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink-900 dark:text-white">
            Leads management
          </h2>
          <p className="mt-3 max-w-2xl text-ink-500 dark:text-slate-400">
            Create leads, combine filters, search prospects, and export matching
            results as CSV.
          </p>
        </div>

        <div className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800">
          Total leads: {pagination.total}
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <LeadForm
          selectedLead={selectedLead}
          onSubmit={handleSubmitLead}
          onCancelEdit={() => setSelectedLead(null)}
          isSubmitting={isSubmitting}
        />

        <div className="space-y-5">
          <LeadFilters
            filters={filters}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onFiltersChange={setFilters}
            onExportCsv={handleExportCsv}
            isExporting={isExporting}
          />

          {isLoading ? (
            <div className="rounded-lg border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="font-bold text-ink-900 dark:text-white">
                Loading leads...
              </p>
              <p className="mt-2 text-sm text-ink-500 dark:text-slate-400">
                Fetching the latest records from your pipeline.
              </p>
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-lg border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="font-bold text-ink-900 dark:text-white">
                No leads found
              </p>
              <p className="mt-2 text-sm text-ink-500 dark:text-slate-400">
                Create a lead or adjust your filters to see results.
              </p>
            </div>
          ) : (
            <>
              <LeadTable
                leads={leads}
                userRole={user?.role || "sales"}
                onEdit={setSelectedLead}
                onDelete={handleDeleteLead}
              />

              <Pagination
                pagination={pagination}
                onPageChange={(page) => setFilters({ ...filters, page })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
