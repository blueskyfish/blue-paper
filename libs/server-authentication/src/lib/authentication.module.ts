import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthenticationConfig, IAuthenticationConfig } from './authentication.config';
import { BootstrapService } from './services/bootstrap.service';
import { CryptoService } from './services';

const authServices = [
  AuthService,
  AuthMiddleware,
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
        BootstrapService,
        ...authServices,
      ],
      exports: [
        ...authServices,
      ]
    }
  }
}
