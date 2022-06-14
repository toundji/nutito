import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable().pipe(delay(1));
  public loader: string

  constructor(private sanitizer: DomSanitizer) {
    this.loader = `
      <ng-container *ngIf="loading$ | async">
        <div class="preloader"></div>
        <mat-progress-spinner [mode]="'indeterminate'"></mat-progress-spinner>
      </ng-container>`
    this.loader = this.sanitizer.bypassSecurityTrustHtml(this.loader) as string;
  }

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
}
