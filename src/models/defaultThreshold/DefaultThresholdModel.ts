import DefaultThreshold from "../../config/schemas/DefaultThreshold";

const createDefaultThreshold = async (metric: string, defaultMin: number, defaultMax: number) => {
    try {
        const newDefaultThreshold = await DefaultThreshold.create({ "metric": metric, "defaultMin": defaultMin, "defaultMax": defaultMax });

        if (newDefaultThreshold) {
            return newDefaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const updateDefaultThreshold = async (metric: string, updateData: { [key: string]: number }) => {
    try {
        // const updateData: { [key: string]: number } = {};

        // if (defaultMin) {
        //     updateData["defaultMin"] = defaultMin;
        // }

        // if (defaultMax) {
        //     updateData["defaultMax"] = defaultMax;
        // }

        const updatedDefaultThreshold = await DefaultThreshold.findOneAndUpdate({ "metric": metric }, updateData, {new: true});

        if (updatedDefaultThreshold) {
            return updatedDefaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const deleteDefaultThreshold = async (metric: string) => {
    try {
        const deletedDefaultThreshold = await DefaultThreshold.findOneAndDelete({ "metric": metric });

        if (deletedDefaultThreshold) {
            return deletedDefaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getAllDefaultThresholds = async () => {
    try {
        const defaultThresholds = await DefaultThreshold.find({})

        if (defaultThresholds.length !== 0) {
            return defaultThresholds;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getSingleDefaultThreshold = async (metric: string) => {
    try {
        const defaultThreshold =  await DefaultThreshold.find({ "metric": metric });

        if (defaultThreshold) {
            return defaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}



export default module.exports = {
    createDefaultThreshold,
    updateDefaultThreshold,
    deleteDefaultThreshold,
    getAllDefaultThresholds,
    getSingleDefaultThreshold
}