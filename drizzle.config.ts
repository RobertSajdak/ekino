import type { Config } from 'drizzle-kit';

const config = {
	schema: './server/db/schemas/*.ts',
	out: './server/db/drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.POSTGRES_URL,
	},
} satisfies Config;

export default config;
