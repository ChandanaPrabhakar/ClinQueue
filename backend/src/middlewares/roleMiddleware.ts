import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types/customRequest";

export const authorizeVerify = (...allowedRoles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const role = req.user?.role as string;
    if (!allowedRoles.includes(role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
