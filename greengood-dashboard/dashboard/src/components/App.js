import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper'
import UserStats from './UserComponents/UserStats'

function App() {
  return (
    <Router>
      <>
        <div id="wrapper">
          <SideBar />
          <Routes>
            <Route path="/" exact={true} element={ <ContentWrapper />}/>
            <Route path="/UserStats" exact={true} element={<UserStats />}/>
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
