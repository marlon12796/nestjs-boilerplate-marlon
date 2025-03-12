import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { usersTable } from '../schema/user.schema';
export type User = InferSelectModel<typeof usersTable>;
export type InsertUser = InferInsertModel<typeof usersTable>;
