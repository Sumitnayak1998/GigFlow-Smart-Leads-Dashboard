import mongoose, { FilterQuery } from "mongoose";
import { ILead, Lead } from "../models/lead.model";
import {
  CreateLeadInput,
  LeadQuery,
  PaginationMeta,
  UpdateLeadInput,
} from "../types/lead.types";
import { ApiError } from "../utils/ApiError";

interface LeadListResult {
  leads: ILead[];
  pagination: PaginationMeta;
}

const PAGE_LIMIT = 10;

const buildLeadFilter = (query: LeadQuery): FilterQuery<ILead> => {
  const filter: FilterQuery<ILead> = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.source) {
    filter.source = query.source;
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } },
    ];
  }

  return filter;
};

export const createLead = async (
  input: CreateLeadInput,
  userId: string
): Promise<ILead> => {
  return Lead.create({
    ...input,
    createdBy: userId,
  });
};

export const getLeads = async (query: LeadQuery): Promise<LeadListResult> => {
  const page = Math.max(Number(query.page) || 1, 1);
  const skip = (page - 1) * PAGE_LIMIT;
  const filter = buildLeadFilter(query);
  const sortDirection = query.sort === "oldest" ? 1 : -1;

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(PAGE_LIMIT)
      .populate("createdBy", "name email role"),
    Lead.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / PAGE_LIMIT);

  return {
    leads,
    pagination: {
      page,
      limit: PAGE_LIMIT,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const getLeadById = async (id: string): Promise<ILead> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid lead ID");
  }

  const lead = await Lead.findById(id).populate("createdBy", "name email role");

  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }

  return lead;
};

export const updateLead = async (
  id: string,
  input: UpdateLeadInput
): Promise<ILead> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid lead ID");
  }

  const lead = await Lead.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }

  return lead;
};

export const deleteLead = async (id: string): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid lead ID");
  }

  const lead = await Lead.findByIdAndDelete(id);

  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }
};

export const exportLeads = async (query: LeadQuery): Promise<ILead[]> => {
  const filter = buildLeadFilter(query);
  const sortDirection = query.sort === "oldest" ? 1 : -1;

  return Lead.find(filter).sort({ createdAt: sortDirection });
};
