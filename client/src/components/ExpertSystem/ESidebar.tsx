import './ESidebar.scss'
import React, {FC, useContext, useState} from 'react'
import {Skeleton} from "../FAPS/Skeleton";
import {MapContext} from "../../context/MapContext";
import {ESearchAndFilter} from "./Search/ESearchAndFilter";
import {ListViewLocalities} from "./Locality/ListViewLocalities";
import CustomScrollbars from "../FAPS/CustomScrollbar";
import {SingleLocality} from "./Locality/SingleLocality";
import {IFilterEMap} from "../../pages/ExpertSystem/EMapPage";

interface ESidebarProps {
    localities: any,
    loading: boolean,
    filters: IFilterEMap,
    onFilterChanged: (filter: IFilterEMap) => void,
    hiddenSidebar: boolean,
    setHiddenNavigation: (hidden: boolean) => void,
    setHiddenSidebar: (hidden: boolean) => void,

}

export const ESidebar: FC<ESidebarProps> = ({

                                                localities,
                                                loading,
                                                filters,
                                                onFilterChanged,
                                                hiddenSidebar,
                                                setHiddenNavigation,
                                                setHiddenSidebar
                                            }) => {

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

    const handleInputSearch = (e: any) => {
        const txt =  e.target.value.trim().toLowerCase()
        setState({...state, 'search':txt})
        onFilterChanged({...filters, search: txt})
    }

    const handlePanelScroll = (e: any) => {}


    const handleToggleButton = () => {
        setHiddenSidebar(!hiddenSidebar)

        if (hiddenSidebar)
            setHiddenNavigation(true)
    }

    // from ListViewLocalities
    // ----------------------------------------------------------------------------------------------------
    const handleLocalityTitleClick = (e: any, localityAndMc: any) => {

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

    const handleMedicalCenterClick = (e: any, localityAndMc: any, isMC: any) => {

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

    function handleBack(e: any) {
        setSingleLocality({
            flag: false,
            id: null
        })
    }

    return (
        <div className={`sidebar ${hiddenSidebar && 'sidebar--hidden'}`}>

            <button
                className="sidebar__toggle-button sidebar__toggle-button--a"
                onClick={handleToggleButton}
            >
            </button>

            <div className="sidebar__wrapper">

                <ESearchAndFilter
                    filterShow={state.filter.show}
                    scroll={state.scroll}
                    handleInput={handleInputSearch}
                    handleFilter={handleFilterButton}
                    onFilterChanged={onFilterChanged}
                    filters={filters}
                />

                <div
                    className="sidebar__panel"
                >
                    {
                        loading ?
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
                                        back={(e: any) => handleBack(e)}
                                    />
                                    :
                                    <ListViewLocalities
                                        localities={localities}
                                        onLocalityTitleClick={handleLocalityTitleClick}
                                        onMedicalCenterClick={handleMedicalCenterClick}
                                    />
                                }
                            </CustomScrollbars>
                    }
                </div>

            </div>

        </div>
    )
}
