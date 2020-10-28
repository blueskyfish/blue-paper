import { DynamicModule, Module } from '@nestjs/common';
import { AuthenticationConfig, IAuthenticationConfig } from './authentication.config';
import { AuthenticationInitService } from './services/authentication-init.service';
import { AuthenticationService } from './services/authentication.service';
import { CryptoService } from './services/crypto.service';

const authServices = [
  AuthenticationService,
  CryptoService,
];

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class ServerAuthenticationModule {

  static forRoot(config: IAuthenticationConfig): DynamicModule {
    return {
      global: true,
      module: ServerAuthenticationModule,
      providers: [
        {
          provide: AuthenticationConfig,
          useValue: new AuthenticationConfig(config),
        },
        AuthenticationInitService,
        ...authServices,
      ],
      exports: [
        ...authServices,
      ]
    }
  }
}