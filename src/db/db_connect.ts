import { db } from './postgres_config';

const connectToDb = async () => {

	try {
		await db.connect();
		console.log('Connected to PostgreSQL database');
	} catch (error: any) {
		console.error('Error connecting to PostgreSQL database', error.message);
	}
};
export default connectToDb;
