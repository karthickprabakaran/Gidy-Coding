import express from 'express';
import cors from 'cors';
import router from './routes/auth.js';
import dbConnection from './db/db.js';
import productRouter from './routes/product.js';

const app  = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth/', router);
app.use('/api/products', productRouter); 

app.listen('3000', () => {
    dbConnection();
    console.log("Server is running on port 3000 ....");
});