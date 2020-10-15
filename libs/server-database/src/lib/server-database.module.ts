import { LogService } from '@blue-paper/server-commons';
import { DynamicModule, Module } from '@nestjs/common';
import { createDatabaseService } from './server-database.config';
import { DbService } from './service/db.service';
import { IMysqlConfig, MysqlService } from './service/mysql';

const databaseServices = [
  MysqlService,
];

@Module({})
export class ServerDatabaseModule {

  static forRoot(config: IMysqlConfig): DynamicModule {
    return {
      global: true,
      module: ServerDatabaseModule,
      providers: [
        {
          provide: DbService,
          useFactory: (log: LogService) => createDatabaseService(config, log),
          inject: [LogService]
        },
        ...databaseServices,
      ],
      exports: [
        DbService,
        ...databaseServices,
      ],
    }
  }
}
