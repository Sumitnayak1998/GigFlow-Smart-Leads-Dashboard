import { ArrowLeft, Mail, Tag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLeadByIdApi } from "../api/leads.api";
import { Lead } from "../types/lead.types";
import { getErrorMessage } from "../utils/getErrorMessage";

const LeadDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      if (!id) return;

      setIsLoading(true);
      setError("");

      try {
        const result = await getLeadByIdApi(id);
        setLead(result);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="font-bold text-ink-900 dark:text-white">
          Loading lead details...
        </p>
        <p className="mt-2 text-sm text-ink-500 dark:text-slate-400">
          Fetching the selected lead record.
        </p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="mx-auto max-w-4xl rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950">
        <p className="font-bold text-red-700 dark:text-red-200">
          {error || "Lead not found"}
        </p>
        <Link
          to="/dashboard/leads"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-600"
        >
          <ArrowLeft size={17} />
          Back to leads
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/dashboard/leads"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary-600"
      >
        <ArrowLeft size={17} />
        Back to leads
      </Link>

      <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary-600">
              Lead Details
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink-900 dark:text-white">
              {lead.name}
            </h2>
            <p className="mt-2 text-ink-500 dark:text-slate-400">
              {lead.email}
            </p>
          </div>

          <span className="w-fit rounded-md bg-primary-50 px-3 py-2 text-sm font-bold text-primary-700 dark:bg-slate-800 dark:text-white">
            {lead.status}
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            { icon: UserRound, color: "text-primary-600", label: "Name", value: lead.name },
            { icon: Mail, color: "text-emerald-600", label: "Email", value: lead.email },
            { icon: Tag, color: "text-violet-600", label: "Source", value: lead.source },
            {
              icon: Tag,
              color: "text-amber-600",
              label: "Created At",
              value: new Date(lead.createdAt).toLocaleString(),
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
              >
                <Icon className={`mb-4 ${item.color}`} size={24} />
                <p className="text-sm font-semibold text-ink-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-bold text-ink-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPage;
