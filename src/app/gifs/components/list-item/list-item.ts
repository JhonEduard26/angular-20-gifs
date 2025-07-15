import { Component, input } from '@angular/core';
import type { Gif } from '../../interfaces/gif-interface';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './list-item.html',
  styles: ``,
})
export class ListItem {
  gif = input.required<Gif>();
}
