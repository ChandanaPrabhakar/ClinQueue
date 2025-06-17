// types/customRequest.ts
import { Request } from "express";
import { JwtPayloadData } from "./jwtPayload";

export interface CustomRequest extends Request {
  user?: JwtPayloadData;
}
