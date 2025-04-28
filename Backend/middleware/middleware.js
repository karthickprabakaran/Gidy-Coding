import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, "secret");  

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }

        req.user = { id: user._id, name: user.name }; 
        next();  
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }
        console.error(error); 
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export default middleware;