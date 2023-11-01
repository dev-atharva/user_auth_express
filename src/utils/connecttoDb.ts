import mongoose from "mongoose";
import config from "config";

async function connectToDb() {
  const dburi = config.get<string>("dburi");
  try {
    await mongoose.connect(dburi);
  } catch (error) {
    process.exit(1);
  }
}

export default connectToDb;
