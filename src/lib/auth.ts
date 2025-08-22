import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
export type JWTPayload = { userId: string; role: "admin" | "staff" | "customer" };

export function signToken(payload: JWTPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token?: string): JWTPayload {
  if (!token) throw new Error("No token");
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function requireAdmin(token?: string) {
  const payload = verifyToken(token);
  if (payload.role !== "admin") throw new Error("Forbidden");
  return payload;
}
