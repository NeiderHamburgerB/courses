import strategies from "./config/passport";
import modules from "./modules";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

class App {
  
  public app: express.Application = express();

  constructor() {

    dotenv.config();
    //*settings
    this.app.set("port", process.env.PORT);

    //*middlewares
    this.app.use(express.json());
    this.app.use(cors());

    strategies;

    //*routes
    this.app.use("/", modules);

    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH"
      );
      res.setHeader("Access-Control-Allow-Headers", "*");
      next();
    })

  }

}

const app = new App().app;
export default app;