import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {MapPage} from "./pages/MapPage"
import {ViewPage} from "./pages/ViewPage/ViewPage"
import {DetailPage} from "./pages/DetailPage/DetailPage"
import {EditPage} from "./pages/EditPage/EditPage"
import {ErrorPage} from "./pages/ErrorPage/ErrorPage"
import {AdminPage} from "./pages/AdminPage/AdminPage"
import {AddPage} from "./pages/AddPage"
import {EMapPage} from 'pages/ExpertSystem/EMapPage'
import {AuthPage} from "./pages/AuthPage/AuthPage";
import {CalculatorPage} from "./pages/ExpertSystem/Calculators/CalculatorPage";
import {ForgotPasswordPage} from "./pages/AuthPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/AuthPage/ResetPasswordPage";

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

            {/*auth */}

            <Route path="/auth/forgot-password">
                <ForgotPasswordPage/>
            </Route>

            <Route path="/auth/reset-password/:token">
                <ResetPasswordPage/>
            </Route>

            <Route path="/auth">
                <AuthPage/>
            </Route>

            <Route path="/error">
                <ErrorPage/>
            </Route>

            {/* expert system */}

            <Route path="/expert-system/solution-localities">
                <CalculatorPage/>
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
