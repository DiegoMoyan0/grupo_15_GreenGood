import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper'
import UserStats from './UserComponents/UserStats'

function App() {
  return (
    <Router>
      <React.Fragment>
        <div id="wrapper">
          <SideBar />
          <Routes>
          <Route path="/" exact element={ <ContentWrapper />}></Route>
           <Route path="/UserStats" exact element={<UserStats />} /></Routes>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
