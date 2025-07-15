import { Component, input } from '@angular/core';
import { ListItem } from '../list-item/list-item';
import type { Gif } from '../../interfaces/gif-interface';

@Component({
  selector: 'gifs-list',
  imports: [ListItem],
  templateUrl: './list.html',
  styles: ``,
})
export class List {
  gifs = input.required<Gif[]>();
}
