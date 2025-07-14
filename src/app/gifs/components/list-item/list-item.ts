import { Component, input } from '@angular/core';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './list-item.html',
  styles: ``,
})
export class ListItem {
  gif = input.required<string>();
}
