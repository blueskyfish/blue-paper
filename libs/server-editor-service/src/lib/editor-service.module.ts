import { Global, Module } from '@nestjs/common';
import { UserService } from './user';

const editorServices = [
  UserService,
];

@Global()
@Module({
  providers: [
    ...editorServices,
  ],
  exports: [
    ...editorServices,
  ]
})
export class ServerEditorServiceModule {
}
