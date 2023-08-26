
import {Map, YMaps} from "react-yandex-maps";
import {API_YMAPS, } from "../../constants";
export const EMap = (props) => {

    return (
        <YMaps query={{ lang: 'en_RU', apikey:API_YMAPS}}>
            <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
        </YMaps>
    );
}