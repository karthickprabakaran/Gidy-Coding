// routes/product.js
import express from 'express';
import Product from '../models/Product.js'; 
import middleware from '../middleware/middleware.js'; 

const productRouter = express.Router();

productRouter.get('/', middleware, async (req, res) => {
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

productRouter.post('/', middleware, async (req, res) => {
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

productRouter.put('/:id', middleware, async (req, res) => {
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

export default productRouter;