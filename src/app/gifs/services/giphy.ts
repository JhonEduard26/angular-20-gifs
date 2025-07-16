import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import type { GiphyResponse } from '../interfaces/giphy-interface';
import type { Gif } from '../interfaces/gif-interface';
import { GifMapper } from '../mapper/gif-mapper';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifs = localStorage.getItem('searchHistory');
  return gifs ? JSON.parse(gifs) : {};
};

@Injectable({
  providedIn: 'root',
})
export class Giphy {
  private readonly http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  isLoading = signal<boolean>(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
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

  searchGifs(query: string): Observable<Gif[]> {
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

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.toLowerCase().trim()] || [];
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
  });
}
