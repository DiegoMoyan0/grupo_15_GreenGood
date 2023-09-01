import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper'
import UserStats from './UserComponents/UserStats'
import Tables from './TablesComponents/Tables'
import ProductDetail from './TablesComponents/ProductDetail'

function App() {
  return (
    <Router>
      <>
        <div id="wrapper">
          <SideBar />
          <Routes>
            <Route path="/" exact={true} element={ <ContentWrapper />}/>
            <Route path="/UserStats" exact={true} element={<UserStats />}/>
            <Route path="/Tables" exact={true} element={<Tables />}/>
            <Route path="/product/:id/detail" element={<ProductDetail/>}/>
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
