import React from 'react';
import UserTable from './UserTable'
import TopBar from "../TopBar";

function UserTableWrapper() {

  return (
    <React.Fragment>
      <div className="container-fluid p-0" style={{ backgroundColor: '#10142F' }}>
        <TopBar />
        <div className="row p-5">
          <div className="col">
            <h3 className="mt-1 ml-4 mb-0 mr-4 p-4 text-center text-white bg-dark">Lista de usuarios - Base de datos GreenGood</h3>
            <UserTable title="User Table" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserTableWrapper;
