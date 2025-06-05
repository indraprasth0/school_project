// import mongoose from "mongoose";

// //   const username = process.env.MONGO_USERNAME;
// //   const password = process.env.MONGO_PASSWORD;
//   const dbName = process.env.MONGODB_NAME;

// // const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.1qs0yln.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0` || "";

// const MONGODB_URI = process.env.MONGODB_URI! || "";
  
// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
// }

// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// // 👇 global cache setup with default if not present
// const globalWithMongoose = global as typeof global & { mongoose: MongooseCache };

// if (!globalWithMongoose.mongoose) {
//   globalWithMongoose.mongoose = { conn: null, promise: null };
// }

// const cached = globalWithMongoose.mongoose;

// export default async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     mongoose.set("strictQuery", false); // For MongoDB 7+

//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         // dbName: MONGODB_DB,
//         dbName: dbName,
//         bufferCommands: false,
//         serverSelectionTimeoutMS: 5000,
//       } as mongoose.ConnectOptions)
//       .then((mongoose) => {
//         console.log("✅ MongoDB Connected Successfully");
//         return mongoose;
//       })
//       .catch((error) => {
//         console.error("❌ MongoDB Connection Error:", error);
//         throw error;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("Invalid environment variable: MONGODB_URI");
}

// eslint-disable-next-line no-var
var dbConnectionState: mongoose.ConnectionStates = 0;

export const connectDB = async () => {
  try {
    if (dbConnectionState === 1) {
      return Promise.resolve(true);
    }

    const db = await mongoose.connect(MONGODB_URI);
    dbConnectionState = db.connections[0].readyState;
    if (dbConnectionState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};