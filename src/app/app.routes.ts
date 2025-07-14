import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./gifs/pages/dashboard/dashboard').then((c) => c.Dashboard),
    children: [
      {
        path: 'trending',
        loadComponent: () =>
          import('./gifs/pages/trending/trending').then((c) => c.Trending),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./gifs/pages/search/search').then((c) => c.Search),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
