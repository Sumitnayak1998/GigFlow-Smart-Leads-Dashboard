import { FormEvent, useEffect, useState } from "react";
import {
  CreateLeadPayload,
  Lead,
  LeadSource,
  LeadStatus,
} from "../../types/lead.types";

interface LeadFormProps {
  selectedLead: Lead | null;
  onSubmit: (payload: CreateLeadPayload) => Promise<void>;
  onCancelEdit: () => void;
  isSubmitting: boolean;
}

const LeadForm = ({
  selectedLead,
  onSubmit,
  onCancelEdit,
  isSubmitting,
}: LeadFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [source, setSource] = useState<LeadSource>("Website");

  useEffect(() => {
    if (selectedLead) {
      setName(selectedLead.name);
      setEmail(selectedLead.email);
      setStatus(selectedLead.status);
      setSource(selectedLead.source);
      return;
    }

    setName("");
    setEmail("");
    setStatus("New");
    setSource("Website");
  }, [selectedLead]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ name, email, status, source });

    if (!selectedLead) {
      setName("");
      setEmail("");
      setStatus("New");
      setSource("Website");
    }
  };

  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-ink-900 dark:text-white">
          {selectedLead ? "Update lead" : "Create lead"}
        </h3>
        <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
          Add lead details and keep the pipeline updated.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
            Name
          </label>
          <input
            required
            minLength={2}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
            placeholder="Lead name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
            placeholder="lead@example.com"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
              Status
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as LeadStatus)}
              className={inputClass}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink-700 dark:text-slate-200">
              Source
            </label>
            <select
              value={source}
              onChange={(event) => setSource(event.target.value as LeadSource)}
              className={inputClass}
            >
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 flex-1 rounded-md bg-primary-600 text-sm font-bold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting
              ? "Saving..."
              : selectedLead
                ? "Update lead"
                : "Create lead"}
          </button>

          {selectedLead && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-ink-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
