import mongoose from 'mongoose' ;

const dbConnection  = async() =>{
    try{
        await mongoose.connect("mongodb+srv://karthick:<db_password>@product.joyvvo4.mongodb.net/?retryWrites=true&w=majority&appName=Product");
        console.log("Database Connection Successfull..");
    }
    catch(error)
    {
        console.log(error);
        
    }
};

export default dbConnection;