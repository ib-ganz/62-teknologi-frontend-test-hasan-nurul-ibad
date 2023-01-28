import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import BusinessDetail from "./pages/BusinessDetail";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/home" children={<Home/>}/>
                    <Route path="/business/:id" children={<BusinessDetail/>}/>
                    <Redirect from="/" to="/home"/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
