import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "../state/auth.state";

export const authSelector = createFeatureSelector<AuthState>('authState')