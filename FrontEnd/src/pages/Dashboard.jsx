import React, { useEffect, useState } from 'react';
import ProductBox from '../components/Product-box'; // Display products here
import axios from 'axios';
import Modal from '../components/Modal'; // Import Modal component
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import Navbar from '../components/Navbar';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); // Track which product is being edited
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  const [totalStock, setTotalStock] = useState(0); // Total stock
  const [totalAmount, setTotalAmount] = useState(0); // Total value of stock

  // Fetch products and totals when the component mounts
  useEffect(() => {
    const fetchProductsAndTotals = async () => {
      try {
        // Fetch products
        const productResponse = await axios.get('http://localhost:3000/api/products');
        setProducts(productResponse.data);

        // Fetch totals
        const totalsResponse = await axios.get('http://localhost:3000/api/products/totals');
        setTotalStock(totalsResponse.data.totalStock);
        setTotalAmount(totalsResponse.data.totalAmount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndTotals();
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
        toast.success('Product updated successfully!'); // Toast on success
      } else {
        // Adding a new product
        const response = await axios.post('http://localhost:3000/api/products', productData);
        const updatedProducts = [...products, response.data];
        setProducts(updatedProducts);
        toast.success('Product added successfully!'); // Toast on success
      }

      // Recalculate totals after update or add
      const totalsResponse = await axios.get('http://localhost:3000/api/products/totals');
      setTotalStock(totalsResponse.data.totalStock);
      setTotalAmount(totalsResponse.data.totalAmount);

      setIsModalOpen(false);
      setProductToEdit(null); // Reset after submit
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error('Error while adding or updating the product!'); // Toast on error
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
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
        toast.success('Product deleted successfully!'); // Toast on success

        // Recalculate totals after delete
        const totalsResponse = await axios.get('http://localhost:3000/api/products/totals');
        setTotalStock(totalsResponse.data.totalStock);
        setTotalAmount(totalsResponse.data.totalAmount);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to delete the product'); // Toast on error
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('An error occurred while deleting the product.'); // Toast on error
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setProductToEdit(null); // Reset when opening modal for adding a new product
    }
  };

  // Show loading state while products are being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <>
    <Navbar />
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Product Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Modernized Total Stock and Total Amount */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Totals Overview</h2>

        <div className="flex space-x-4">
          {/* Total Stock */}
          <div className="flex items-center p-4 bg-white shadow-lg rounded-lg w-1/2">
            <div className="flex items-center justify-center bg-blue-100 p-3 rounded-full mr-4">
            <p>🗳️</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Stock</p>
              <p className="text-lg font-bold text-gray-800">{totalStock}</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center p-4 bg-white shadow-lg rounded-lg w-1/2">
            <div className="flex items-center justify-center bg-green-100 p-3 rounded-full mr-4 text-black">
              <p>$</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-800">₹{totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Product Button Always Visible */}
      <button
        onClick={toggleModal}
        className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add New Product
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
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

      {/* Ensure that isModalOpen prop is correctly passed */}
      <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        product={productToEdit || {}}  // Pass empty object when adding new product
        onSubmit={handleSubmit}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
    </>
  );
}

export default Dashboard;