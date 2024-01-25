import mongoose from "mongoose";
const url = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    const host = await mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
};
