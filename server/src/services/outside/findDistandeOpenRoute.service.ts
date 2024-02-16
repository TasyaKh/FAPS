import config from 'config'
import axios, {AxiosResponse} from 'axios';

export class DistanceOpenRoute {

    url: string = config.get('url_openservice');

    async findDist2Points(from = [0, 0], to = [0, 0]) {

        // const query= "driving-car"
        const data = {
            locations: [from, to],
            metrics: ["distance", "duration"]
        }

        const resp: AxiosResponse = await axios.post(`${this.url}matrix/driving-car`, data)

        return {distance:resp?.data?.distances[0][1], duration:resp?.data?.durations[0][1]}
    }

}
