import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { List } from '../../components/list/list';
import { Giphy } from '../../services/giphy';

@Component({
  selector: 'app-trending',
  // imports: [List],
  templateUrl: './trending.html',
})
export class Trending {
  protected readonly gifService = inject(Giphy);
  groupDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event): void {
    const element = this.groupDivRef()?.nativeElement;

    if (!element) return;

    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const isAtBottom = scrollTop + clientHeight + 200 >= scrollHeight;

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
