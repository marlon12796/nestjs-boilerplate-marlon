import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import dbConfig from 'src/config/db.config';
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
      useFactory: (dbConfig: ConfigService) => {
        const db = drizzle({
          connection: { source: dbConfig.get('db.DATABASE_URL') },
        });
        return db;
      },
    },
  ],
  exports: [ConfigModule],
})
export class DbModule {}
