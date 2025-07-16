import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Giphy } from '../../services/giphy';
import { List } from '../list/list';

@Component({
  selector: 'gifs-history',
  imports: [List],
  templateUrl: './history.html',
})
export class History {
  private readonly giphyService = inject(Giphy);

  protected query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  protected gifsByKey = computed(() => {
    return this.giphyService.getHistoryGifs(this.query());
  });
}
