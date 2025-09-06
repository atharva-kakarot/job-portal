import mongoose from "mongoose";

const applicationScheme = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["application", "saved"],
      default: "application",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationScheme);
