import { Component, inject } from '@angular/core';
import { List } from '../../components/list/list';
import { Giphy } from '../../services/giphy';

@Component({
  selector: 'app-trending',
  imports: [List],
  templateUrl: './trending.html',
  styles: ``,
})
export class Trending {
  protected readonly gifService = inject(Giphy);
}
