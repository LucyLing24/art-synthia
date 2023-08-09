import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
  import Home from './Pages/Home';
import Details from './Pages/Details';
import Create from "./Pages/Create";
import Login from "./Pages/Login";

function App() {
    return (
        <Router basename="/art-Synthia">
            <Routes>
                <Route path="/home/:id" element={<Home />}/>
                <Route path="/details/:id" element={<Details />}/>
                <Route path="/create" element={<Create />}/>
                <Route exact path="/" element={<Login />}/>
                <Route path="*" element={<Home />}/>
            </Routes>
        </Router>
    );
}

export default App;

