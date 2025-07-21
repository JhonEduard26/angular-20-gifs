import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { Giphy } from '../../services/giphy';
import { ScrollState } from 'src/app/shared/services/scroll-state';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.html',
})
export class Trending implements AfterViewInit {
  protected readonly gifService = inject(Giphy);
  private readonly scrollStateService = inject(ScrollState);
  groupDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const element = this.groupDivRef()?.nativeElement;
    if (!element) return;

    element.scrollTop = this.scrollStateService.getScrollPosition;
  }

  onScroll(): void {
    const element = this.groupDivRef()?.nativeElement;
    if (!element) return;

    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const isAtBottom = scrollTop + clientHeight + 200 >= scrollHeight;
    this.scrollStateService.setScrollPosition = scrollTop;

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
