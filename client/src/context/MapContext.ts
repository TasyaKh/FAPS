import {createContext} from 'react'

function noop(fields:{}) {}

export const MapContext = createContext({
  mapState: {},
  zoom: 9,
  center: [37.588144, 55.733842],
  setMapState: noop
})
