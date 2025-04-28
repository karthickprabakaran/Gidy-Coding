# Gidy-Coding

# Product Inventory Dashboard

## Overview

The **Product Inventory Dashboard** is a web-based application that allows users to manage a product inventory. Users can view a list of products, add new products, update existing products, delete products, and view the total stock and total amount of products in the inventory. This dashboard is designed to simplify product management for small and medium businesses.

The app is built with **React** for the frontend and communicates with a **Node.js** backend. The backend exposes APIs for managing product data, and the frontend handles the user interface.

## Features

- **View Product List**: Display a list of all products in the inventory.
- **Search Products**: Search for products by name.
- **Add New Product**: Add a new product to the inventory.
- **Edit Existing Product**: Modify the details of an existing product.
- **Delete Product**: Remove a product from the inventory.
- **Totals Overview**: View total stock and total value of all products.
- **Logout**: Allows the user to log out from the dashboard.
- **Home Button**: Redirects to the homepage.

## Technologies Used

- **Frontend**:
  - React.js
  - Axios (for API requests)
  - React Toastify (for notifications)
  - React Router (for navigation)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for storing product data)
- **Others**:
  - Tailwind CSS (for styling)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Installation

1. Clone the repository

```
git clone https://github.com/karthickprabakaran/Gidy-Coding.git

cd Gidy-Coding
```

2. Set up the Backend

Change MongoDB URI: Open the backend .env file and replace the default MongoDB URI with your own.

```
MONGODB_URI=your-mongodb-uri
```

3.Navigate to the backend folder:

```
cd backend
```

4.Install dependencies:
```
npm install
```

5.Start the backend server:
```
npm start
```

## Set up the Frontend

1. Navigate to the frontend folder:

 ```
cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend server:

```
npm run dev
```
4. Visit the App
	•	Open your browser and visit:
```
http://localhost:5173
```

## Using the App

1. **Login**: To access the dashboard, you need to log in. You can implement authentication or simulate a login for development purposes.
2. **Dashboard**: Once logged in, you will see the product dashboard with options to add, edit, delete, and search products.
3. **Product Details**: Click on a product to edit its details.
4. **Add Product**: Use the ‘Add New Product’ button to create new entries in the inventory.

## API Endpoints (Backend)

- **GET `/api/products`**: Fetch all products.
- **POST `/api/products`**: Add a new product to the inventory.
- **PUT `/api/products/:id`**: Update a product’s details.
- **DELETE `/api/products/:id`**: Delete a product from the inventory.
- **GET `/api/products/totals`**: Get the total stock and total value of all products.

## Security Features

### 1. **JWT Authentication**
   - Secures access to API routes by issuing a token upon successful login.
   - Token is stored on the client side and sent with each request to authenticate.

### 2. **SQL Injection Protection**
   - Use parameterized queries or ORMs like **Mongoose** to prevent SQL injection attacks.

### 3. **Cross-Site Scripting (XSS) Protection**
   - Sanitize user input to prevent malicious scripts from being executed on the frontend.
   - Use libraries like **DOMPurify** to clean user-generated content.

### 4. **CORS**
   - Configure **CORS** middleware to restrict access to your API from authorized domains only.

### 5. **Environment Variables (.env)**
   - Store sensitive information (e.g., JWT secret, MongoDB URI) securely in an `.env` file.
   - Use the **dotenv** package to load these variables into the application.



