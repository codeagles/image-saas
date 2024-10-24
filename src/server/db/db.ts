// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const queryClient = postgres("postgres://postgres:123456@localhost:5432/postgres");
export const db = drizzle(queryClient, {schema});
