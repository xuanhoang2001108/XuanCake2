import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import {
  MDBModalHeader,
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CakeManagement() {
  const [basicModal, setBasicModal] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [selectedCakeType, setSelectedCakeType] = useState("");
  const [selectedCake, setSelectedCake] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    type: "",
    tax: "",
    price: "",
    comment: "",
    description: "",
  });

  const toggleShow = () => {
    setBasicModal(!basicModal);
    setSelectedCake(null);
    if (selectedCake) {
      setFormData({
        image: selectedCake.image,
        name: selectedCake.name,
        type: selectedCake.type,
        tax: selectedCake.tax,
        price: selectedCake.price,
        description: selectedCake.description,
      });
    } else {
      setFormData({
        image: "",
        name: "",
        type: "",
        tax: "",
        price: "",
        description: "",
      });
    }
  };
  const editCake = (cake) => {
    setSelectedCake(cake);
    setFormData({
      image: cake.image,
      name: cake.name,
      type: cake.type,
      tax: cake.tax,
      price: cake.price,
      description: cake.description,
    });
    setBasicModal(true);
  };

  const deleteCake = async (cakeId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/cake/deleteCake/${cakeId}`
      );
      if (res.status === 200) {
        toast.success("Cake deleted successfully");
        getAllCakeData(); // Refresh the cake data after deletion
      } else {
        toast.error("Failed to delete cake");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllCakeData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cake/getAllCake`);
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllCakeData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "type") {
      setSelectedCakeType(value);
    }

    if (selectedCake) {
      setSelectedCake((prevSelectedCake) => ({
        ...prevSelectedCake,
        [name]: value,
      }));
    }
  };

  const handleAdd = async () => {
    const { image, name, type, tax, price, description } = formData;

    // Check if any required field is missing
    if (!image || !name || !type || !tax || !price || !description) {
      toast.error("Please enter all the required fields");
      return;
    }

    try {
      const res = selectedCake
        ? await axios.patch(
            `http://localhost:5000/cake/updateCake/${selectedCake._id}`,
            formData
          )
        : await axios.post("http://localhost:5000/cake/postCake", formData);

      if (res.status >= 200 && res.status < 300) {
        const message = selectedCake
          ? "Cake updated successfully"
          : "Cake added successfully";
        toast.success(message);
        toggleShow();
        getAllCakeData();
      } else {
        const errorMessage = selectedCake
          ? "Failed to update cake"
          : "Failed to add cake";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col">Name</th>
            <th scope="col" className="text-center">
              Type
            </th>
            <th scope="col" className="text-center">
              Tax
            </th>
            <th scope="col" className="text-center">
              Price
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {storeData.map((item, index) => (
            <tr key={index}>
              <td className="text-center">
                <strong>{index + 1}</strong>
              </td>
              <td className="text-center">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1 ml-1">{item.name}</p>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1"> {item.type}</p>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1"> {item.tax}$</p>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1"> {item.price}$</p>{" "}
              </td>
              <td className="text-center">
                <button
                  className="btn btn-primary"
                  size="sm"
                  onClick={() => editCake(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger ml-1"
                  size="sm"
                  onClick={() => deleteCake(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <button
        className="btn btn_primary"
        rounded="true"
        size="sm"
        onClick={toggleShow}
      >
        Add
      </button>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {selectedCake ? "Edit Cake" : "Add Cake"}
              </MDBModalTitle>

              <div className="btn btn-close" color="none" onClick={toggleShow}>
                <i className="fa fa-times"></i>
              </div>
            </MDBModalHeader>
            <MDBModalBody>
              <Form.Control
                className="mb-2"
                value={selectedCake ? selectedCake.image : formData.image}
                name="image"
                placeholder="Image"
                onChange={handleInputChange}
              />
              <Form.Control
                className="mb-2"
                value={selectedCake ? selectedCake.name : formData.name}
                placeholder="Name"
                name="name"
                onChange={handleInputChange}
              />

              <Form.Select
                className="mb-2 "
                name="type"
                value={selectedCake ? selectedCake.type : formData.type}
                onChange={handleInputChange}
              >
                <option value="">Select Type</option>
                <option value="Sweet">Sweet</option>
                <option value="Salty">Salty</option>
              </Form.Select>

              <Form.Control
                className="mb-2"
                value={selectedCake ? selectedCake.tax : formData.tax}
                placeholder="Tax"
                name="tax"
                onChange={handleInputChange}
              />
              <Form.Control
                className="mb-2"
                value={selectedCake ? selectedCake.price : formData.price}
                placeholder="Price"
                name="price"
                onChange={handleInputChange}
              />
              <Form.Control
                className="mb-2"
                value={
                  selectedCake ? selectedCake.description : formData.description
                }
                placeholder="Description"
                name="description"
                onChange={handleInputChange}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <div className="btn btn-primary btn-sm" onClick={toggleShow}>
                Close
              </div>
              <div className="btn btn-primary btn-sm" onClick={handleAdd}>
                {selectedCake ? "Save" : "Add"}
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer />
    </>
  );
}
