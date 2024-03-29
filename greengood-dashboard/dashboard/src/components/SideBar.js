import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/images/logo.png';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Greengood"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard -Greengood</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to={'/productsStats'}>
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Product Stats</span>
                    </Link>
                </li>
                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/UserStats">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>User Stats</span>
                    </a>
                </li>

                {/*<!-- Nav Item - Charts -->
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li> */}

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <a className="nav-link" href="/Tables">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Product Table</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/UserTableWrapper">
                        <i className="fas fa-fw fa-table"></i>
                        <span>User Table</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            
        </React.Fragment>
    )
}
export default SideBar;