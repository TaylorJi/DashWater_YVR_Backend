import axios from "axios";

class AppCacheManager {
    /**
     * AppCacheManager is the AppCache class meant to be instantiated as a singleton cache
     * with a given cacheRefreshRate.
     */

    readonly timestreamRefreshRate = 3600000;

    readonly tideRefreshRate = 86400000; // 1 day
    readonly stevestonLat = '49.1337';
    readonly stevestonLong = '123.1793';

    // private cachedDeviceData: Array<JSON> | null;
    // private timestreamInterval: NodeJS.Timer | null;

    private cachedTideData: tideDataType | null;
    private tideInterval: NodeJS.Timer | null;

    constructor() {
        // this.cachedDeviceData = null;
        // this.timestreamInterval = null;
        this.cachedTideData = null;
        this.tideInterval = null;

    };

    public getTideData = async () => {

        if (!this.cachedTideData) {
            await this.fetchTideData();
        }

        return this.cachedTideData;

    };

    public registerTideCache = async () => {

        const tideData = await this.fetchTideData();

        if (tideData) {
            this.cachedTideData = tideData;

        } else {
            return null;
        }

        this.tideInterval = setInterval(async () => {

            const refreshedTideData = await this.fetchTideData();
            this.cachedTideData = refreshedTideData;

        }, this.tideRefreshRate);

        return this.tideInterval;
    };

    private fetchTideData = async () => {

        try {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow =
                new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

            const response = await axios.get(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${this.stevestonLat}&lng=${this.stevestonLong}&start=${today}&end=${tomorrow}`,
                { headers: { Authorization: process.env.TIDE_API_KEY } }
            );

            if (response.status === 200) {

                const data = response.data.data;

                const tideHeights = data.map((interval: any) => interval['sg']);

                const highest = Math.max(...tideHeights);
                const lowest = Math.min(...tideHeights);

                const tideData: tideDataType = {
                    high: highest,
                    low: lowest,
                    highTime: '',
                    lowTime: ''
                };

                data.map((interval: any) => {
                    if (interval['sg'] === highest) {
                        tideData['highTime'] = this.timeHelper(interval['time']);

                    } else if (interval['sg'] === lowest) {
                        tideData['lowTime'] = this.timeHelper(interval['time']);
                    }
                });

                return tideData;
            }
            return null;

        } catch (_err) {
            return null;
        }

    };


    private timeHelper = (timeString: string) => {

        let splitTimeDay = timeString.split('T')[1];
        return splitTimeDay.split('+')[0];

    };

    // public registerTS = async () => {

    //     const deviceData = null;

    //     if (deviceData) this.cachedDeviceData = deviceData;

    //     this.timestreamInterval = setInterval(async () => {
    //         const newDeviceData = await this.fetchData();
    //         this.cachedDeviceData = newDeviceData;
    //     }, this.timestreamRefreshRate);

    //     return this.timestreamInterval;

    // };

    // private fetchTSData = async () => {
    //     try {

    //         // TODO: Write fetch query

    //     } catch (_err) {
    //         return null;
    //     }
    // };

    // public getCachedData = async () => {
    //     if (!this.cachedDeviceData) {
    //         this.cachedDeviceData = await this.fetchData();
    //     }
    //     return this.cachedDeviceData;
    // };
}

const AppCache = new AppCacheManager();

export default AppCache;