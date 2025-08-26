import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingFeedbackService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  // Minimum display time in milliseconds (3 seconds)
  private readonly minDisplayTime = 3000;
  private loadingStartTime: number = 0;

  constructor() {}

  /**
   * Shows the loading spinner
   */
  show(): void {
    this.loadingStartTime = Date.now();
    this.isLoadingSubject.next(true);
  }

  /**
   * Hides the loading spinner, respecting the minimum display time
   */
  hide(): void {
    const elapsedTime = Date.now() - this.loadingStartTime;
    const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);

    // If we haven't shown the spinner for the minimum time yet, wait before hiding
    if (remainingTime > 0) {
      setTimeout(() => {
        this.isLoadingSubject.next(false);
      }, remainingTime);
    } else {
      // We've already shown the spinner for the minimum time, hide it immediately
      this.isLoadingSubject.next(false);
    }
  }

  /**
   * Wraps an observable with loading state management
   * @param obs$ The observable to wrap
   * @returns The wrapped observable
   */
  wrapObservable<T>(obs$: Observable<T>): Observable<T> {
    this.show();

    return obs$.pipe(
      tap({
        next: () => this.hide(),
        error: () => this.hide(),
        complete: () => this.hide(),
      })
    );
  }
}
