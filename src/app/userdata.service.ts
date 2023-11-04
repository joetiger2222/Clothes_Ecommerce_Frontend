import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private userIdKey = 'userId';
  private userRoleKey = 'role';

  public get userId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  public set userId(value: string | null) {
    if (value) {
      localStorage.setItem(this.userIdKey, value);
    } else {
      localStorage.removeItem(this.userIdKey);
    }
  }

  public get userRole(): string | null{
    return localStorage.getItem(this.userRoleKey);
  }

  public set userRole(value: string|null){
    if(value){
      localStorage.setItem(this.userRoleKey, value);
    }else {
      localStorage.removeItem(this.userRoleKey);
    }
  }

  constructor() { }
}
