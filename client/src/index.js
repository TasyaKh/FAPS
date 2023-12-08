import React from 'react'
import ReactDOM from 'react-dom'
import 'materialize-css/dist/css/materialize.min.css'
import App from './App'
import {Provider} from "react-redux";
import store from "./store";
import {QueryClient, QueryClientProvider} from "react-query";

document.documentElement.lang = 'ru'
const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>

        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <App/>
            </Provider>
        </QueryClientProvider>

    </React.StrictMode>,
    document.getElementById('root')
)