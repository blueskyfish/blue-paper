
export interface ICommonConfig {

  /**
   * The header name of the backend
   */
  headerName: string;

  /**
   * The base api url
   */
  baseApiUrl: string;
}


export class CommonConfig implements ICommonConfig {

  get headerName(): string {
    return this.config.headerName;
  }

  get baseApiUrl(): string {
    return this.config.baseApiUrl;
  }

  constructor(private config: ICommonConfig) {
  }
}
