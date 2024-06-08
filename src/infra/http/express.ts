import express, { Application } from "express";
import 'express-async-errors'
import cors from "cors"
import { ErrorMiddleware } from "../middlewares/error.middleware";
import { router } from "../../routes";

class Express{
  app: Application
  constructor () {
    this.app = express();
    this.initMiddlewares()
  }

  private initMiddlewares(){
    this.app.use(express.json());
    this.app.use(cors())

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router)
    //deve ser o ultimo middleware
    this.app.use(ErrorMiddleware)
  }

  listen(port: number){
    this.app.listen(port, () => console.log(`Server is running on port ${port}`))
  }
}

export { Express }