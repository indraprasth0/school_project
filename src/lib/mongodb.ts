// import mongoose from 'mongoose';

// const dbConnect = async () => {
//   if (mongoose.connection.readyState >= 1) {    
//     console.log(
//       `\n MongoDB already connected!! DB HOST: ${mongoose.connection.host}`,
//     );
//     return mongoose.connection.getClient(); 
//   }

//   // const username = process.env.MONGO_USERNAME;
//   // const password = process.env.MONGO_PASSWORD;
//   // const dbName = process.env.MONGODB_NAME;

//   // if (!username || !password || !dbName) {
//   //   throw new Error('MONGO_USERNAME, MONGO_PASSWORD, or MONGODB_NAME is not defined');
//   // }

//   // const uri = `mongodb+srv://${username}:${password}@cluster0.1qs0yln.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
//   const uri = process.env.MONGODB_URI;
//   if (!uri) {
//     throw new Error('MONGODB_URI is not defined');
//   }

//   try {
//     const connection = await mongoose.connect(uri, {
      
//     });    
//     console.log(
//       `\n MongoDB connected successfully!! DB HOST: ${connection.connection.host}`,
//     );
//     return connection.connection.getClient(); 
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     console.log("db :: index.js :: MongoDB connection FAILED", error);    
//     throw error;
//   }
// };

// export default dbConnect;
import { MongoClient } from "mongodb";

// Add type declaration for global._mongoClientPromise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;