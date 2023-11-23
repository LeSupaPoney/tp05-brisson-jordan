import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { PanierComponent } from './panier/panier.component';
import { PanierState } from '../../shared/states/panier-state';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,
    NgxsModule.forFeature([PanierState]),
  ],

  declarations: [ListeProduitsComponent, PanierComponent],
  exports: [ListeProduitsComponent, PanierComponent],
})
export class CatalogueModule {}
