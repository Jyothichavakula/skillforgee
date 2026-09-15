import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  companySize?: string;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    logo: {
      type: String,
    },

    description: {
      type: String,
      maxlength: 1000,
    },

    website: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    companySize: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;