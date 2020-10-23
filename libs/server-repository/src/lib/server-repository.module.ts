import { Global, Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Global()
@Module({
  controllers: [],
  providers: [
    RepositoryService,
  ],
  exports: [
    RepositoryService,
  ],
})
export class ServerRepositoryModule {

}
