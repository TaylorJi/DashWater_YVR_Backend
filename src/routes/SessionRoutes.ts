import express, { Router } from "express";
import SessionController from "../controllers/session/SessionController";

export const router: Router = express.Router();

router.route('/createNewSession').post(SessionController.createNewSession);