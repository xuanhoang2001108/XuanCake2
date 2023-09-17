import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebaseConfig";
function AddCake() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    type: "",
    tax: "",
    price: "",
    description: "",
  });

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please choose an image first.");
      return null;
    }
  
    try {
      setUploading(true);
  
      // Create a reference to the storage location where you want to upload the image
      const storageRef = storage.ref(`images/${image.name}`);
  
      // Upload the image to Firebase Storage
      await storageRef.put(image);
  
      // Get the download URL of the uploaded image
      const imageUrl = await storageRef.getDownloadURL();
  
      // Save the image URL to state
      setImageUrl(imageUrl);
  
      toast.success("Image uploaded successfully.");
      return imageUrl; // Return the image URL
    } catch (error) {
      console.log(error.message);
      return null; // Return null if there was an error
    } finally {
      setUploading(false);
    }
  };
  
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    const { name, type, tax, price, description } = formData;
    if (uploading) {
      console.log("Please wait for the image to finish uploading.");
      return;
    }
    if (!name || !type || !tax || !price || !description) {
      toast.error("Please enter all the required fields");
      return;
    }
  
    try {
      // Upload the image and get the image URL
      const imageUrl = await handleUpload();
  
      // If the image was uploaded successfully, add the imageUrl to the form data
      if (imageUrl) {
        const formDataWithImage = { ...formData, image: imageUrl };
  
        const res = await axios.post(
          "https://xuancakebe.onrender.com/cake/postCake",
          formDataWithImage
        );
  
        if (res.status >= 200) {
          toast.success("Cake added successfully");
          setFormData({
            image: "",
            name: "",
            type: "",
            tax: "",
            price: "",
            description: "",
          });
          navigate("/CakeManagement");
        } else {
          toast.error("Failed to add cake");
        }
      } else {
        toast.error("Failed to upload the image.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <div>
      <MDBModalHeader>
        <h1>Add Cake</h1>
      </MDBModalHeader>
      <MDBModalBody>
        <div className="ml-5 mr-5">
          <Form.Group controlId="formFile">
            <Form.Label>Choose an image:</Form.Label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Control
                type="file"
                name="image"
                value={formData.image}
                onChange={handleImageChange}
              />
              <div className="btn" onClick={handleUpload}>
                Upload
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Sweet">Sweet</option>
              <option value="Salty">Salty</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formTax">
            <Form.Label>Tax:</Form.Label>
            <Form.Control
              type="text"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
      </MDBModalBody>
      <MDBModalFooter>
        <Button variant="primary" type="submit" onClick={handleAdd}>
          Add Cake
        </Button>
      </MDBModalFooter>
      <ToastContainer />
    </div>
  );
}

export default AddCake;
