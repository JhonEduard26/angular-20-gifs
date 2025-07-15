import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from '@env/environment';
import type { GiphyResponse } from '../interfaces/giphy-interface';
import type { Gif } from '../interfaces/gif-interface';
import { GifMapper } from '../mapper/gif-mapper';

@Injectable({
  providedIn: 'root',
})
export class Giphy {
  private readonly http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  isLoading = signal<boolean>(true);
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.apiUrl}/gifs/trending`, {
        params: {
          api_key: environment.apiKey,
          limit: 5,
          offset: 0,
          rating: 'r',
        },
      })
      .subscribe({
        next: (response) => {
          const gifs = GifMapper.mapGiphyItemsToGifs(response.data);
          this.trendingGifs.set(gifs);
        },
        error: (error) => {
          console.error('Error loading trending GIFs:', error);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.apiUrl}/gifs/search`, {
        params: {
          api_key: environment.apiKey,
          limit: 5,
          offset: 0,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifs(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase().trim()]: items,
          }));
        })
      );
  }
}
