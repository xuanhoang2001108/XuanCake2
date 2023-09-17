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
import { Link } from "react-router-dom";

export default function CakeManagement() {
  const [basicModal, setBasicModal] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [selectedCakeType, setSelectedCakeType] = useState("");
  const [selectedCake, setSelectedCake] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

    setFormData({
      image: selectedCake.image,
      name: selectedCake.name,
      type: selectedCake.type,
      tax: selectedCake.tax,
      price: selectedCake.price,
      description: selectedCake.description,
    });
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
        `https://xuancakebe.onrender.com/cake/deleteCake/${cakeId}`
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
      const res = await axios.get(
        `https://xuancakebe.onrender.com/cake/searchCake?searchTerm=${searchTerm}`
      );
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCakeData();
  }, [searchTerm]);

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

    if (name === "searchTerm") {
      setSearchTerm(value);
    }
  };

  const handleSave = async () => {
    const { image, name, type, tax, price, description } = formData;

    // Check if any required field is missing
    if (!image || !name || !type || !tax || !price || !description) {
      toast.error("Please enter all the required fields");
      return;
    }

    try {
      const res = selectedCake;
      await axios.patch(
        `https://xuancakebe.onrender.com/cake/updateCake/${selectedCake._id}`,
        formData
      );

      if ((res.status = 200)) {
        toast.success("Cake updated successfully");
        toggleShow();
        getAllCakeData();
        setSearchTerm("");
      } else {
        toast.error("Failed to update cake");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <input
        className="mb-2"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

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
            <tr key={item._id}>
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

      <Link className="btn btn-primary" rounded="true" size="sm" to="/AddCake">
        Add
      </Link>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Cake</MDBModalTitle>
              <button
                type="button"
                className="btn-close"
                onClick={toggleShow}
                aria-label="Close"
              ></button>
            </MDBModalHeader>
            <MDBModalBody>
              <Form.Control
                className="mb-2"
                value={formData.image}
                name="image"
                placeholder="Image"
                onChange={handleInputChange}
              />
            
              <Form.Control
                className="mb-2"
                value={formData.name}
                placeholder="Name"
                name="name"
                onChange={handleInputChange}
              />

              <Form.Select
                className="mb-2 "
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Select Type</option>
                <option value="Sweet">Sweet</option>
                <option value="Salty">Salty</option>
              </Form.Select>

              <Form.Control
                className="mb-2"
                value={formData.tax}
                placeholder="Tax"
                name="tax"
                onChange={handleInputChange}
              />
              <Form.Control
                className="mb-2"
                value={formData.price}
                placeholder="Price"
                name="price"
                onChange={handleInputChange}
              />
              <Form.Control
                  as="textarea"
                className="mb-2"
                value={formData.description}
                placeholder="Description"
                name="description"
                onChange={handleInputChange}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <button className="btn btn-secondary" onClick={toggleShow}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer />
    </>
  );
}
