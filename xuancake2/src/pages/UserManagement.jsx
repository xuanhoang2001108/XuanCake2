import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function UserManagement() {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Order count</th>
          <th scope="col">Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            {" "}
            <strong>1</strong>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <img
                src=""
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1 ml-1">a</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1"> a@gmail.com</p>
          </td>
          <td>
            <p className="fw-normal mb-1"> 123456</p>
          </td>
          <td>
            {" "}
            <p className="fw-normal mb-1"> 4</p>
          </td>
          <td>
            <button className="btn btn_primary" rounded size="sm">
              Edit
            </button>
          </td>
        </tr>
      </MDBTableBody>
      <button className="btn btn_primary" rounded size="sm">
        Add
      </button>
    </MDBTable>
  );
}
