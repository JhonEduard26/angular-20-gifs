import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'gifs-side-menu-header',
  templateUrl: './side-menu-header.html',
})
export class SideMenuHeader {
  protected envs = environment;
}
