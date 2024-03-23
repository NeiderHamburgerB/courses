import dotenv from "dotenv";
dotenv.config();
import strategies from "./config/passport";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';
import modules from "./modules";
import express from "express";
import cors from "cors";
class App {
  
  public app: express.Application = express();

  constructor() {

    //*settings
    this.app.set("port", process.env.PORT);

    //*middlewares
    this.app.use(express.json());
    this.app.use(cors());

    strategies;

    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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