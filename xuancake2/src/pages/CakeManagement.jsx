import React, { useState } from "react";

import {
  MDBBadge,
  MDBModalHeader,
  MDBBtn,
  MDBModalBody,
  MDBTable,
  MDBTableBody,
  MDBModal,
  MDBTableHead,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";

export default function CakeManagement() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
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
                  src="/images/product-1.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1 ml-1">Mini Dozen</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1"> Sweet</p>
            </td>
            <td>
              <MDBBadge color="success">Active</MDBBadge>
            </td>
            <td>7$</td>
            <td>
              <button
                className="btn btn_primary"
                rounded
                size="sm"
                onClick={toggleShow}
              >
                Edit
              </button>
            </td>
          </tr>
        </MDBTableBody>
        <button className="btn btn_primary" rounded size="sm"  onClick={toggleShow}>
          Add
        </button>
      </MDBTable>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Cake profile</MDBModalTitle>
              <div className="btn btn-close" color="none" onClick={toggleShow}>
                <i className="fa fa-times"></i>
              </div>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>

            <MDBModalFooter>
              <div className="btn btn-primary btn-sm" onClick={toggleShow}>
                Close
              </div>
              <div className="btn btn-primary btn-sm">Save</div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
