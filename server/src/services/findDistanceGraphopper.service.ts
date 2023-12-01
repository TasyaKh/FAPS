import * as config from 'config'

export class Distance {

    defaultKey: string = config.get('api_graphopper');
    url: string = config.get('url_graphopper');

    async findDist2Points(from = [0, 0], to = [0, 0]) {


        const query = new URLSearchParams({
            key: this.defaultKey
        }).toString();

        const resp = await fetch(
            `${this.url}route?${query}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    points: [
                        from,
                        to
                    ],
                    // point_hints: [
                    //     'Lindenschmitstraße',
                    //     'Thalkirchener Str.'
                    // ],
                    snap_preventions: [
                        'motorway',
                        'ferry',
                        'tunnel'
                    ],
                    details: ['road_class', 'surface'],
                    vehicle: 'car',
                    locale: 'en',
                    instructions: true,
                    calc_points: true,
                    points_encoded: false
                })
            }
        );

        const data = await resp.json();
        console.log(data);
        return data
    }

    async findDistanceMultipleLocalities(from_points:number[][], to_points:number[][]) {

        const query = new URLSearchParams({
            key:this.defaultKey
        }).toString();

        const resp = await fetch(
            `${this.url}matrix?${query}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from_points: from_points,
                    to_points: to_points,
                    // from_point_hints: [
                    //     'Copenhagen Street',
                    //     'Richmond Avenue',
                    //     'White Lion Street'
                    // ],
                    // to_point_hints: ['Cannon', 'Cornhill'],
                    out_arrays: [
                        'weights',
                        'times',
                        'distances'
                    ],
                    vehicle: 'car'
                })
            }
        );

        const data = await resp.json();
        console.log(data);

    }
}