import express from 'express';
import Product from '../models/Product.js'; 

const productRouter = express.Router();

// Get all products
productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Add a new product
productRouter.post('/', async (req, res) => {
    const { name, price, quantity, image } = req.body;

    if (!name || !price || !quantity || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({ name, price, quantity, image });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(400).json({ message: 'Error saving product' });
    }
});

// Update an existing product
productRouter.put('/:id', async (req, res) => {
    const { name, price, quantity, image } = req.body;

    if (!name || !price || !quantity || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, quantity, image },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({ message: 'Error updating product' });
    }
});

// Get totals (total stock and total amount)
productRouter.get('/totals', async (req, res) => {
    try {
      // Aggregate the total stock and total price using the correct field name 'quantity'
      const totals = await Product.aggregate([
        {
          $group: {
            _id: null,
            totalStock: { $sum: '$quantity' }, // Make sure we use 'quantity' here
            totalAmount: { $sum: { $multiply: ['$quantity', '$price'] } },
          },
        },
      ]);
  
      if (totals.length === 0) {
        return res.status(404).json({ message: 'No products found to calculate totals' });
      }
  
      res.json(totals[0]); // Return the totals
    } catch (error) {
      console.error('Error calculating totals:', error);
      res.status(500).json({ message: 'Error calculating totals' });
    }
});

// Delete a product
productRouter.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

export default productRouter;