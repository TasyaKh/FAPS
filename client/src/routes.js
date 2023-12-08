import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {MapPage} from "./pages/MapPage"
import {ViewPage} from "./pages/ViewPage"
import {DetailPage} from "./pages/DetailPage"
import {EditPage} from "./pages/EditPage"
import {ErrorPage} from "./pages/ErrorPage"
import {AdminPage} from "./pages/AdminPage"
import {AddPage} from "./pages/AddPage"
// import {PointsLocalities} from 'pages/ExpertSystem/PointsLocalities'
import {EMapPage} from 'pages/ExpertSystem/EMapPage'
import {SolutionsLocalitiesPage} from "./pages/ExpertSystem/SolutionLocalities/SolutionsLocalitiesPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                {/*Добавить руты для авторизованного пользователя*/}
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/detail/:id">
                <DetailPage/>
            </Route>
            <Route path="/detail/">
                <Redirect to="/view"/>
            </Route>

            <Route path="/edit/:id">
                <EditPage/>
            </Route>

            <Route path="/edit/">
                <Redirect to="/view"/>
            </Route>

            <Route path="/add/">
                <AddPage/>
            </Route>

            <Route path="/add/:id">
                <Redirect to="/add"/>
            </Route>

            <Route path="/view">
                <ViewPage/>
            </Route>

            <Route path="/management">
                <AdminPage/>
            </Route>

            <Route path="/error">
                <ErrorPage/>
            </Route>

            {/* expert system */}

            {/*<Route path="/expert-system/points-localities">*/}
            {/*    <PointsLocalities/>*/}
            {/*</Route>*/}

            <Route path="/expert-system/solution-localities">
                <SolutionsLocalitiesPage/>
            </Route>

            <Route path="/expert-system">
                <EMapPage/>
            </Route>


            {/* expert system */}

            <Route path="/">
                <MapPage/>
            </Route>


            <Redirect to="/"/>
        </Switch>
    )
}