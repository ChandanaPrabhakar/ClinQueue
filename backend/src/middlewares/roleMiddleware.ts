import { NextFunction, Request, Response } from "express";

export const authorizeVerify = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { role } = req.body.user;
    if (!allowedRoles.includes(role)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  };
};
