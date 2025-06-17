// types/jwtPayload.ts
export interface JwtPayloadData {
  _id: string;
  role: "user" | "doctor";
}
