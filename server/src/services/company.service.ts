import Company from "../models/Company.js";

interface CreateCompanyInput {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  companySize?: string;
}

export const createCompany = async (data: CreateCompanyInput) => {
  const existingCompany = await Company.findOne({
    name: data.name,
  });

  if (existingCompany) {
    throw new Error("Company with this name already exists");
  }

  const company = await Company.create(data);

  return company;
};

export const getCompanies = async () => {
  return Company.find().sort({ createdAt: -1 });
};

export const getCompanyById = async (companyId: string) => {
  const company = await Company.findById(companyId);

  if (!company) {
    throw new Error("Company not found");
  }

  return company;
};

export const updateCompany = async (
  companyId: string,
  data: Partial<CreateCompanyInput>
) => {
  const company = await Company.findByIdAndUpdate(
    companyId,
    { $set: data },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!company) {
    throw new Error("Company not found");
  }

  return company;
};

export const deleteCompany = async (companyId: string) => {
  const company = await Company.findByIdAndDelete(companyId);

  if (!company) {
    throw new Error("Company not found");
  }

  return company;
};