import { Request, Response } from "express";

import UserModel from "../../models/user/UserModel";


const createUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Invalid request: email and password are required." });
    } else {
        const response = await UserModel.createUser(email, password);


        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
};


const validateUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Invalid request: email and password are required." });
    } else {
        const response = await UserModel.validateUser(email, password);

        if (response) {
            res.status(200).json({ text: response });
        } else if (response === false) {
            res.status(400).json({ message: "User with this email and password combination does not exist." });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }

    }
};

//20230505 EJ
const getUser = async (_req: Request, res: Response) => {
    const response = await UserModel.getUser();

    if (response) {
        res.status(200).json({ data: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
};

// CRUD test function with MongoDB
// const getSingleUser = async (idArray: string[]) => {
//     console.log("Backend response3");
//     try {
//         const user = await UserModel.getSingleUser(idArray);
//         console.log(user)

//         if (user) {
//             console.log("Get single user data:", user);
//             return user;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error("Error retrieving user:", error);
//         return null;
//     }
// };


const getSingleUser = async (idValue: string) => {
    console.log("Backend response3");
    console.log(typeof(idValue))
    console.log(idValue)
    try {
        const users = await UserModel.getSingleUser(idValue);
        // console.log(users);

        if (users !== null) {
            console.log("Get single user data:", users);
            return users;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        return null;
    }
};



export default module.exports = {
    createUser,
    validateUser,
    getUser, //20230505 EJ
    getSingleUser
};