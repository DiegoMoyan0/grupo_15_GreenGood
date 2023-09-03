import React from 'react';
import UserTable from './UserTable'

function UserTableWrapper() {
  
  return (
    <React.Fragment>
          <div className="container-fluid">
            <div className="row mt-5 p-3">
              <div className="col">
                <h3 className="mt-4 ml-4 mb-0 mr-4 p-4 text-center text-white bg-dark">Listado de todos los usuarios de la base de datos Green Good</h3>
                <UserTable title="User Table" />
              </div>
            </div>
          </div>
    </React.Fragment>
  );
}

export default UserTableWrapper;
