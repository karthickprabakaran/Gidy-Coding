import React from 'react';

const ProductBox = ({ product }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-2">{product.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-bold text-green-600">{`$${product.price}`}</p>
        <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
      </div>
      
    </div>
  );
};

export default ProductBox;