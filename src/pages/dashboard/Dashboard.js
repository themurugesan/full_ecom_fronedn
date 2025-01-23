import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardHeader from "../header/cardHeader";  
import axios from 'axios';  
import "./Dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);  
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []); 

  useEffect(() => {
    fetchImages();  // Fetch images when the component mounts
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/images');
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Handle adding an image to the cart
  const handleAddToCart = async(image) => {
    const existingItem = cart.find(item => item._id === image._id);
    let updatedCart;
    if (existingItem) {
      // Update quantity if the item already exists in the cart
      updatedCart = cart.map(item =>
        item._id === image._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new item to cart
      updatedCart = [...cart, { ...image, quantity: 1 }];
    }
    // Set the updated cart in state and localStorage
    setCart(updatedCart);
    const cartdetials=await axios.post("http://localhost:5000/api/cart",updatedCart,{
      headers:{
        Authorization:localStorage.token
      }
    })
    


    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle navigating to cart page
  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <CardHeader />
      <div className="app-container">
        <h1 className="heading">Category</h1>
        <h2>Phone</h2> {/* Example category, update if necessary */}

        <div className="images-container">
          {images.map((image) => (
            <div key={image._id} className="image-card">
              <h2 className="image-title">{image.title}</h2>
              <p className="image-description">{image.description}</p>
              <p className="image-price">Price: ${image.amount}</p>
              <img
                className="image-thumbnail"
                src={`http://localhost:5000/${image.image}`}
                alt={image.title}
              />
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(image)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* View Cart Button */}
        <button className="view-cart-btn" onClick={handleViewCart}>
          View Cart
        </button>
      </div>
    </>
  );
};

export default Dashboard;
