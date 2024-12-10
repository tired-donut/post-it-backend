import bcrypt from 'bcrypt';

export class HashUtil {
	public static async hash(line: string): Promise<string> {
		const salts = 10;

		return bcrypt.hash(line, salts);
	}

	public static async compare(line: string, hash: string): Promise<boolean> {
		return bcrypt.compare(line, hash);
	}
}
