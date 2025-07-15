import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'gifs-history',
  imports: [],
  templateUrl: './history.html',
})
export class History {
  protected params = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );
}
