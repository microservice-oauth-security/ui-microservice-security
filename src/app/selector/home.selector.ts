import { createFeatureSelector } from "@ngrx/store";
import { HomeState } from "../state/home.state";

export const homeSelector = createFeatureSelector<HomeState>('homeState')