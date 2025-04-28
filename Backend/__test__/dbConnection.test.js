import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbConnection from '../path/to/your/dbConnection'; // Adjust the import path
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

let mongoServer;

beforeAll(async () => {
  // Start a MongoDB instance in memory using MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Override the MONGO_URI in environment variables for testing
  process.env.MONGO_URI = mongoUri;
});

afterAll(async () => {
  // Close the MongoDB connection and stop the in-memory server
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Database Connection', () => {
  it('should connect to the in-memory MongoDB instance', async () => {
    await dbConnection(); // Call the dbConnection function

    // Check if mongoose.connect was called with the correct URI
    expect(mongoose.connect).toHaveBeenCalledWith(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  it('should log a success message when the connection is successful', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    
    await dbConnection();

    expect(consoleLogSpy).toHaveBeenCalledWith('Database Connection Successful..');
  });

  it('should log an error message if the connection fails', async () => {
    // Mock the mongoose.connect function to throw an error
    mongoose.connect.mockRejectedValueOnce(new Error('Connection Failed'));

    const consoleErrorSpy = jest.spyOn(console, 'error');

    await dbConnection();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Database Connection Failed: ', expect.any(Error));
  });
});