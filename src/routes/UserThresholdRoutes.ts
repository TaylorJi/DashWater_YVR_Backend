import express, { Router } from "express";
export const router: Router = express.Router();

import UserThresholdController from "../controllers/userThreshold/UserThresholdController";


router.route('/createUserThreshold').post(UserThresholdController.createUserThreshold);
router.route('/updateUserThreshold').put(UserThresholdController.updateUserThreshold);
router.route('/getUserThresholdsByDevice/:userId/:deviceId').get(UserThresholdController.getUserThresholdsByDevice);