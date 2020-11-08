
export interface IAuthUser {
  id: number;
  roles: string[];
}

export class AuthUser {

  get id(): number {
    return this.user.id;
  }

  constructor(private user: IAuthUser) {
  }

  hasRole(name: string): boolean {
    return this.user.roles.includes(name);
  }
}
