import { Request, Response } from "express";

import UserThresholdModel from "../../models/userThreshold/UserThresholdModel";


const createUserThreshold = async (req: Request, res: Response) => {

    const { userId, sensorId } = req.body;

    if (!userId || !sensorId) {
        return res.status(400).json({ message: "Invalid request: user ID, and sensor ID are required." });
    } else {

        const newEntry = await UserThresholdModel.verifyUserThresholdDocument(userId, sensorId);
        if (!newEntry) {
            return res.status(400).json({ message: "Invalid request: This user already has a document created with this sensor, update the document instead." })
        }

        const response = await UserThresholdModel.createUserThreshold(req.body);

        if (response) {
            return res.status(200).json({ data: response });
        } else {
            return res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const updateUserThreshold = async (req: Request, res: Response) => {

    const { userId, sensorId, deviceId } = req.body;

    if (!userId || !sensorId || !deviceId) {
        return res.status(400).json({ message: "Invalid request: user ID, sensor ID, and deviceId are required." })
    } else {

        const response = await UserThresholdModel.updateUserThreshold(req.body);

        if (response) {
            return res.status(200).json({ data: response });
        } else {
            return res.status(500).json({ message: "There was an error with the request." });
        }
    }
}

const getUserThresholdList = async (req: Request, res: Response) => {

    const { userId } = req.body;

    const response = await UserThresholdModel.getUserThresholdList(userId);

    if (response) {
        return res.status(200).json({ data: response });
    } else {
        return res.status(500).json({ message: "There was an error with the request." });
    }

}


const getSingleMetricUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metric } = req.body;

    if (!userId || !deviceId || !metric) {
        return res.status(400).json({ message: "Invalid request: user ID, device ID and metric are required." });
    } else {
        const response = await UserThresholdModel.getSingleMetricUserThreshold(userId, deviceId, metric);

        if (response) {
            return res.status(200).json({ data: response });
        } else {
            return res.status(500).json({ message: "There was an error with the request." });
        }
    }
}

const getUserThresholdsByDevice = async (req: Request, res: Response) => {

    const { userId, deviceId } = req.params;

    if (!userId || !deviceId) {
        return res.status(400).json({ message: "Invalid request: userID and deviceID are required." })
    }

    const response = await UserThresholdModel.getUserThresholdsByDevice(userId, +deviceId);

    if (response) {
        return res.status(200).json({ data: response });
    } else {
        return res.status(500).json({ message: "There was an error with the request." })
    }

}

export default module.exports = {
    createUserThreshold,
    updateUserThreshold,
    getUserThresholdList,
    getSingleMetricUserThreshold,
    getUserThresholdsByDevice
}