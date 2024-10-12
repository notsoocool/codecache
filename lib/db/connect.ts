import mongoose from "mongoose";

type ConnectionObject = {
	isConnected?: number;
};

//const connection: ConnectionObject = {};
const connection: ConnectionObject = { isConnected: 0 };

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




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://York:k3tas3ly755@cluster0.wi6og.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//  export default run;
