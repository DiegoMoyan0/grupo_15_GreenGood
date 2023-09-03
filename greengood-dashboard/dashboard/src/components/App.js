import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper'
import UserStats from './UserComponents/UserStats'
import UserDetailCard from './UserComponents/UserDetailCard'
import Tables from './TablesComponents/Tables'
import UserTableWrapper from './UserComponents/UserTableWrapper'
import ProductDetail from './TablesComponents/ProductDetail'
import ProductsStats from './ProductsComponents/ProductsStats';

function App() {
  return (
    <Router>
      <>
        <div id="wrapper">
          <SideBar />
          <Routes>
            <Route path="/" exact={true} element={ <ContentWrapper />}/>
            <Route path="/UserStats" exact={true} element={<UserStats />}/>
            <Route path="/productsStats" exact={true} element={<ProductsStats />}/>
            <Route path="/Tables" exact={true} element={<Tables />}/>
            <Route path="/UserTableWrapper" exact={true} element={<UserTableWrapper />}/>
            <Route path="/product/:id/detail" element={<ProductDetail/>}/>
            <Route path="/user/:id/detail" exact={true} element={<UserDetailCard/>}/>
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
