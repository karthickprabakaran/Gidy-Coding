import React, { useEffect, useState } from 'react';
import ProductBox from '../components/Product-box';  // Display products here
import axios from 'axios';
import Modal from '../components/Modal'; // Import Modal component

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); // Track which product is being edited

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); // No token needed
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Expected an array of products, but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle form submission for adding/editing products
  const handleSubmit = async (productData) => {
    try {
      if (productToEdit) {
        // Editing an existing product
        const response = await axios.put(
          `http://localhost:3000/api/products/${productToEdit._id}`,
          productData
        );

        const updatedProducts = products.map((product) =>
          product._id === productToEdit._id ? response.data : product
        );
        setProducts(updatedProducts);
      } else {
        // Adding a new product
        const response = await axios.post('http://localhost:3000/api/products', productData);
        setProducts((prevState) => [...prevState, response.data]);
      }

      setIsModalOpen(false);
      setProductToEdit(null); // Reset after submit
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  // Handle delete button click
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // If successful, remove the product from the state
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to delete the product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setProductToEdit(null); // Reset when closing modal
  };

  // Show loading state while products are being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Product Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <>
            <p>No products found</p>
            <button
              onClick={toggleModal}
              className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add New Product
            </button>
          </>
        ) : (
          products.map((product) => (
            <div key={product._id}>
              <ProductBox product={product} /> {/* Display product here */}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        product={productToEdit}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Dashboard;