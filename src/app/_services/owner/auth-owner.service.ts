import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Owner } from 'src/app/_models';
import { environment } from 'src/environments/environment';
import { OwnerService } from './owner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOwnerService {
  public currentOwner: Observable<Owner>;
  private currentOwnerSubject: BehaviorSubject<Owner>;

  constructor(private http: HttpClient) {
    this.currentOwnerSubject = new BehaviorSubject<Owner>(JSON.parse(localStorage.getItem('currentOwner')));
    this.currentOwner = this.currentOwnerSubject.asObservable();
  }

  public get currentOwnerValue(): Owner {
    return this.currentOwnerSubject.value;
  }

  sendAuthToken(identity_card: string){
    return this.http.post<any>(`${environment.apiRest}/api/v1/owners/access-token?identity_card=${identity_card}`, {})
    .pipe(
    );
  }

  verifyAuthToken(code: string){
    return this.http.post<any>(`${environment.apiRest}/api/v1/owners/login?code=${code}`, {})
      .pipe(map(owner => {
        if (owner && owner.access_token) {
          localStorage.setItem('currentOwner', JSON.stringify(owner));
          this.currentOwnerSubject.next(owner);
        }
        return owner;
      }));
  }

  signOut(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentOwner');
    this.currentOwnerSubject.next(null);
  }
}
