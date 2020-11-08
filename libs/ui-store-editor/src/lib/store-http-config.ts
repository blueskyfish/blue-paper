
export interface IStoreHttpConfig {

  /**
   * The header name of the backend
   */
  headerName: string;

  /**
   * The base api url
   */
  baseApiUrl: string;
}

export class StoreHttpConfig implements IStoreHttpConfig {

  get headerName(): string {
    return this.config.headerName;
  }

  get baseApiUrl(): string {
    return this.config.baseApiUrl;
  }

  constructor(private config: IStoreHttpConfig) {
  }
}
