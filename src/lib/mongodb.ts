import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;
if (!MONGODB_URL) throw new Error("MONGODB_URL not set");

type Cached = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
let cached: Cached = (global as any)._mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: process.env.MONGODB_DB || "naija_house",
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
