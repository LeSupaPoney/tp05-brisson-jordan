import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Produit } from '../../../shared/models/produit';
import { AddProduit } from '../../../shared/actions/panier-action';
import { Observable } from 'rxjs';
import { CatalogueService } from '../catalogue.service';
@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css'],
  providers: [CatalogueService],
})
export class ListeProduitsComponent implements OnInit {
  constructor(
    private store: Store,
    private catalogueService: CatalogueService
  ) {
    this.produits$ = this.catalogueService.getProduits();
  }

  produits$: Observable<Array<Produit>>;

  ngOnInit() {}

  ajouterPanier(p: Produit): void {
    this.store.dispatch(new AddProduit(p));
  }
}
