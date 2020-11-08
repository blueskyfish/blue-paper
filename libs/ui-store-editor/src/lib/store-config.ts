
export interface IStoreConfig {
  readonly baseUrl: string;
}

export class StoreConfig implements IStoreConfig {

  get baseUrl(): string {
    return this.config.baseUrl;
  }

  constructor(private config: IStoreConfig) {
  }
}
