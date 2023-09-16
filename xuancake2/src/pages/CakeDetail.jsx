import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { ToastContainer, toast } from "react-toastify";
function CakeDetail() {
  const auth = getAuth();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [cakeData, setCakeData] = useState(null);
  const { productId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const getCakeData = async () => {
      try {
        const res = await axios.get(
          `https://xuan-cake-be-2.vercel.app/cake/getSpecificCake/${productId}`
        );
        if (res.status === 200) {
          setCakeData(res.data);

          const email = localStorage.getItem("email");
          setEmail(email);
          if (email) {
            const username = email.split("@")[0];
            setUsername(username);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCakeData();
  }, [productId]);

  if (!cakeData) {
    return <div>Loading...</div>;
  }
  const submitComment = async () => {
    if (!commentInput) {
      toast.error("Please enter a comment.");
      return;
    }

    const email = getCurrentUserEmail();
    if (!email) {
      toast.error("Please sign in to submit a comment.");
      return;
    }

    try {
      const res = await axios.patch(
        `https://xuan-cake-be-2.vercel.app/cake/updateCake/${productId}`,
        {
          email,
          comment: commentInput,
        }
      );

      if (res.status === 200) {
        toast.success("Comment submitted successfully!");
        setCommentInput("");
        setCakeData(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit comment.");
    }
  };
  const getCurrentUserEmail = () => {
    const email = localStorage.getItem("email");
    if (email) {
      return email;
    }
    if (auth.currentUser) {
      return auth.currentUser.email;
    }
    return null;
  };
  const handleAddToCart = (item) => {
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const updatedCartItems = [...cartItems];

    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity++;
    } else {
      updatedCartItems.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    console.log(updatedCartItems);
    toast.success("Add successfully!");
  };
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="row" key={cakeData._id}>
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      <img id="main-image" src={cakeData.image} width="250" />
                    </div>
                    <div className="thumbnail text-center">
                      <img className="mr-1" src={cakeData.subImage} width="70" />
                      <img src={cakeData.subImage} width="70" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Link to="/Cake">
                          <i className="fas fa-arrow-left "> </i> Go back to
                          shop
                        </Link>
                      </div>
                      <i className="fa fa-shopping-cart text-muted"></i>
                    </div>
                    <div className="mt-4 mb-3">
                      <span className="text-uppercase text-muted brand">
                        Name
                      </span>
                      <h5 className="text-uppercase">{cakeData.name}</h5>
                      <div className="price d-flex flex-row align-items-center">
                        <span className="act-price">${cakeData.price}</span>
                      </div>
                    </div>
                    <p className="about">{cakeData.description}</p>

                    <div className="cart mt-4 align-items-center">
                      <button
                        type="button"
                        className="btn  btn-outline-dark btn-sl" onClick={() => handleAddToCart(cakeData)}
                      > 
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <section>
                <div className=" my-6 py-5">
                  <div className="row d-flex justify-content-center ml-1">
                    <div className="col-md-12 col-lg-10 col-xl-8">
                      <div className="card">
                        <div className="card-body p-4">
                          <h4 className="text-center mb-4 pb-2">
                            Customer's comments
                          </h4>

                          <div className="row">
                            <div className="col">
                              {email ? (
                                <div className="d-flex mb-2">
                                  <Form.Control
                                    type="comment"
                                    placeholder="Add comment"
                                    name="comment"
                                    value={commentInput}
                                    onChange={(e) =>
                                      setCommentInput(e.target.value)
                                    }
                                  />

                                  <button
                                    type="button"
                                    className="btn  btn-outline-dark btn-sl "
                                    onClick={(e) => submitComment(e)}
                                  >
                                    <i className="fa-solid fa-paper-plane"></i>
                                  </button>
                                </div>
                              ) : (
                                <p>Please sign in to add a comment.</p>
                              )}

                              <div className="d-flex flex-start ml-4">
                                <div className="flex-grow-1 ">
                                  {cakeData.comments &&
                                    cakeData.comments.map((comment, index) => (
                                      <div key={index}>
                                        <div className="d-flex justify-content-between align-items-center">
                                          <p className="mb-1 font-weight-bold">
                                            {comment.email}
                                          </p>
                                        </div>
                                        <p className="small mb-0">
                                          {comment.comment}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>{" "}
      <ToastContainer />
    </div>
  );
}

export default CakeDetail;
