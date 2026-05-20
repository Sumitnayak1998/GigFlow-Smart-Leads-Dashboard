import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { UserRole } from "../../types/auth.types";
import { Lead } from "../../types/lead.types";

interface LeadTableProps {
  leads: Lead[];
  userRole: UserRole;
  onEdit: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
}

const statusClassMap: Record<Lead["status"], string> = {
  New: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
  Contacted: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
  Qualified: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  Lost: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200",
};

const LeadTable = ({ leads, userRole, onEdit, onDelete }: LeadTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <tr>
              {["Name", "Email", "Status", "Source", "Created", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className={`px-5 py-4 text-xs font-bold uppercase tracking-wide text-ink-500 dark:text-slate-400 ${
                      heading === "Actions" ? "text-right" : ""
                    }`}
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                <td className="px-5 py-4">
                  <p className="font-bold text-ink-900 dark:text-white">
                    {lead.name}
                  </p>
                </td>
                <td className="px-5 py-4 text-sm text-ink-500 dark:text-slate-400">
                  {lead.email}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${statusClassMap[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-ink-700 dark:text-slate-200">
                  {lead.source}
                </td>
                <td className="px-5 py-4 text-sm text-ink-500 dark:text-slate-400">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/dashboard/leads/${lead._id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-ink-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                      title="View lead"
                    >
                      <Eye size={16} />
                    </Link>

                    <button
                      onClick={() => onEdit(lead)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-ink-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                      title="Edit lead"
                    >
                      <Pencil size={16} />
                    </button>

                    {userRole === "admin" && (
                      <button
                        onClick={() => onDelete(lead._id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-200 dark:hover:bg-red-900"
                        title="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
