import { Component, input } from '@angular/core';
import { ListItem } from '../list-item/list-item';

@Component({
  selector: 'gifs-list',
  imports: [ListItem],
  templateUrl: './list.html',
  styles: ``,
})
export class List {
  gifs = input.required<string[]>();
}
