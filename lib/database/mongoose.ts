import mongoose, {Mongoose} from 'mongoose';

declare global {
    let mongoose: {
        conn: mongoose.connection | null
        promise: Promise<Mongoose> | null
    };
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const MONGODB_URL = process.env.MONGODB_URL
        if (!MONGODB_URL) {
            throw new Error(
                'Please define the MONGODB_URL environment variable inside .env.local'
            )
        }
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            dbName: "imaginify"
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URL, options).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectToDatabase
