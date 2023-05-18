import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function OrderManagement() {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Position</th>
          <th scope="col">Status</th>
          <th scope="col">Date start</th>
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
                src="/images/team-2.jpg"
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1 ml-1">Xuan Hoang</p>
                
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1"> Main chef</p>
           
          </td>
          <td>
            <MDBBadge color="success" >
              Active
            </MDBBadge>
          </td>
          <td>15-01-2016</td>
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
