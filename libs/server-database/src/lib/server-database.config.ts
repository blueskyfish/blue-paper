import { LogService } from '@blue-paper/server-commons';
import { DbService } from './service/db.service';
import { IMysqlConfig, MysqlConfig, MysqlService } from './service/mysql';

export function createDatabaseService(config: IMysqlConfig, log: LogService): DbService {
  return new DbService(new MysqlService(log, new MysqlConfig(config)));
}
