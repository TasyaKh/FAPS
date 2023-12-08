// import React, { useCallback, useEffect, useState } from 'react'
// import { useHttp } from 'hooks/http.hook'
// import { Button, ProgressBar } from 'react-materialize'
// import { FilterPointsLocalities } from 'components/ExpertSystem/FilterPointsLocalities'
// import './PointsLocalities.scss'
// import { TablePoints } from 'components/ExpertSystem/TablePoints'
// import { TemplateModal } from 'components/ExpertSystem/Modals/MCPoints/TemplateModal'
//
// export const PointsLocalities = () => {
//
//     // constants ----------------------------------------------------------------
//
//     const { loading, error, request, clearError } = useHttp()
//
//     const [state, setState] = useState({
//         modified: [],
//         isFaps: false,
//     })
//
//     const [isFaps, setIsFaps] = useState(false)
//
//     const [pointsCalculatorState, setPointsCalculatorState] = useState({
//         show: false
//     })
//
//     const [filters, setFilters] = useState({
//
//         district_id: 0
//
//     })
//
//     useEffect(() => {
//         if (error) {
//             console.log('Ошибка: ' + error)
//         }
//         clearError()
//     }, [clearError, error])
//
//
//     useEffect(() => {
//         fetchData(filters, isFaps)
//
//     }, [isFaps])
//
//     // useEffect ----------------------------------------------------------------
//
//     const updateData = (value, faps) => {
//
//         setState({
//             modified: value,
//             isFaps: faps
//         })
//
//     }
//
//     const handlePointsCalculatorButtonClick = () => {
//         setPointsCalculatorState({ ...pointsCalculatorState, 'show': !pointsCalculatorState.show })
//
//     }
//
//     const handlePointsCalculatorHide = () => {
//         setPointsCalculatorState({ ...pointsCalculatorState, 'show': !pointsCalculatorState.show })
//     }
//
//     const handleCalculateButton = (body)=>{
//        setFilters({district_id: body.district_id})
//        fetchData(body, isFaps)
//     }
//
//     const fetchData = useCallback(async (body, faps) => {
//
//         setFilters(body)
//         try {
//             let req =  '/api/points.ts/localities'
//             const fetched = await request(req, 'POST', body)
//            // console.log(fetched)
//             updateData(fetched, faps)
//
//         } catch (e) { }
//     }, [request])
//
//
//     return (
//         <div className="view">
//
//             <div className="container">
//
//                 <div className='container__filter'>
//                     <FilterPointsLocalities
//                         fetchData={fetchData}
//                         district_id={filters.district_id}
//                         setIsFaps={setIsFaps}
//                         isFaps={isFaps}
//                         setFilters = {setFilters}                     // handleSelectChange = {handleSelectChange}
//                         // handleSelect = {handleSelect}
//                     />
//                 </div>
//
//                 <Button
//                     className="btn-floating"
//                     node="button"
//                     waves="light"
//                     onClick={handlePointsCalculatorButtonClick}>
//                     <i className="material-icons medium icon-floating">settings</i>
//                 </Button>
//
//                 <div className="table-container">
//                     {/* TablePoints */}
//                     {
//                         loading ? <ProgressBar /> :
//                             state.modified.length === 0 ? 'Элементов не найдено, пожалуйста, измените критерии поиска' :
//                                 <TablePoints
//                                     data={state.modified}
//                                     isFaps={state.isFaps}
//                                 />
//                     }
//
//                 </div>
//
//                 {pointsCalculatorState.show &&
//                     <TemplateModal
//                         hide={handlePointsCalculatorHide}
//                         // closeModal={handlePointsCalculatorButtonClick}
//                         pointsButtonVisible={false}
//                         area={undefined}
//                         handleCalculateButton = {handleCalculateButton}
//                     />
//                 }
//             </div>
//
//         </div>
//     )
// }
//
//
