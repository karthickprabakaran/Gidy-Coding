import express from 'express';
import Product from '../models/Product.js'; 

const productRouter = express.Router();

// Get all products
productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (error) {
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
        res.status(400).json({ message: 'Error updating product' });
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
        res.status(500).json({ message: 'Error deleting product' });
    }
});

export default productRouter;