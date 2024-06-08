import express, { Application } from "express";
import cors from "cors"

class Express{
  app: Application
  constructor () {
    this.app = express();
    this.initMiddlewares()
  }

  private initMiddlewares(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors())
  }

  listen(port: number){
    this.app.listen(port, () => console.log(`Server is running on port ${port}`))
  }
}

export { Express }