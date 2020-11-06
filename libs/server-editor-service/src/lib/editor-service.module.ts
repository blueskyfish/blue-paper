import { DynamicModule, Module } from '@nestjs/common';
import { UserService } from './user';

const editorServices = [
  UserService,
];

@Module({})
export class ServerEditorServiceModule {

  static forRoot(config: any): DynamicModule {

    return {
      global: true,
      module: ServerEditorServiceModule,
      imports: [],
      providers: [
        ...editorServices,
      ],
      exports: [
        ...editorServices,
      ]
    };
  }
}
