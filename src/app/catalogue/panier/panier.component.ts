import { Component, OnInit } from '@angular/core';
import { PanierState } from '../../../shared/states/panier-state';
import { Produit } from '../../../shared/models/produit';
import { DelProduit } from '../../../shared/actions/panier-action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  constructor(private store: Store) {}
  @Select(PanierState.getListeProduits) liste$: Observable<Produit[]>;
  ngOnInit() {}

  supprimerPanier(p: Produit): void {
    this.store.dispatch(new DelProduit(p));
  }
}
