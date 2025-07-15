import { Component, inject, signal } from '@angular/core';
import { List } from '../../components/list/list';
import { Giphy } from '../../services/giphy';
import { Gif } from '../../interfaces/gif-interface';

@Component({
  selector: 'app-search',
  imports: [List],
  templateUrl: './search.html',
  styles: ``,
})
export class Search {
  protected readonly giphyService = inject(Giphy);
  protected searchedGifs = signal<Gif[]>([]);

  protected onSearch(query: string): void {
    if (query.trim().length === 0) return;
    this.giphyService.searchGifs(query).subscribe({
      next: (gifs) => {
        this.searchedGifs.set(gifs);
      },
      error: (error) => {
        console.error('Error searching GIFs:', error);
      },
    });
  }
}
