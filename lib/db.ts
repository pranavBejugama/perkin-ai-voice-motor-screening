import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  client = new MongoClient(uri);
  await client.connect();
  
  return client;
}

export async function getDatabase() {
  const client = await getMongoClient();
  return client.db('perkinai');
}

// Prepare collections for future use
export async function getSessionsCollection() {
  const db = await getDatabase();
  return db.collection('sessions');
}
