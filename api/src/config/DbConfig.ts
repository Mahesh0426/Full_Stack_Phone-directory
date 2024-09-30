import mongoose from "mongoose";

const MONGO_DB_CONNECTION_URL = "mongodb://localhost:27017/phone-directory";

export const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(MONGO_DB_CONNECTION_URL);
    if (connect) {
      console.log(
        "database connection established at " + MONGO_DB_CONNECTION_URL
      );
    }
  } catch (error) {
    console.log("error", error);
  }
};
