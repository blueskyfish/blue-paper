import { DynamicModule, Module } from '@nestjs/common';
import { DbConfig, IDbConfig } from './db/db.config';
import { DbService } from './db/db.service';

const databaseServices = [
  DbService,
];

@Module({})
export class ServerDatabaseModule {

  static forRoot(config: IDbConfig): DynamicModule {
    return {
      global: true,
      module: ServerDatabaseModule,
      providers: [
        {
          provide: DbConfig,
          useValue: new DbConfig(config),
        },
        ...databaseServices,
      ],
      exports: [
        ...databaseServices,
      ],
    }
  }
}
