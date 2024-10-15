import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
    schema: 'src/server/db/schema.ts',
    dbCredentials: {
        host: "localhost",
        port: 5432,
        user: 'postgres',
        password: '123456',
        database: 'postgres',
        ssl: false,
    },
    verbose: true,
    strict: true,
    // driver: "pg",
});
