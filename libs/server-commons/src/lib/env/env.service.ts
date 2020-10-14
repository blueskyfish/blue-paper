import { Injectable } from '@nestjs/common';
import { fromEnv } from './env.reader';
import { EnvValue } from './env.value';

@Injectable()
export class EnvService {

  /**
   * Get the value of the given environment variable
   * @param name the environment name
   * @param defValue the default value if the enviroment is not exist
   */
  getEnv(name: string, defValue: string): EnvValue {
    return fromEnv(name, defValue);
  }
}
