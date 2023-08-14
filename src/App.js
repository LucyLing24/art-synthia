import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
  import Home from './Pages/Home';
import Details from './Pages/Details';
import Create from "./Pages/Create";
import Login from "./Pages/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/artsynthia/home/:id" element={<Home />}/>
                <Route path="/artsynthia/profile/:id" element={<Details />}/>
                <Route path="/artsynthia/create" element={<Create />}/>
                <Route exact path="/artsynthia" element={<Login />}/>
                <Route path="*" element={<Login />}/>
            </Routes>
        </Router>
    );
}

export default App;

