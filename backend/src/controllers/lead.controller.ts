import { Request, Response } from "express";
import {
  createLead,
  deleteLead,
  exportLeads,
  getLeadById,
  getLeads,
  updateLead,
} from "../services/lead.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { leadsToCsv } from "../utils/csv";

export const createLeadHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await createLead(req.body, req.user!._id.toString());

    res.status(201).json(new ApiResponse("Lead created successfully", lead));
  }
);

export const getLeadsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getLeads(req.query);

    res.status(200).json(new ApiResponse("Leads fetched successfully", result));
  }
);

export const getLeadByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await getLeadById(String(req.params.id));

    res.status(200).json(new ApiResponse("Lead fetched successfully", lead));
  }
);

export const updateLeadHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await updateLead(String(req.params.id), req.body);

    res.status(200).json(new ApiResponse("Lead updated successfully", lead));
  }
);

export const deleteLeadHandler = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteLead(String(req.params.id));

    res.status(200).json(new ApiResponse("Lead deleted successfully"));
  }
);

export const exportLeadsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const leads = await exportLeads(req.query);
    const csv = leadsToCsv(leads);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
    res.status(200).send(csv);
  }
);
