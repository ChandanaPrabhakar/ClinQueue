// types/jwtPayload.ts
export interface JwtPayloadData {
  id: string;
  role: "user" | "doctor" | "admin";
}
