
import mongoose from "mongoose";

/**
 * @deprecated Use prisma orm instead
 */
type ConnectionObject = {
	isConnected?: number;
};

const connection: ConnectionObject = {};

/**
 * @deprecated Use prisma orm instead
 */
async function dbConnect(): Promise<void> {
	if (connection.isConnected) {
		console.log("Already connected to Database");
		return;
	}
	try {
		const db = await mongoose.connect(process.env.MONGO_URI || "");

		connection.isConnected = db.connection.readyState;

		console.log("DB Connected Successfully");
	} catch (error) {
		console.log("Error connecting to database", error);
		process.exit(1);
	}
}

export default dbConnect;
