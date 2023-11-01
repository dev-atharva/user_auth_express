require("dotenv").config();
import express from "express";
import config from "config";
import connectToDb from "./utils/connecttoDb";
import log from "./utils/logger";
import router from "./routes";
import deseralizeUser from "./middleware/deserializeUser";

const app = express();
const port = config.get<number>("port");
app.use(express.json());
app.use(deseralizeUser);
app.use(router);

app.listen(port, () => {
  console.log("app started");
  log.info("Connected to server");
  connectToDb();
  log.info("Database connected");
});
