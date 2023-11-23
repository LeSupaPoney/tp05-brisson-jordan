import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduit, DelProduit } from '../actions/panier-action';
import { PanierStateModel } from './panier-state-model';
import { Produit } from '../models/produit';
@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    panier: [],
  },
})
@Injectable()
export class PanierState {
  @Selector()
  static getNbProduits(state: PanierStateModel) {
    return state.panier.length;
  }

  @Selector()
  static getListeProduits(state: PanierStateModel) {
    return state.panier;
  }

  @Action(AddProduit)
  add(
    { getState, patchState }: StateContext<PanierStateModel>,
    { payload }: AddProduit
  ) {
    const state = getState();
    patchState({
      panier: [...state.panier, payload],
    });
  }

  @Action(DelProduit)
  del(
    { getState, patchState }: StateContext<PanierStateModel>,
    { payload }: DelProduit
  ) {
    const state = getState();
    patchState({
      panier: state.panier.filter((x) => !(payload.ref == x.ref)),
    });
  }
}
