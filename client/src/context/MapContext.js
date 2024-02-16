import {createContext} from 'react'

function noop() {}

export const MapContext = createContext({
  mapState: null,
  zoom: 9,
  center: [37.588144, 55.733842],
  setMapState: noop
})

// export const SelectedItem = createContext([])
