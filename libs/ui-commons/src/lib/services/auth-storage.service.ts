import { Injectable } from '@angular/core';
import { StorageFacadeService } from './storage-facade.service';

@Injectable()
export class AuthStorageService {

  private readonly authToken = 'token';

  constructor(private storageService: StorageFacadeService) {
  }

  hasToken(): boolean {
    return this.storageService.hasItem(this.authToken);
  }

  getToken(): string {
    return this.storageService.getItem(this.authToken);
  }

  updateToken(token: string): void {
    this.storageService.updateItem(this.authToken, token);
  }

  removeToken(): void {
    this.storageService.removeItem(this.authToken);
  }
}
