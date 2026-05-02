import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // Stored on the Node.js global object to survive Next.js hot reloads in development.
  var mongooseCache: MongooseCache | undefined
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache
}

const cached = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
}

globalWithMongoose.mongooseCache = cached

/**
 * Creates (or reuses) a single MongoDB connection for the current server process.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // Keep options explicit so behavior is predictable across environments.
    const options: mongoose.ConnectOptions = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, options)
  }

  cached.conn = await cached.promise
  return cached.conn
}

