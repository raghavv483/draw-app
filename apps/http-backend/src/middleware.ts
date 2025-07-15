import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : "";

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    (req as any).userId = decoded.userId; // Or extend the Request type properly
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
}
