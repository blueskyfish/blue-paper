import { Global, Module } from '@nestjs/common';
import { MenuService } from './menu';
import { UserService } from './user';

const editorServices = [
  MenuService,
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
