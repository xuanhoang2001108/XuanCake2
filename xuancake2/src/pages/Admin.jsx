import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
function Admin() {
    const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // Lấy email đã lưu từ localStorage
    const email = localStorage.getItem("email");
    console.log("email from local storage:", email);
    setEmail(email);
    if (email) {
      const username = email.split("@")[0];
      setUsername(username);
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Xóa email từ localStorage
        alert(email+" "+" logged out successfully!")
        localStorage.removeItem('email'); 
        // Điều hướng về trang đăng nhập
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button  onClick={handleLogout}>logout</button>
  )
}

export default Admin