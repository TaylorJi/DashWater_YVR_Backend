import { Request, Response } from "express";

import DeviceModel from "../../models/device/DeviceModel";


const createDevice = async (req: Request, res: Response) => {

    const { deviceId, coordinates } = req.body;

    if (!deviceId || coordinates.length !== 2 ) {
        res.status(400).json({ message: "Invalid request: id, and location (longitude, latitude) information of the device is required." });
    } else {
        const response = await DeviceModel.createDevice( deviceId, coordinates );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const updateDevice = async (req: Request, res: Response) => {

    const { deviceId, coordinates } = req.body;

    if (!deviceId || coordinates.length !== 2 ) {
        res.status(400).json({ message: "Invalid request: id, and location (longitude, latitude) information of the device is required." });
    } else {
        const response = await DeviceModel.updateDevice( deviceId, coordinates );


        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const deleteDevice = async (req: Request, res: Response) => {

    const deviceId = req.body.deviceId;

    if (!deviceId) {
        res.status(400).json({ message: "Invalid request: device id is required." });
    } else {
        const response = await DeviceModel.deleteDevice( deviceId );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const getAllDevices = async (_req: Request, res: Response) => {

    const response = await DeviceModel.getAllDevices();

    if (response) {
        res.status(200).json({ text: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}


const getSingleDevice = async (req: Request, res: Response) => {

    const deviceId = req.body.deviceId;

    if (!deviceId) {
        res.status(400).json({ message: "Invalid request: device id is required." });
    } else {
        const response = await DeviceModel.getSingleDevice( deviceId );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const getDevicesWithinRadius = async (req: Request, res: Response) => {

    const { coordinates, radius } = req.body;

    if (coordinates.length !== 2 || !radius) {
        res.status(400).json({ message: "Invalid request: location coordinates (longitude, latitude) and radius information are required." })
    } else {
        const response = await DeviceModel.getDevicesWithinRadius( coordinates, radius );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ meesage: "There was an error with the request." });
        }
    }

}


export default module.exports = {
    createDevice,
    updateDevice,
    deleteDevice,
    getAllDevices,
    getSingleDevice,
    getDevicesWithinRadius
}