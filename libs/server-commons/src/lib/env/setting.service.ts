import { Inject, Injectable } from '@nestjs/common';
import { get as getValue } from '@blue-paper/shared-commons';

export const SETTING_TOKEN = 'blue.paper.settings';

@Injectable()
export class SettingService {

   // eslint-disable-line no-alert
  constructor(@Inject(SETTING_TOKEN) private setting = {}) {}

  getValue<T>(name: string, defValue: T): T {
    return getValue(this.setting, name, defValue);
  }
}

