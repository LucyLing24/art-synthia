import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
  import Home from './Pages/Home';
import Details from './Pages/Details';
import Create from "./Pages/Create";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import Family from "./Pages/Family";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/sketchar/home/:id" element={<Home />}/>
                <Route path="/sketchar/profile/:id" element={<Details />}/>
                <Route path="/sketchar/chat/:id" element={<Chat />}/>
                <Route path="/sketchar/family/:id" element={<Family />}/>
                <Route path="/sketchar/create" element={<Create />}/>
                <Route exact path="/sketchar" element={<Login />}/>
                <Route path="*" element={<Login />}/>
            </Routes>
        </Router>
    );
}

export default App;

