import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  createCompany as createCompanyService,
  getCompanies as getCompaniesService,
  getCompanyById as getCompanyByIdService,
  updateCompany as updateCompanyService,
  deleteCompany as deleteCompanyService,
} from "../services/company.service.js";

import {
  createCompanySchema,
  updateCompanySchema,
} from "../validators/company.validator.js";

export const createCompany = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const validatedData = createCompanySchema.parse(req.body);

  const company = await createCompanyService(validatedData);

  res.status(201).json({
    success: true,
    message: "Company created successfully",
    data: {
      company,
    },
  });
};

export const getCompanies = async (
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const companies = await getCompaniesService();

  res.status(200).json({
    success: true,
    message: "Companies retrieved successfully",
    data: {
      companies,
    },
  });
};

export const getCompanyById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company ID",
    });
    return;
  }

  const company = await getCompanyByIdService(id);

  res.status(200).json({
    success: true,
    message: "Company retrieved successfully",
    data: {
      company,
    },
  });
};

export const updateCompany = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company ID",
    });
    return;
  }

  const validatedData = updateCompanySchema.parse(req.body);

  const company = await updateCompanyService(id, validatedData);

  res.status(200).json({
    success: true,
    message: "Company updated successfully",
    data: {
      company,
    },
  });
};

export const deleteCompany = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid company ID",
    });
    return;
  }

  await deleteCompanyService(id);

  res.status(200).json({
    success: true,
    message: "Company deleted successfully",
  });
};