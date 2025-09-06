import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getAppliedjobs,
  getJobApplicants,
  getSavedJobs,
  saveJob,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedjobs);
router.route("/:id/applicants").get(isAuthenticated, getJobApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
router.route("/save/:id").get(isAuthenticated, saveJob);
router.route("/saved").get(isAuthenticated, getSavedJobs);

export default router;
