import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}

export function isAuthenticated(req:Request, res:Response, next: NextFunction){
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).end()
  }

  const [, token] = (authToken as string).split(" ");

  try {
    //esse sub foi passado como subject no sign do jwt
    const {sub} = verify(token, process.env.JWT_SECRET) as Payload;

    req.user_id = sub;
    next();
  } catch (error) {
    return res.status(401).end()
  }
}