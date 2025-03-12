import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import dbConfig from 'src/config/db.config';
import * as schema from './schema/db.schema';
export const DRIZZLE = Symbol('DRIZZLE-CONNECTION');
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
  ],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (dbConfig: ConfigService) => {
        const url: string = dbConfig.get('db.DATABASE_URL');
        const sqlite = new Database(url);
        const db = drizzle(sqlite, { schema });
        console.log(db);
        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DbModule {}
