import './ESidebar.scss'
import React, {useContext, useState} from 'react'
import {Skeleton} from "../FAPS/Skeleton";
import {MapContext} from "../../context/MapContext";
import {ESearch} from "./Search/ESearch";
import {ListViewLocalities} from "./Locality/ListViewLocalities";
import CustomScrollbars from "../FAPS/CustomScrollbar";
import {SingleLocality} from "./Locality/SingleLocality";

export const ESidebar = (props) => {

    const {mapState, setMapState} = useContext(MapContext)

    const [state, setState] = useState({
        scroll: false,
        search: null,
        filter: {
            show: false
        }
    })

    const [singleLocality, setSingleLocality] = useState({
        flag: false,
        id: null
    })

    const handleFilterButton = () => {
        setState({
            ...state, 'filter': {
                ...state.filter,
                show: !state.filter.show
            }
        })
    }

    const HandleInputSearch = (e) => {
        setState({...state, 'search': e.target.value.trim().toLowerCase()})
    }

    const handlePanelScroll = (e) => {
        const scrollTop = e.target.scrollTop

        if (scrollTop > 50) {
            setState({...state, 'scroll': true})
        } else {
            setState({...state, 'scroll': false})
        }
    }


    const handleToggleButton = () => {
        props.setHiddenSidebar(!props.hiddenSidebar)

        if (props.hiddenSidebar)
            props.setHiddenNavigation(true)
    }

    // from ListViewLocalities
    // ----------------------------------------------------------------------------------------------------
    const handleLocalityTitleClick = (e, localityAndMc) => {

        setSingleLocality({
            flag: true,
            id: localityAndMc.locality_id
        })

        if (localityAndMc && localityAndMc.latitude && localityAndMc.longitude)

            setMapState({
                    ...mapState,
                    zoom: 12,
                    center: [localityAndMc.latitude, localityAndMc.longitude]
                }
            )
    }

    const handleMedicalCenterClick = (e, localityAndMc, isMC) => {

        if (isMC) {
            if (localityAndMc && localityAndMc.mc_latitude && localityAndMc.mc_longitude) {
                setMapState({
                    ...mapState,
                    zoom: 12,
                    center: [localityAndMc.mc_latitude, localityAndMc.mc_longitude]
                })
            }
        } else {
            if (localityAndMc && localityAndMc.mcf_latitude && localityAndMc.mcf_longitude) {
                setMapState({
                    ...mapState,
                    zoom: 12,
                    center: [localityAndMc.mcf_latitude, localityAndMc.mcf_longitude]
                })
            }
        }


    }

    function handleBack(e) {
        setSingleLocality({
            flag: false,
            id: null
        })
    }

    return (
        <div className={`sidebar ${props.hiddenSidebar && 'sidebar--hidden'}`}>

            <button
                className="sidebar__toggle-button sidebar__toggle-button--a"
                onClick={handleToggleButton}
            >
            </button>

            <div className="sidebar__wrapper">

                <ESearch
                    filterShow={state.filter.show}
                    scroll={state.scroll}

                    showSettlements={props.showSettlements}
                    showFaps={props.showFaps}

                    onCheckBoxShowFapsClick={props.onCheckBoxShowFapsClick}
                    onCheckBoxShowSettlementsClick={props.onCheckBoxShowSettlementsClick}

                    handleInput={HandleInputSearch}
                    handleFilter={handleFilterButton}
                    onFilterChanged={props.onFilterChanged}
                    filters={props.filters}
                />

                <div
                    className="sidebar__panel"
                >
                    {
                        props.loading ?
                            <div className="sidebar__loader">

                                <Skeleton/>

                                <Skeleton/>

                                <Skeleton/>

                                <Skeleton/>

                            </div> :


                            <CustomScrollbars
                                onScroll={handlePanelScroll}
                            >

                                {singleLocality.flag ?

                                    <SingleLocality
                                        id={singleLocality.id}
                                        key={singleLocality.id}
                                        back={(e) => handleBack(e)}
                                    />
                                    :
                                    <ListViewLocalities
                                        localities={props.localities}
                                        onLocalityTitleClick={handleLocalityTitleClick}
                                        onMedicalCenterClick={handleMedicalCenterClick}
                                    />
                                }
                            </CustomScrollbars>
                    }

                    {/*<Scrollbar />*/}
                </div>

            </div>

        </div>
    )
}