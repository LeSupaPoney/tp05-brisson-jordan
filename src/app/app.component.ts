import { Component, VERSION } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from '../shared/states/panier-state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  @Select(PanierState.getNbProduits) nb$: Observable<number>;
  constructor() {}
}
