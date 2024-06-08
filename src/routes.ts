import { Router } from "express";
import { HttpException } from "./types/HttpException";

const router = Router()

router.get('/', (req, res) => {
  throw new HttpException(400, 'Bad request')
})


export {router}