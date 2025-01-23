import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../header/Header";

const Admin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json(); // Fixed typo here
      localStorage.setItem("token",result.token)
      console.log(result);
      navigate("/admindashboard"); // Fixed typo in the navigation route

    } catch (error) {
      console.error(error.message);
    } finally {
      setFormData({
        email: "",
        password: ""
      });
    }
  };

  return (
   <> <Header></Header>
   <div className="center-form">
      
      <Form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div></>
  );
};

export default Admin;
