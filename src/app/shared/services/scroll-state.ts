import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollState {
  private scrollPosition = signal<number>(0);

  get getScrollPosition(): number {
    return this.scrollPosition();
  }

  set setScrollPosition(position: number) {
    this.scrollPosition.set(position);
  }
}
