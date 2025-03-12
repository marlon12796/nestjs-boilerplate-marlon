import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema/db.schema';
import { DRIZZLE } from 'src/db/db.module';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE) private db: BetterSQLite3Database<typeof schema>,
  ) {}
  async findAll() {
    const users = await this.db.select().from(schema.usersTable);
    return users;
  }
  async createUser(user: CreateUserDto) {
    const [createdUser] = await this.db
      .insert(schema.usersTable)
      .values(user)
      .onConflictDoNothing({ target: schema.usersTable.email })
      .returning();
    if (!createdUser)
      throw new BadRequestException("User wasn't able to be created");
    return createdUser;
  }
}
