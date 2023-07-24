import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
  import Home from './Pages/Home';
import Details from './Pages/Details';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home/:id" element={<Home />}/>
                <Route path="/details/:id" element={<Details />}/>
                <Route exact path="/" element={<Home />}/>
                <Route path="*" element={<Home />}/>
            </Routes>
        </Router>
    );
}

export default App;

