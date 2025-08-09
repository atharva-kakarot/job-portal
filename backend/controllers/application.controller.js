import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    // If user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    // Check If jobs exist
    const job = Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: true,
      });
    }

    //  Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "Applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedjobs = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
