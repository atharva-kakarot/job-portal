import { Job } from "../models/job.model.js";

// admin will post a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
      company,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId ||
      !company
    ) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experienceLevel,
      position,
      companyId: companyId,
      created_by: userId,
      company,
    });
    return res.status(200).json({
      message: "Job created successfully!",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// how many jobs created by admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminJobs = req.id;
    const jobs = await Job.find({ created_by: adminJobs }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    const job = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { savedBy: req.id } },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job saved successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const savedJobs = await Job.find({
      savedBy: userId,
    }).populate({
      path: "company",
    });

    if (!savedJobs || savedJobs.length === 0) {
      return res.status(404).json({
        message: "No saved jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unsaveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    const job = await Job.findByIdAndUpdate(
      jobId,
      { $pull: { savedBy: req.id } },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job unsaved successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
