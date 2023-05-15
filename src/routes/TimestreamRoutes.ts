import express, { Router } from "express";
import TimestreamController from "../controllers/timestreamAPI/TimestreamController";

export const router: Router = express.Router();

router.route("/getAllBuoyIds").get(TimestreamController.getAllBuoyIds);
router.route("/getCurrentBuoyData").get(TimestreamController.getCurrentBuoyData);
router.route("/getBuoyHistory").get(TimestreamController.getBuoyHistory);
router.route("/getBuoyThreshold").get(TimestreamController.getBuoyThreshold);

router.route("/getCachedData").post(TimestreamController.getCachedDeviceData);
router.route("/getCachedLogData").post(TimestreamController.getCachedLogData);
router.route("/getCustomRangeData").post(TimestreamController.getCustomRangeData);