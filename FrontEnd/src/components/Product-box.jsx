import React from 'react';

function ProductBox({ product, onEdit, onDelete }) {
  const { id, name, description, price, imageUrl } = product;

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="font-medium text-gray-900 mb-4">Price: ${price}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onEdit({ id, name, description, price, imageUrl })}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductBox;