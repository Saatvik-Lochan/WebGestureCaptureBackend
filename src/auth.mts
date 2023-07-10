import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { UserAuthRequest, ProjectPayload } from "./models/user-auth-request.mts";

// get environment variables
dotenv.config();

function verifyToken (req: UserAuthRequest, res: Response, next: NextFunction) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    try {

      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded as ProjectPayload;

    } catch (err) {

      return res.status(401).send("Invalid Token");

    }
    return next();
};

export { verifyToken };
  