import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private zone: NgZone, private router: Router) {
  }

  getLatestRoutePath(): string {
    return this.router.url.split('/').pop();
  }

  redirectHome(path?: string): void {
    const route = path ? `/${path}` : `/`;
    this.zone.run(() => {
      this.router.navigate([route]);
    });
  }

  redirectEmployees(path?: string): void {
    const route = path ? `employees/${path}` : `employees`;
    this.zone.run(() => {
      this.router.navigate([route]);
    });
  }
}
