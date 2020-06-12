import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'; 

import Home from './pages/Home';
import CreateHouse from './pages/CreateHouse';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={CreateHouse} path="/create-house"/>
        </BrowserRouter>
    )
}

export default Routes;